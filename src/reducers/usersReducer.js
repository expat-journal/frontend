import {
    GET_USER_FAILURE, GET_USER_START, GET_USER_SUCCESS, UPDATE_USER_FAILURE,
    UPDATE_USER_START, UPDATE_USER_SUCCESS
} from "../actions/users";

const initialState = {
    gettingUser: false,
    activeUser:  {},
    userProfile: {},
    updateUser:  false,
};

const usersReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case GET_USER_START:
            return {
                ...state,
                error:       null,
                gettingUser: true
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                error:       null,
                userProfile: action.payload,
                gettingUser: false
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                error:       "Something went wrong",
                gettingUser: false,
                activeUser:  {}
            };
        case UPDATE_USER_START:
            return {
                ...state,
                error:      null,
                updateUser: true
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                error:        null,
                userToUpdate: action.payload,
                updateUser:   false
            };
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                error:        "Something went wrong",
                updateUser:   false,
                userToUpdate: []
            };
        default:
            return state;
    }
};

export default usersReducer;
