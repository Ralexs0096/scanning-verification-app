import React from 'react';
import { Button, Dialog, Paragraph } from 'tamagui';

const RequestPermissions = ({
  handleOnPress
}: {
  handleOnPress: () => void;
}) => {
  return (
    <Dialog modal open>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true
              }
            }
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Paragraph>
            Para realizar esta acción, se requieren permisos para acceder a la
            cámara
          </Paragraph>
          <Button size="$3" variant="outlined" onPress={handleOnPress}>
            Permitir
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default RequestPermissions;
