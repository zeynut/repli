const dummyUser = {
    nickname: '제이넛',
    Post: [],
    Followers:[1,2,3],
    Followings: [],
    id: 1,
}

export const initialState = {
    isLoggedIn: false,
    isLoggedOut: false,
    isLoggingIn: false,
    loginErrorReason: '',
    signedUp: false,
    isSigningUp: false,
    signUpErrorReason: '',
    me:null,
    followingList: [],
    followerList: [],
    userInfo: null,
    signUpData: {},
}

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

export const signupAction = data => ({
        type: SIGN_UP_REQUEST,
        data: data,
}); 

const reducer = ( state = initialState , action ) => {
    switch (action.type) {
        case LOG_IN_REQUEST : {
            return {
                ...state,
                isLoggingIn: true,
                loginErrorReason: '',
            };
        }
        case LOG_IN_SUCCESS : {
            return {
                ...state,
                isLoggingIn: false,
                isLoading:false,
                isLoggedIn: true,
                me: dummyUser,
            };
        }
        case LOG_IN_FAILURE : {
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn:false,
                me: null,
                loginErrorReason: action.error,
            };
        }
        case LOG_OUT_REQUEST : {
            return {
                ...state,
                isLoggingIn: false,
                isLoading:false,
                isLoggedIn: false,
                me: null,
            }
        }
       
        case SIGN_UP_REQUEST: {
            return {
                ...state,
                isSigningUp: true,
                ISsignedUp: false,
                signUpErrorReason: '',
              };
        }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                isSigningUp: false,
                ISsignedUp: true,
                signUpData: action.data,
            };
        }
        case SIGN_UP_FAILURE: {
            return {
                ...state,
                isSigningUp: false,
                signUpErrorReason: action.error,
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

