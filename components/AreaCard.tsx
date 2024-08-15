import { Link } from 'expo-router';
import React from 'react';
import { Button, Card, Paragraph, XStack } from 'tamagui';

type AreaCardProps = {
  headerTitle: string;
};

const AreaCard = ({ headerTitle }: AreaCardProps) => {
  return (
    <Card size="$4" bordered w="100%" mb="$1.5">
      <Card.Header padded>
        <Paragraph theme="alt1">{headerTitle}</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Link href="/area" asChild>
          <Button borderRadius="$10">Auditar</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default AreaCard;
