import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { showMessage } from 'react-native-flash-message';
import CardMeetup from '~/components/CardMeetup';
import ExistsMeetup from '~/components/ExistsMeetup';
import Background from '~/components/Background';
import { Container, MeetUpsList } from './styles';
import api from '~/services/api';

export default function Subscriptions() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function getMeetupsSubscriptions() {
      const response = await api.get('subscriptions');
      const subscriptionsMeetups = response.data.map(subs => ({
        ...subs.meetup,
        formattedDate: format(
          parseISO(subs.meetup.date),
          "d 'de' MMMM 'de' yyyy 'às' HH:mm",
          { locale: pt }
        ),
      }));
      setMeetups(subscriptionsMeetups);
    }
    getMeetupsSubscriptions();
  }, []);

  async function handleCancelSubscription({ id, title }) {
    try {
      await api.delete(`subscriptions/${id}/delete`);

      setMeetups(meetups.filter(meetup => meetup.id !== id));

      showMessage({
        message: `Sua inscrição no meetup ${title} foi cancelada com sucesso.`,
        type: 'success',
      });
    } catch (err) {
      showMessage({
        message: err.response.data.userMessage,
        type: 'danger',
      });
    }
  }

  function handleSubscriptions() {
    return (
      <MeetUpsList
        data={meetups}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <CardMeetup
            meetup={item}
            ButtonPress={() => handleCancelSubscription(item)}
            ButtonText="Cancelar inscrição"
          />
        )}
        ListEmptyComponent={<ExistsMeetup />}
      />
    );
  }

  return (
    <Background>
      <Container>{handleSubscriptions()}</Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  title: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event-available" size={25} color={tintColor} />
  ),
};
