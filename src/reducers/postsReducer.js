import {
    DELETE_POST_FAILURE, DELETE_POST_START, DELETE_POST_SUCCESS,
    GET_POST_ID_FAILURE, GET_POST_ID_START, GET_POST_ID_SUCCESS, GET_POSTS_FAIL,
    GET_POSTS_START, GET_POSTS_SUCCESS, NEW_POST_FAILURE, NEW_POST_START,
    NEW_POST_SUCCESS, SET_ACTIVE_POST, UPDATE_POST_FAILURE, UPDATE_POST_START,
    UPDATE_POST_SUCCESS,
} from "../actions/postsData";

const initialState = {
    posts:         [],
    post:          {},
    activePost:    {},
    gettingPosts:  false,
    gettingPost:   false,
    postingPosts:  false,
    deletingPosts: false,
    updatingPosts: false,
    error:         null,
};

const postReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_POSTS_START:
            return {
                ...state,
                gettingPosts: true
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                gettingPosts: false,
                posts:        action.payload
            };
        case GET_POSTS_FAIL:
            return {
                ...state,
                gettingPosts: false,
                error:        action.payload
            };
        case NEW_POST_START:
            return {
                ...state,
                error:        null,
                postingPosts: true
            };
        
        case NEW_POST_SUCCESS:
            return {
                ...state,
                error:        null,
                postingPosts: false,
                posts:        action.payload
            };
        case NEW_POST_FAILURE:
            return {
                ...state,
                error:        "Something went wrong",
                postingPosts: false
            };
        case GET_POST_ID_START:
            return {
                ...state,
                error:       null,
                gettingPost: true
            };
        
        case GET_POST_ID_SUCCESS:
            return {
                ...state,
                error:       null,
                post:        action.payload,
                gettingPost: false
            };
        case GET_POST_ID_FAILURE:
            return {
                ...state,
                error:       "Something went wrong",
                gettingPost: false
            };
        case SET_ACTIVE_POST:
            return {
                ...state,
                activePost: action.payload
            };
        case UPDATE_POST_SUCCESS:
            const posts = this.state.posts.map( post => {
                if ( post.id === action.payload.id ) {
                    const post = {
                        ...action.payload
                    };
                    return post;
                }
                return post;
            } );
            return {
                ...state,
                posts: [ ...posts ]
            };
        case DELETE_POST_START:
            return {
                ...state,
                deletingPost: true
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                posts:        action.payload,
                deletingPost: false
            };
        case DELETE_POST_FAILURE:
            return {
                ...state,
                error:        action.payload,
                deletingPost: false
            };
        default:
            return state;
    }
};

export default postReducer;
