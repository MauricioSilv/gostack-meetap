import React, { useState, useEffect } from 'react';
import { MdAccessTime, MdNewReleases } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import history from '~/services/history';
import {
  Container,
  Button,
  ListMeetups,
  NameMeetup,
  DateMeetup,
} from './styles';

import api from '~/services/api';

export default function Dashboard() {
  const [meetaps, setMeetaps] = useState([]);

  function hanldeNewMeetup() {
    history.push('/register-meetup');
  }

  function handleDetails(meet) {
    history.push('/details', { meet });
  }

  useEffect(() => {
    async function loadMeetaps() {
      const response = await api.get('meetap');

      const data = response.data.map(meetup => ({
        ...meetup,
        formatedDate: format(parseISO(meetup.date), "d 'de' MMMM, 'às' HH:mm", {
          locale: pt,
        }),
      }));
      setMeetaps(data);
    }
    loadMeetaps();
  }, []);

  return (
    <Container>
      <header>
        <strong>Meus meetups</strong>
        <Button onClick={hanldeNewMeetup}>Novo meetup</Button>
      </header>
      <ul>
        {meetaps.map(meet => (
          <ListMeetups key={meet.id} onClick={() => handleDetails(meet)}>
            <NameMeetup>
              <MdNewReleases color="#50fa7b" />
              <p>{meet.title}</p>
            </NameMeetup>
            <DateMeetup>
              <span>{meet.formatedDate}</span>
              <MdAccessTime size={18} color="#f1fa8c" />
            </DateMeetup>
          </ListMeetups>
        ))}
      </ul>
    </Container>
  );
}
