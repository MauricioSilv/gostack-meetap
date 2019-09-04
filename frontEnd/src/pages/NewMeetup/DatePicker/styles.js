import styled from 'styled-components';
import DatePicker from 'react-datepicker';

export const DatePickerStyle = styled(DatePicker)`
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
