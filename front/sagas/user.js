import {all , call, fork, takeLatest } from 'redux-saga/effects';
import {LOG_IN} from '../reducers/user';

function loginAPI() {

}

function* login(){
    try{
            yield call(loginAPI);
            yield put({
            type: LOG_IN_SUCCESS
           })
    }catch(e){
            console.error(e);
            yield put( {
               type: LOG_IN_FAILURE
             })
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN, login);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
    ]);
}