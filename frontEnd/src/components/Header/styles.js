import styled from 'styled-components';

export const Container = styled.div`
  background: #100e17;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 5px;
      font-size: 12px;
      color: #999999;
    }
  }
`;

export const Button = styled.button`
  width: 71px;
  height: 42px;
  background: #d44059;
  border: 0;
  margin-left: 10px;
  border-radius: 4px;
  color: #fff;
`;
