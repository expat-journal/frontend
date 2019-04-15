// import action types

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from "../actions";
import {} from "../actions";

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

export default rootReducer;
