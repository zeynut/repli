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

export const loginAction = {
    type: LOG_IN,
 }

export const signupAction = (data) => {
    return {
        type: SIGN_UP,
        data: data,
    }
}; 

const reducer = ( state = initialState , action ) => {
    switch (action.type) {
        case LOG_IN : {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
            }
        }
        case LOG_OUT : {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
        case SIGN_UP: {
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

