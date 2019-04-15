import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from "../actions/index";

const initialState = {
  users: [],
  error: null,
  registeringUser: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Register New User
    case REGISTER_START:
      return {
        ...state,
        error: null,
        registeringUser: true
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        registeringUser: false,
        users: action.payload
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        error: "Something went wrong",
        registeringUser: false
      };
    default:
      return state;
  }
};

export default reducer;
