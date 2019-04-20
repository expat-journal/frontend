import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS } from "../actions/login";

const initialState = {
    loggingIn:   false,
    error:       null,
    gettingUser: false,
};

const loginReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case LOGIN_START:
            return {
                ...state,
                loggingIn: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn:  false,
                activeUser: {
                    user_name: action.credentials,
                    user_id:   action.user_id
                }
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loggingIn:  false,
                error:      action.payload,
                activeUser: {}
            };
        default:
            return state;
    }
};

export default loginReducer;
