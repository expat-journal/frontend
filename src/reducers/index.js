// import action types

import { 
    LOGIN_START, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
} from "../actions";

const initialState = {
  posts: [],
  activePost: {},
  registeringUser: false,
  loggingIn: false,
  gettingPosts: false,
  postingPosts: false,
  deletingPosts: false,
  updatingPosts: false,
  error: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
