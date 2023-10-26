import { fork, all } from 'redux-saga/effects';
import { settingsSaga } from './settingsSaga';

export default function* rootSaga() {
    yield all([
        fork(settingsSaga)
    ]);
}