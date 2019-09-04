import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: #100e17;
      border: 0;
      border-radius: 5px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    span {
      color: #d44059;
      align-self: flex-start;
      margin-bottom: 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    button {
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
    }
  }
`;
