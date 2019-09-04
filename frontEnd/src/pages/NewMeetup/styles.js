import styled from 'styled-components';
import { Form, Input } from '@rocketseat/unform';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 750px;
  margin: 50px auto;
`;

export const StyleForm = styled(Form)`
  max-width: 940px;
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker-ignore-onclickoutside {
    width: 100%;
  }

  .description-text {
    width: 100%;
    height: 250px;
    border: none;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin: 5px 0;
    font-family: 'Roboto';
    font-size: 18px;
    color: rgba(255, 255, 255, 0.5);
    padding: 25px;
    resize: none;
    &::placeholder {
      font-family: 'Roboto';
      font-size: 18px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;
export const InputForm = styled(Input)`
  border: none;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50px;
  border-radius: 5px;
  margin: 5px 0;
  font-family: 'Roboto';
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 25px;
  &::placeholder {
    font-family: 'Roboto';
    font-size: 18px;
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const ButtonWarrper = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    max-width: 138px;
    height: 42px;
    align-self: flex-end;
    width: 163px;
    margin: 5px 0;
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
  }
`;
