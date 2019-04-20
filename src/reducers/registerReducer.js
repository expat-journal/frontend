import {
    REGISTER_FAILURE, REGISTER_START, REGISTER_SUCCESS
} from "../actions/register";

const initialState = {
    registeringUser: false,
    error:           null,
    userRegistered:  null,
};

const registerReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case REGISTER_START:
            return {
                ...state,
                error:           null,
                registeringUser: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                error:           null,
                registeringUser: false,
                userRegistered:  true,
                registeredUser:  action.user
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                error:           action.payload.response.data.message,
                registeringUser: false,
                userRegistered:  false
            };
        default:
            return state;
    }
};

export default registerReducer;
