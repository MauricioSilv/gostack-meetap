import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 750px;
  margin: 50px auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    strong {
      color: #fff;
      font-size: 32px;
      font-family: 'Roboto';
      opacity: 0.9;
    }
  }
`;

export const Button = styled.button`
  max-width: 172px;
  height: 42px;
  align-self: flex-end;
  width: 163px;
  margin: 5px 0 0;
  height: 42px;
  background: #d44059;
  color: #fff;
  border: 0;
  border-radius: 5px;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.04, '#d44059')};
  }
`;

export const ListMeetups = styled.li`
  list-style: none;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  padding: 20px 50px;

  &:hover {
    cursor: pointer;
  }
`;

export const NameMeetup = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Roboto';
  opacity: 0.9;
  p {
    margin: 0 8px;
  }
`;

export const DateMeetup = styled.div`
  font-family: 'Roboto';
  display: flex;
  align-items: center;
  span {
    color: #fff;
    margin: 0 5px;
  }
`;
