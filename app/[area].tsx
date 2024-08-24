import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Paragraph, ScrollView, View, YStack } from 'tamagui';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Text, Button } from 'react-native';

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

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      // Define buttons permission
      <></>
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
