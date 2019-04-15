// import action types

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_POSTS_START,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
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
      case GET_POSTS_START:
      return {
          ...state,
          gettingPosts: true
      };
      case GET_POSTS_SUCCESS:
      return {
          ...state,
          gettingPosts: false,
          posts: action.payload
      };
      case GET_POSTS_FAIL:
      return {
          ...state,
          gettingPosts: false,
          error: action.payload
      };

    default:
      return state;
  }
};

export default rootReducer;
