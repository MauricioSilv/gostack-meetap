import React, { useState, useMemo, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { format, subDays, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import CardMeetup from '~/components/CardMeetup';
import ExistsMeetup from '~/components/ExistsMeetup';
import Background from '~/components/Background';
import {
  Container,
  DateFormated,
  TextDate,
  PageTitle,
  MeetupList,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function formatMeetupsDate(formattDate) {
    return formattDate.map(meetup => ({
      ...meetup,
      formattedDate: format(
        parseISO(meetup.date),
        "d 'de' MMMM 'de' yyyy 'às' HH:mm",
        { locale: pt }
      ),
    }));
  }

  useEffect(() => {
    async function getMeetup() {
      const response = await api.get('meetap/date', {
        params: {
          date: date.toISOString(),
        },
      });

      setMeetups(formatMeetupsDate(response.data));
    }
    getMeetup();
  }, [date]);

  async function loadMoreMeetUps() {
    const nextPage = page + 1;

    const response = await api.get('meetap/date', {
      params: {
        date: date.toISOString(),
        page: nextPage,
      },
    });

    setMeetups([...meetups, ...formatMeetupsDate(response.data)]);
    setPage(nextPage);
  }

  function renderMeetups() {
    return (
      <MeetupList
        data={meetups}
        keyExtractor={item => String(item.id)}
        onEndReachedThreshold={0.2}
        onEndReached={loadMoreMeetUps}
        renderItem={({ item }) => (
          <CardMeetup
            meetup={item}
            ButtonPress={() => {}}
            ButtonText="Realizar inscrição"
          />
        )}
        ListEmptyComponent={<ExistsMeetup />}
      />
    );
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Background>
      <Container>
        <PageTitle>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="keyboard-arrow-left" size={28} color="#fff" />
          </TouchableOpacity>
          <DateFormated>
            <TextDate>{dateFormatted}</TextDate>
          </DateFormated>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="keyboard-arrow-right" size={28} color="#fff" />
          </TouchableOpacity>
        </PageTitle>
        {renderMeetups()}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
