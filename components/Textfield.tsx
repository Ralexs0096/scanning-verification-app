import type { SizeTokens } from 'tamagui';
import { XStack, Input, Button } from 'tamagui';

const Textfield = (props: { size: SizeTokens }) => {
  return (
    <XStack alignItems="center" space="$2">
      <Input flex={1} size={props.size} placeholder={`Busca un area ...`} />
      <Button size={props.size}>Buscar</Button>
    </XStack>
  );
};

export default Textfield;
