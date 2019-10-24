const dummyUser = {
    nickname: '제이넛',
    Post: [],
    Followers:[],
    Followings: [],
}

export const initialState = {
    isLoggedIn: false,
    user:null,
}

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

const loginAction = {
    type: LOG_IN,
 }

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
        default : {
            return {
                ...state
            }
        }
    }
}

export default reducer;

