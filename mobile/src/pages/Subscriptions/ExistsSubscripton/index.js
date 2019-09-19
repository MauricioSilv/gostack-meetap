import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, ExistText } from './styles';

export default function ExistsSubscription() {
  return (
    <Container>
      <Icon name="highlight-off" color="rgba(255,255,255,0.6)" size={120} />

      <ExistText>Não existe inscrições!</ExistText>
    </Container>
  );
}
