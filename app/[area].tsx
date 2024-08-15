import { Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Paragraph } from 'tamagui';

export default () => {
  const { area, name } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Paragraph theme="alt1">
        Area: {name} ({area})
      </Paragraph>
    </SafeAreaView>
  );
};
