import Textfield from '@/components/Textfield';
import { ScrollView, Text, YStack, Spinner, Paragraph } from 'tamagui';
import { useGetAllAreas } from '@/query-hooks/useGetAllAreas';
import { SafeAreaView } from 'react-native-safe-area-context';
import AreaCard from '@/components/AreaCard';

export default () => {
  const { data: areas, isLoading } = useGetAllAreas();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack minHeight={80} overflow="hidden" margin="$3" padding="$2">
        // TODO: implement the search by area
        <Textfield size={32} />
      </YStack>

      {isLoading ? (
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
            {!areas ? (
              <Paragraph>
                Algo salió mal... La información de las areas no puede ser
                mostrada
              </Paragraph>
            ) : (
              areas?.slice(0, 19).map((values) => {
                return (
                  <AreaCard
                    key={values.areaId}
                    headerTitle={values.name}
                    areaId={values.areaId}
                  />
                );
              })
            )}
          </YStack>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
