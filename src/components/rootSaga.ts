import { fork, all } from 'redux-saga/effects';
import { settingsSaga } from './BackgroundChanger/sagas/settingsSaga';

export default function* rootSaga() {
    yield all([
        fork(settingsSaga)
    ]);
}