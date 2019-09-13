import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  CardBody,
  Title,
  Content,
  IconText,
  TextIcon,
  ButtonIns,
  Image,
} from './styles';

export default function CardMeetup({ meetup, ButtonPress, ButtonText }) {
  const { banner, title, formattedDate, place, owner } = meetup;
  return (
    <Container>
      <Image
        source={{
          uri: banner.url,
        }}
      />
      <CardBody>
        <Title>{title}</Title>
        <Content>
          <IconText>
            <Icon name="perm-contact-calendar" size={24} color="#555" />
            <TextIcon>{formattedDate}</TextIcon>
          </IconText>
          <IconText>
            <Icon name="pin-drop" size={24} color="#555" />
            <TextIcon>{place}</TextIcon>
          </IconText>
          <IconText>
            <Icon name="person" size={24} color="#555" />
            <TextIcon>organizador: {owner.name}</TextIcon>
          </IconText>
        </Content>
        <ButtonIns onPress={ButtonPress}>{ButtonText}</ButtonIns>
      </CardBody>
    </Container>
  );
}
