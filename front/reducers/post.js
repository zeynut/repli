import produce from 'immer';

export const initialState = {
    
    mainPosts: [],  //포스트들
    imagePaths: [],    //이미지경로
    addPostErrorReason: false,    //포스트에러이유
    isAddingPost: false,     //포스트 업로드 중
    isAddingComment: false,   //댓글 업로드 중
    postAdded: false,      //포스트 업로드 완료
    addCommentErrorReason: false,   //댓글 에러 이유
    commentAdded: false,     //댓글업로드완료
    hasMorePost: false,  
    singlePost: '', 
};

// const dummyPost ={
//     id:2,
//     User: {
//         id: 2,
//         nickname: '추가더미',
       
//     },
//     content: '나는 더미 입니다.',
//     Comments: [],
// }

// const dummyComment = {
//     id:1,
//     User: {
//         id: 1,
//         nickname:'포스트더미커멘트',
//     },
//     createdAt: new Date(),
//     content: '더미 댓글입니다',
// }

//액션이름
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UOLOAD_IMAGES_REQUEST = 'UOLOAD_IMAGES_REQUEST';
export const UOLOAD_IMAGES_SUCCESS = 'UOLOAD_IMAGES_SUCCESS';
export const UOLOAD_IMAGES_FAILURE = 'UOLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

//액션 정의

