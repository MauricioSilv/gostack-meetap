import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 750px;
  margin: 50px auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;

  h1 {
    font-family: 'Roboto';
    font-size: 32px;
    color: rgba(255, 255, 255, 0.9);
    flex: 1;
    align-self: center;
  }

  div {
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }
`;

export const EditMeetup = styled.button`
  max-width: 116px;
  height: 42px;
  align-self: flex-end;
  width: 163px;
  margin: 5px 0 0;
  height: 42px;
  background: #18a0fb;
  color: #fff;
  border: 0;
  border-radius: 5px;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.04, '#18a0fb')};
  }
`;
export const NewMeetup = styled.button`
  max-width: 138px;
  height: 42px;
  align-self: flex-end;
  width: 163px;
  margin: 5px 15px 0;
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

export const ImageMeetup = styled.div`
  img {
    width: 100%;
    height: 300px;
  }
  p {
    font-family: 'Roboto';
    font-family: 18px;
    color: #fff;
    margin-top: 30px;
    line-height: 2;
  }
`;

export const Footer = styled.footer`
  display: flex;
  margin-top: 30px;
  time {
    font-family: 'Roboto';
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
  }
  p {
    margin-left: 20px;
    padding-left: 20px;
    font-family: 'Roboto';
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
  }
`;
