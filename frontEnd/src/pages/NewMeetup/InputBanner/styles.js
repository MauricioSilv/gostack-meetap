import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 10px;
  label {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      height: 300px;
      width: 100%;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.2);
    }
    h2 {
      height: 300px;
      width: 100%;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.2);
      color: rgba(255, 255, 255, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    input {
      display: none;
    }
  }
`;
