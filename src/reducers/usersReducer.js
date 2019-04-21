import {
    GET_USER_FAILURE, GET_USER_START, GET_USER_SUCCESS, SET_USER,
    UPDATE_USER_FAILURE, UPDATE_USER_START, UPDATE_USER_SUCCESS, SET_TOKEN,
    SET_USER_AND_TOKEN
} from "../actions";

const initialState = {
    gettingUser: false,
    activeUser: {},
    user: {},
    token: null,
    updateUser: false,
    loggedIn: false,
};

const usersReducer = ( state = initialState, action ) => {
    
    switch( action.type ){
        
        case GET_USER_START:
            return {
                ...state, error: null, gettingUser: true
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                error: null,
                userProfile: action.payload,
                gettingUser: false
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                error: "Something went wrong",
                gettingUser: false,
                activeUser: {}
            };
        case UPDATE_USER_START:
            return {
                ...state, error: null, updateUser: true
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                error: null,
                userToUpdate: action.payload,
                updateUser: false
            };
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                error: "Something went wrong",
                updateUser: false,
                userToUpdate: []
            };
        
        case SET_USER:
            return {
                ...state, user: action.payload,
            };
        case SET_TOKEN:
            return {
                ...state, token: action.payload, loggedIn: true,
            };
        case SET_USER_AND_TOKEN:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                loggedIn: true
            };
        default:
            return state;
    }
};

export default usersReducer;
