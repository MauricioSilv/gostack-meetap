import styled from 'styled-components/native';
import Button from '../Button';

export const Container = styled.View`
  background-color: #fff;
  margin: 5px 20px;
  border-radius: 5px;
`;

export const Image = styled.Image`
  height: 150px;
  width: 100%;
`;

export const CardBody = styled.View`
  padding: 20px;
`;
export const Title = styled.Text`
  color: #333;
  font-size: 20px;
  font-weight: bold;
`;
export const Content = styled.View`
  margin: 20px 0;
`;
export const IconText = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const TextIcon = styled.Text``;
export const ButtonIns = styled(Button)``;
