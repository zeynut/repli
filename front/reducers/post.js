export const initialState = {
    mainPosts: [{
        User:{
            id:1,
            nickname:"제이넛",
            content: "첫번째글입니다.",
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        
        },
        
    }],
    imagePaths: [],
};

export const ADD_POST = 'ADD_POST';
export const ADD_DUMMY = 'ADD_DUMMY';

const addPost = {
    type: ADD_POST
}

const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: '헬로우컨테트',
        UserId: 1,
        User: {
            nickname: '제이넛',
        },
    },
}

const reducer = ( state = initialState , action ) => {
    switch(action.type){
        case ADD_POST: {
            return {
                ...state,
            }
        }
        case ADD_DUMMY : {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
}

export default reducer;