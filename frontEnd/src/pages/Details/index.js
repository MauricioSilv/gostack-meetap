import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';
import {
  Container,
  Header,
  EditMeetup,
  NewMeetup,
  ImageMeetup,
  Footer,
} from './styles';

export default function Details({ location }) {
  const current = location.state.meet;
  const { title, description, place, formatedDate, banner } = current;
  function handleEditMeetup() {
    history.push('/register-meetup', { meet: { current } });
  }

  async function handleCancelMeetup() {
    try {
      await api.delete(`/meetap/${current.id}/destroy`);

      toast.success(
        'Meetup cancelado com sucesso, você não terá mais acesso aos dados dele.'
      );
      history.push('/dashboard');
    } catch (err) {
      toast.error(err.response.data.userMessage);
    }
  }

  return (
    <Container>
      <Header>
        <h1>{title}</h1>

        <div>
          <EditMeetup onClick={handleEditMeetup}>Editar</EditMeetup>
          <NewMeetup onClick={handleCancelMeetup}>Cancelar</NewMeetup>
        </div>
      </Header>
      <ImageMeetup>
        <img src={banner.url} alt="Banner do meetup" />
        <p>{description}</p>
      </ImageMeetup>
      <Footer>
        <time>{formatedDate}</time>
        <p>{place}</p>
      </Footer>
    </Container>
  );
}

Details.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      meet: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        place: PropTypes.string,
        formatedDate: PropTypes.string,
        banner: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
