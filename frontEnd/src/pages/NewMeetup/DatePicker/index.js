import React, { useRef, useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import { useField } from '@rocketseat/unform';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerStyle } from './styles';

export default function DatePicker({ name, selectedDate }) {
  const ref = useRef();
  const { fieldName, registerField } = useField(name);
  const [selected, setSelected] = useState(
    selectedDate ? parseISO(selectedDate) : new Date()
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ ref.current, fieldName]);//eslint-disable-line

  return (
    <DatePickerStyle
      name={fieldName}
      selected={selected}
      onChange={date => setSelected(date)}
      ref={ref}
      placeholderText="Dia e hora de inicio do meetup"
      showTimeSelect
      dateFormat="Pp"
    />
  );
}

DatePicker.defaultProps = {
  selectedDate: null,
};
