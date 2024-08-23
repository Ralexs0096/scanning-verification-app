import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Paragraph } from 'tamagui';

export default () => {
  const { area, name } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: name });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Paragraph theme="alt1">
        Area: {name} ({area})
      </Paragraph>
    </SafeAreaView>
  );
};
