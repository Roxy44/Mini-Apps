import { call, put, select, takeLatest, all, fork } from 'redux-saga/effects';
import { message } from 'antd';

// function* getDataFromJson() {
//     try {
//         const productCount = data.products.map((item: {name: string, price: number, count: number}) => item.count).reduce((count: number, curr: number) => count + curr, 0);
//         yield put({ type: 'SET_PRODUCT_DATA', payload: data.products });
//         yield put({ type: 'SET_MACHINE_WITHDRAW', payload: data.withdraw });
//         yield put({ type: 'SET_MACHINE_BALANCE', payload: data.balance });
//         yield put({ type: 'SET_PRODUCT_COUNT', payload: productCount });
//     } catch (e) {
//         message.error('Error!');
//     }
// }

export function* settingsSaga() {
    yield all([
        // takeLatest('GET_MACHINE_DATA_FROM_JSON', getDataFromJson),
    ]);
}