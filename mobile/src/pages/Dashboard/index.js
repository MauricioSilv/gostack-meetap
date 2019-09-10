import React, { useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import api from '~/services/api';

import Background from '~/components/Background';
import { Container, DateFormated, TextDate, PageTitle } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

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
