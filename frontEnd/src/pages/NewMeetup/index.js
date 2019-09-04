import React from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import { Container, StyleForm, ButtonWarrper, InputForm } from './styles';

import DatePicker from './DatePicker';
import InputBanner from './InputBanner';

import api from '~/services/api';
import history from '~/services/history';

export default function NewMeetup({ location }) {
  async function handleSubmit(data) {
    let resp = null;
    try {
      if (location.state) {
        const { id } = location.state.meet.current;
        resp = await api.put(`meetap/${id}`, data);
      } else {
        resp = await api.post('meetap', data);
      }

      const meet = {
        ...resp.data,
        formatedDate: format(
          parseISO(resp.data.date),
          "d 'de' MMMM', às' HH:mm",
          {
            locale: pt,
          }
        ),
      };

      toast.success('Meetup salvo com sucesso');
      history.push('/details', { meet });
    } catch (err) {
      toast.error(
        err.response
          ? err.response.data.userMessage
          : 'Houve um erro ao salvar seu meetup, verfique os dados preenchidos'
      );
    }
  }
  return (
    <Container>
      <StyleForm
        initialData={location.state ? location.state.meet.current : null}
        onSubmit={handleSubmit}
      >
        <InputBanner />
        <InputForm name="title" placeholder="Titulo do meetup" />
        <InputForm
          multiline
          name="description"
          placeholder="Descrição do meetup"
          className="description-text"
          maxLength={255}
        />
        <DatePicker
          name="date"
          selectedDate={location.state && location.state.meet.current.date}
        />
        <InputForm name="place" placeholder="localização" />
        <ButtonWarrper>
          <button type="submit">Salvar meetup</button>
        </ButtonWarrper>
      </StyleForm>
    </Container>
  );
}
