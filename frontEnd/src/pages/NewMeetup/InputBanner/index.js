import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import api from '~/services/api';

import { Container } from './styles';

export default function InputBanner() {
  const { defaultValue, registerField } = useField('banner');
  const [previews, setPreviews] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'img_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]);//eslint-disable-line

  async function handleChanges(event) {
    const data = new FormData();

    data.append('file', event.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreviews(url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        {previews ? (
          <img src={previews} alt="" />
        ) : (
          <h2>Adicionar uma imagem</h2>
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={handleChanges}
          data-file={file}
          ref={ref}
        />
      </label>
    </Container>
  );
}
