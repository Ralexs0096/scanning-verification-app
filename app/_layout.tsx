import { config } from '@tamagui/config/v3';
import { createTamagui, TamaguiProvider } from '@tamagui/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { PortalProvider } from 'tamagui';

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

const queryClient = new QueryClient();

export default () => {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf')
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <PortalProvider shouldAddRootHost>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen
              name="[area]"
              getId={({ params }) => params?.areaId}
            />
          </Stack>
        </QueryClientProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
};
