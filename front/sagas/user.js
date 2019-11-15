import {all , put, delay, call, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import {
LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
SIGN_UP_REQUEST, SIGN_UP_SUCCESS,SIGN_UP_FAILURE, 
LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAILURE,
FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAILURE,
UNFOLLOW_USER_REQUEST, UNFOLLOW_USER_SUCCESS, UNFOLLOW_USER_FAILURE,
LOAD_FOLLOWERS_REQUEST,LOAD_FOLLOWERS_SUCCESS,LOAD_FOLLOWERS_FAILURE,
LOAD_FOLLOWINGS_REQUEST,LOAD_FOLLOWINGS_SUCCESS,LOAD_FOLLOWINGS_FAILURE,
REMOVE_FOLLOWER_REQUEST,REMOVE_FOLLOWER_SUCCESS,REMOVE_FOLLOWER_FAILURE,
EDIT_NICKNAME_REQUEST, EDIT_NICKNAME_SUCCESS, EDIT_NICKNAME_FAILURE,
} from '../reducers/user';

import axios from 'axios';

function loginAPI(loginData) {
    console.log('로그인api');
    return axios.post('/user/login', loginData,{
        withCredentials: true,
    });
}

function* login(action){
    try{  console.log('로그인action');
            const result = yield call(loginAPI, action.data);
            yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
           });

    }catch(e){
            console.error(e);
            yield put( {
               type: LOG_IN_FAILURE,
               reason: e.response && e.response.data
             })
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}


function signUpAPI(signUpData) {
    return axios.post('/user/', signUpData);
}

function* signUp(action){
    try{    console.log('signup: ',action.data);
            yield call(signUpAPI , action.data);
            yield put({ type: SIGN_UP_SUCCESS });

    }catch(e){
            console.error(e);
            yield put( { type: SIGN_UP_FAILURE, error: e });
    }
}

function* watchSignUp(){
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}


function logOutAPI() {
    return axios.post('/user/logOut',{},{withCredentials:true});
}

function* logOut(){
    try{   
            yield call(logOutAPI);
            yield put({ type: LOG_OUT_SUCCESS });

    }catch(e){
            console.error(e);
            yield put( { type: LOG_OUT_FAILURE, error: e });
    }
}

function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}


function loadUserAPI(userId) {
    return axios.get( userId ? `/user/${userId}` : '/user/',{withCredentials:true});
}

function* loadUser(action){
    try{   
            const result = yield call(loadUserAPI, action.data);
            yield put({ type: LOAD_USER_SUCCESS,
                        data: result.data,
                        me: !action.data });

    }catch(e){
            console.error(e);
            yield put( { type: LOAD_USER_FAILURE, error: e });
    }
}

function* watchLoadUser(){
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}


function followAPI(userId) {
    return axios.post(`/user/${userId}/follow`, {} ,{withCredentials:true});
}

function* follow(action){
    try{   
            const result = yield call(followAPI, action.data);
            yield put({ type: FOLLOW_USER_SUCCESS,
                        data: result.data,
            });

    }catch(e){
            console.error(e);
            yield put( { type: FOLLOW_USER_FAILURE, error: e });
    }
}

function* watchFollow(){
    yield takeLatest(FOLLOW_USER_REQUEST, follow);
}

function unfollowAPI(userId) {
    return axios.delete(`/user/${userId}/follow`,{withCredentials:true});
}

function* unfollow(action){
    try{   
            const result = yield call(unfollowAPI, action.data);
            yield put({ type: UNFOLLOW_USER_SUCCESS,
                        data: result.data,
            });

    }catch(e){
            console.error(e);
            yield put( { type: UNFOLLOW_USER_FAILURE, error: e });
    }
}

function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_USER_REQUEST, unfollow);
}


function loadFollowersAPI(userId , offset = 0 , limit = 3 ) {
    return axios.get(`/user/${ userId || 0 }/followers?offset=${offset}&limit=${limit}`,{withCredentials:true});
}

function* loadFollowers(action){
    try{   
            const result = yield call(loadFollowersAPI, action.data, action.offset);
            yield put({ type: LOAD_FOLLOWERS_SUCCESS,
                        data: result.data,
            });

    }catch(e){
            console.error(e);
            yield put( { type: LOAD_FOLLOWERS_FAILURE, error: e });
    }
}

function* watchLoadFollowers(){
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}


function loadFollowingsAPI( userId , offset = 0 , limit = 3 ) {
    return axios.get(`/user/${ userId || 0 }/followings?offset=${offset}&limit=${limit}`,{withCredentials:true});
}

function* loadFollowings(action){
    try{   
            const result = yield call(loadFollowingsAPI, action.data);
            yield put({ type: LOAD_FOLLOWINGS_SUCCESS,
                        data: result.data,
            });

    }catch(e){
            console.error(e);
            yield put( { type: LOAD_FOLLOWINGS_FAILURE, error: e });
    }
}

function* watchLoadFollowings(){
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function removeFollowerAPI(userId) {
    return axios.delete(`/user/${userId}/follower`,{withCredentials:true});
}

function* removeFollower(action){
    try{   
            const result = yield call(removeFollowerAPI, action.data);
            yield put({ type: REMOVE_FOLLOWER_SUCCESS,
                        data: result.data,
            });

    }catch(e){
            console.error(e);
            yield put( { type: REMOVE_FOLLOWER_FAILURE, error: e });
    }
}

function* watchRemoveFollower(){
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameAPI(nickname) {
    return axios.patch(`/user/nickname`, {nickname},{withCredentials:true});
}

function* editNickname(action){
    try{   
            const result = yield call(editNicknameAPI, action.data);
            yield put({ type: EDIT_NICKNAME_SUCCESS,
                        data: result.data,
            });

    }catch(e){
            console.error(e);
            yield put( { type: EDIT_NICKNAME_FAILURE, error: e });
    }
}

function* watchEditNickname(){
    yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),
        fork(watchEditNickname),
    ]);
}