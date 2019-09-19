import { all, takeLatest, call, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = { name, email, ...(rest.oldPassword ? rest : {}) };

    const response = yield call(api.put, 'users', profile);

    showMessage({ message: 'Perfil atualizado com sucesso!', type: 'success' });

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    showMessage({
      message: 'Erro ao atualizar, verifique seus dados',
      type: 'danger',
    });
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
