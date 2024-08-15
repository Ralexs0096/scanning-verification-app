import Textfield from '@/components/Textfield';
import { ScrollView, Text, YStack, Spinner } from 'tamagui';
import { useGetAllAreas } from '@/query-hooks/useGetAllAreas';
import { SafeAreaView } from 'react-native-safe-area-context';
import AreaCard from '@/components/AreaCard';

export default () => {
  const { data: areas, isLoading } = useGetAllAreas();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack minHeight={80} overflow="hidden" margin="$3" padding="$2">
        <Textfield size={32} />
      </YStack>

      {isLoading && !areas ? (
        <Spinner size="large" color="$orange10" />
      ) : (
        <ScrollView
          backgroundColor="$background"
          padding="$4"
          borderRadius="$4"
        >
          <YStack
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            flex={1}
          >
            {areas?.map((values) => {
              return (
                <AreaCard
                  key={values.codigo_are}
                  headerTitle={values.descripcion_are}
                />
              );
            })}
          </YStack>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
