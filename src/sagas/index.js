import {all} from 'redux-saga/effects';
import chatSagas from './Chat';
import authSagas from './Auth';

export default function* rootSaga(getState) {
  yield all([
    chatSagas(),
    authSagas()
  ]);
}
