import { combineReducers } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';

import { settingsReducer } from './BackgroundChanger/reducers/settingsReducer';

const rootReducer = combineReducers({
    settings: settingsReducer,
});
  
const sagaMiddleware = createSagaMiddleware();
  
export const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);