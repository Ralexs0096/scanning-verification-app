import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Dialog, Paragraph, ScrollView, View, YStack, Button } from 'tamagui';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default () => {
  const { area, name } = useLocalSearchParams();
  const navigation = useNavigation();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [userCodes, setUserCodes] = useState<Array<string>>([]);
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: name });
  }, [navigation]);

  if (!permission?.granted) {
    // Camera permissions are not granted yet.
    return (
      <Dialog modal open>
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="slow"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <Dialog.Content
            bordered
            elevate
            key="content"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quicker',
              {
                opacity: {
                  overshootClamping: true
                }
              }
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap="$4"
          >
            <Paragraph>
              Para realizar esta acción, se requieren permisos para acceder a la
              cámara
            </Paragraph>
            <Button size="$3" variant="outlined" onPress={requestPermission}>
              Permitir
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);

    setUserCodes([...new Set([...userCodes, data])]);

    setTimeout(() => setScanned(false), 3000); // Re-enable scanning after 3 seconds
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          {userCodes.length === 0 ? (
            <Paragraph>No se han agregado códigos de usuario</Paragraph>
          ) : (
            userCodes?.map((code) => {
              return <Paragraph key={code}>{code}</Paragraph>;
            })
          )}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};
