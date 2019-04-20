import {
    NEW_COMMENT_FAILURE, GET_COMMENTS_FAILURE, GET_COMMENTS_START,
    GET_COMMENTS_SUCCESS, NEW_COMMENT_START, NEW_COMMENT_SUCCESS
} from "../actions";

const initialState = {
    comments:       [],
    error:          null,
    postingComment: false
};

const commentsReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case GET_COMMENTS_START:
            return {
                ...state,
                error: null
            };
        case GET_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.payload
            };
        case GET_COMMENTS_FAILURE:
            return {
                ...state,
                error: "Something went wrong"
            };
        case NEW_COMMENT_START:
            return {
                ...state,
                postingComment: true,
                error:          null
            };
        case NEW_COMMENT_SUCCESS:
            return {
                ...state,
                comments:       action.payload,
                postingComment: false
            };
        case NEW_COMMENT_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default commentsReducer;