export default ( state = initialState , action ) => {
    return produce( state, (draft) => { 
        switch(action.type){
            case REMOVE_IMAGE : {
                const index = draft.imagePaths.findIndex( (v,i) => i === action.index);
                draft.imagePaths.splice(index , 1);
                break;
                // return {
                //     ...state,
                //     imagePaths: state.imagePaths.filter(
                //         (v, i) => i !== action.index
                //     )
                // }
            }
            case ADD_POST_REQUEST: {
                draft.isAddingPost = true;
                draft.addPostErrorReason = '';
                draft.postAdded = false;
                break;

                // return {
                //     ...state,
                //     isAddingPost: true,
                //     addPostErrorReason: '',
                //     postAdded: false,
                // }
            }
            case ADD_POST_SUCCESS:{
                draft.isAddingPost = false;
                draft.mainPosts.unshift(action.data);
                draft.postAdded = true;
                draft.imagePaths = [];
                break;

                // return {
                //     ...state,
                //     isAddingPost: false,
                //     mainPosts: [action.data, ...state.mainPosts ],
                //     postAdded: true,
                //     imagePaths: [],
                // }
            }
            case ADD_POST_FAILURE: {
                draft.isAddingPost = false;
                draft.addPostErrorReason = action.error;
                break;

                // return {
                //     ...state,
                //     isAddingPost: false,
                //     addPostErrorReason: action.error,
                // }
            }
            case LOAD_COMMENTS_REQUEST : {
                draft.mainPosts = [];
                break;

                // return{
                //     ...state,
                //     mainPosts: [],
    
                // }
            }
            case LOAD_COMMENTS_SUCCESS : {
                const postIndex = draft.mainPosts.findIndex( v => v.id === action.data.postId);
                draft.mainPosts[postIndex].Comments = action.data.comments;
                break;

                // const postIndex = state.mainPosts.findIndex( v => v.id === action.data.postId);
                // const post = state.mainPosts[postIndex];
                // const Comments = action.data.comments;
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = { ...post, Comments };
                
                // return{
                //     ...state,
                //     mainPosts,
                // }
            }
            case LOAD_COMMENTS_FAILURE : {
                darft.mainPosts = [];
                break;

                // return{
                //     ...state,
                //     mainPosts:[]
                // }
            }
    
            case ADD_COMMENT_REQUEST: {
                draft.isAddingComment = true;
                draft.addCommentErrorReason = '';
                draft.commentAdded = false;
                break;

                // return {
                //     ...state,
                //     isAddingComment: true,
                //     addCommentErrorReason: '',
                //     commentAdded: false,
                // }

            }
            case ADD_COMMENT_SUCCESS:{
                const postIndex = draft.mainPosts.findIndex( v => v.id === action.data.postId);
                darft.mainPosts[postIndex].Comments.push(action.data.comment);
                draft.commentAdded = true;
                draft.isAddingComment = false;
                break;

                // const postIndex = state.mainPosts.findIndex( v => v.id === action.data.postId);
                // const post = state.mainPosts[postIndex];
                // const Comments = [...post.Comments , action.data.comment];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = {...post , Comments };
    
                // return {
                //     ...state,
                //     isAddingComment: false,
                //     commentAdded: true,
                //     mainPosts,
                // }
            }
            case ADD_COMMENT_FAILURE: {
                draft.isAddingComment = false;
                draft.addCommentErrorReason = action.error;
                break;
                
                // return {
                //     ...state,
                //     isAddingComment: false,
                //     addCommentErrorReason: action.error,
                // }
            }
            
            case LOAD_USER_POSTS_REQUEST: 
            case LOAD_HASHTAG_POSTS_REQUEST:
            case LOAD_MAIN_POSTS_REQUEST: {
                draft.isAddingPost = true;
                draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
                draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
                break;

                // return {
                //     ...state,
                //     isAddingPost: true,
                //    mainPosts:action.lastId === 0 ? [] : state.mainPosts,
                //    hasMorePost: action.lastId ? state.hasMorePost: true,
                // }
            }
            case LOAD_USER_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:
            case LOAD_MAIN_POSTS_SUCCESS:{
                action.data.forEach( v => {
                    draft.mainPosts.push(v);
                });
                draft.hasMorePost = action.data.length === 10;
                break;

                // return {
                //     ...state,
                //     mainPosts: state.mainPosts.concat(action.data),
                //     hasMorePost: action.data.length === 10,
                //   }
                }
            case LOAD_USER_POSTS_FAILURE:
            case LOAD_HASHTAG_POSTS_FAILURE:
            case LOAD_MAIN_POSTS_FAILURE: {
                break;
                // return {
                //     ...state,
                //  }
            }
             
            case UPLOAD_IMAGES_REQUEST: {
                break;
                // return {
                //   ...state,
                // }
            }
            case UPLOAD_IMAGES_SUCCESS:{
                action.data.forEach( (v) => {
                    draft.imagePaths.push(v);
                });
                break;

                // return {
                //     ...state,
                // imagePaths: [...state.imagePaths, ...action.data]
                //   }
            }
            case UPLOAD_IMAGES_FAILURE: {
                break;
                // return {
                //     ...state,
                //  }
            }
            case LIKE_POST_REQUEST: {
                break;
                // return {
                //   ...state,
                // }
            }
            case LIKE_POST_SUCCESS:{
              const postIndex = draft.mainPosts.findIndex( v => v.id === action.data.postId);
              draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });       
              break;
                // const postIndex = state.mainPosts.findIndex( v => v.id === action.data.postId);
                // const post = state.mainPosts[postIndex];
                // const Likers = [{ id: action.data.userId }, ...post.Likers];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = {...post, Likers};
    
                // return {
                //     ...state,
                //     mainPosts,
                // }
            }
            case LIKE_POST_FAILURE: {
                break;
                // return {
                //     ...state,
                //  }
            }
            case UNLIKE_POST_REQUEST: {
                 break;
                // return {
                //   ...state,
                // }
            }
            case UNLIKE_POST_SUCCESS:{
                const postIndex = draft.mainPosts.findIndex( v => v.id === action.data.postId);
                const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(
                     v => v.id === action.data.userId);
                draft.mainPosts[postIndex].Likers.splice( likeIndex , 1);
                break;
                // const postIndex = state.mainPosts.findIndex( v => v.id === action.data.postId);
                // const post = state.mainPosts[postIndex];
                // const Likers = post.Likers.filter( v => v.id !== action.data.userId);
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = {...post, Likers};
    
                // return {
                //     ...state,
                //     mainPosts,
                // }
            }
            case UNLIKE_POST_FAILURE: {
                break;
                // return {
                //     ...state,
                //  }
            }
    
            case RETWEET_REQUEST: {
                break;
                // return {
                //   ...state,
                // }
            }
            case RETWEET_SUCCESS:{
               draft.mainPosts.unshift(action.data);
                break;
                // return {
                //     ...state,
                // mainPosts: [action.data, ...state.mainPosts ]
                //   }
            }
            case RETWEET_FAILURE: {
              break;
                // return {
                //     ...state,
                //  }
            }
            case REMOVE_POST_REQUEST: {
               break;
                // return {
                //   ...state,
                // }
            }
            case REMOVE_POST_SUCCESS:{
               const index = draft.mainPosts.findIndex( v => v.id  === action.data);
               draft.mainPosts.splice(index , 1 );
                break;

                // return {
                //     ...state,
                // mainPosts: state.mainPosts.filter( v => v.id !== action.data)
                //   }
            }
            case REMOVE_POST_FAILURE: {
                break;
                // return {
                //     ...state,
                //  }
            }
            case LOAD_POST_REQUEST: {
                 break;
            }
            case LOAD_POST_SUCCESS: {
                draft.singlePost = action.data;
                break;
            }
            case LOAD_POST_FAILURE: {
                break;
            }
            default : {
                break;
                // return {
                //     ...state,
                // }
            }
        }
    });
}
