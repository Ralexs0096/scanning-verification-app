import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Paragraph, ScrollView, View, YStack, Button } from 'tamagui';
import { CameraView, useCameraPermissions } from 'expo-camera';
import RequestPermissions from '@/components/RequestPermissions';
import { fetchUserById, verifyCodesByArea } from '@/Apis';

export default () => {
  const { area, name } = useLocalSearchParams<{ area: string; name: string }>();
  const navigation = useNavigation();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [usersScanned, setUsersScanned] = useState<
    Array<UserByIdResponse & { code: string; belongsTo?: boolean }>
  >([]);
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: name });
  }, [navigation]);

  if (!permission?.granted) {
    // Camera permissions are not granted yet.
    return <RequestPermissions handleOnPress={requestPermission} />;
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);

    const result = await fetchUserById(data);

    /** `code` represents the union of `codigo_emp` and `codigo_ec` */
    const code = data;

    // before update the state we need to check if the user was already scanned
    if (usersScanned.find((it) => it.cedula_id === result?.cedula_id)) return;

    if (result) {
      setUsersScanned((prev) => [...prev, { ...result, code }]);
    } else {
      /**
       * if the user doesn't exist on the DB,
       * we will put a placeholder indicating the `codigo_emp`
       */
      setUsersScanned((prev) => [
        ...prev,
        {
          cedula_id: code,
          nombre_completo: `Usuario no encontrado - ${code}`,
          code
        }
      ]);
    }

    setTimeout(() => setScanned(false), 1000); // Re-enable scanning after 1 seconds
  };

  const verifyUsers = async () => {
    try {
      const userCodes = usersScanned.map((user) => user.code);
      const result = await verifyCodesByArea(area, userCodes);

      if (result) {
        setUsersScanned((prevUsers) =>
          prevUsers.map((user) => {
            const normalizedUserCode = user.code
              .trim()
              .slice(0, 6)
              .toLowerCase();

            const verification = result.find(
              (res) => res.code.trim().toLowerCase() === normalizedUserCode
            );

            return {
              ...user,
              belongsTo: !!verification?.belongsToThisArea
            };
          })
        );
      }
    } catch (error) {
      // TODO: Add error message on a snackbar or something similar
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        size="$4"
        variant="outlined"
        backgroundColor="tomato"
        color="white"
        m={8}
        onPress={verifyUsers}
      >
        Verificar
      </Button>
      <View height="50%" justifyContent="center">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['code128']
          }}
        />
      </View>
      <ScrollView backgroundColor="$background" padding="$4" borderRadius="$4">
        <YStack
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          {usersScanned.length === 0 ? (
            <Paragraph>No se han agregado códigos de usuario</Paragraph>
          ) : (
            usersScanned.map(({ cedula_id, nombre_completo, belongsTo }) => {
              return (
                <Paragraph
                  key={cedula_id}
                  color={
                    belongsTo === undefined
                      ? 'black'
                      : belongsTo
                      ? 'green'
                      : 'red'
                  }
                >
                  {nombre_completo}
                </Paragraph>
              );
            })
          )}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};
