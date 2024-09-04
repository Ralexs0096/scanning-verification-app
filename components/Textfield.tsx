import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import type { SizeTokens } from 'tamagui';
import { XStack, Input, Button } from 'tamagui';

const Textfield = (props: {
  size: SizeTokens;
  onTextChange: (value: string) => void;
  value: string;
}) => {
  return (
    <XStack alignItems="center" space="$2">
      <Input
        flex={1}
        size={props.size}
        placeholder={`Busca un area ...`}
        onChangeText={(text) => props.onTextChange(text)}
        value={props.value}
      />
      <Button size={props.size}>Buscar</Button>
    </XStack>
  );
};

export default Textfield;
