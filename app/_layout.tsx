import { config } from '@tamagui/config/v3';
import { createTamagui, TamaguiProvider } from '@tamagui/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

const queryClient = new QueryClient();

export default () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </TamaguiProvider>
  );
};
