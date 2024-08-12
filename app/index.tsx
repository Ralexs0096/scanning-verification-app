import { TamaguiProvider, createTamagui } from '@tamagui/core';

import { config } from '@tamagui/config/v3';
import Textfield from '@/components/Textfield';
import { YStack } from 'tamagui';

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}
export default () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <YStack minHeight={250} overflow="hidden" margin="$3" padding="$2">
        <Textfield size={32} />
      </YStack>
    </TamaguiProvider>
  );
};
