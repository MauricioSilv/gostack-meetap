import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  CardBody,
  Title,
  Content,
  IconText,
  TextIcon,
  ButtonIns,
} from './styles';

export default function CardMeetup({ meetup, ButtonPress, ButtonText }) {
  return (
    <Container>
      <Image
        style={{ width: 350, height: 150 }}
        source={{
          uri:
            'https://www.arrowdigital.com/~/media/ArrowDesigns/Insights/ArticleContent/pbtech-meetup.jpg?la=en&hash=15E7F6911D48415FA451C79953945422C1797D55',
        }}
      />
      <CardBody>
        <Title>teste</Title>
        <Content>
          <IconText>
            <Icon name="perm-contact-calendar" size={24} color="#555" />
            <TextIcon>sei la</TextIcon>
          </IconText>
          <IconText>
            <Icon name="pin-drop" size={24} color="#555" />
            <TextIcon>location</TextIcon>
          </IconText>
          <IconText>
            <Icon name="person" size={24} color="#555" />
            <TextIcon>organizador: Mauricio</TextIcon>
          </IconText>
        </Content>
        <ButtonIns onPress={() => {}}>Me inscrever</ButtonIns>
      </CardBody>
    </Container>
  );
}
