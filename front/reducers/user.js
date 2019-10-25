const dummyUser = {
    nickname: '제이넛',
    Post: [],
    Followers:[1,2,3],
    Followings: [],
    signUpData: {},
}

export const initialState = {
    isLoggedIn: false,
    user:null,
    signUpData: {},
    loginData: {},
}
export const SIGN_UP = 'SIGN_UP';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';


export const loginAction = {
    type: LOG_IN,
 }

export const signupAction = data => ({
        type: SIGN_UP,
        data: data,
}); 

const reducer = ( state = initialState , action ) => {
    switch (action.type) {
        case LOG_IN_REQUEST : {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
            }
        }
        case LOG_OUT_REQUEST : {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
        case SIGN_UP_REQUEST: {
            return {
                ...state,
                signUpData: action.data,
            };
        }
        default : {
            return {
                ...state
            }
        }
    }
}

export default reducer;

