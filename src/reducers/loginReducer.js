import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS } from "../actions";

const initialState = {
    loggingIn: false, loggedInSuccessfully: false, error: null,
};

const loginReducer = ( state = initialState, action ) => {
    switch( action.type ){
        case LOGIN_START:
            return {
                ...state, loggingIn: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state, loggingIn: false, loggedInSuccessfully: true
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                error: action.payload,
                activeUser: {}
            };
        default:
            return state;
    }
};

export default loginReducer;
