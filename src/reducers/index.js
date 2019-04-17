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
  NEW_POST_START,
  NEW_POST_SUCCESS,
  NEW_POST_FAILURE,
  GET_POST_ID_START,
  GET_POST_ID_SUCCESS,
  GET_POST_ID_FAILURE,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_POST_START,
  GET_USER_POST_SUCCESS,
  GET_USER_POST_FAILURE
} from "../actions";

const initialState = {
  posts: [],
  post: {},
  activePost: {},
  registeringUser: false,
  loggingIn: false,
  gettingPosts: false,
  gettingPost: false,
  postingPosts: false,
  deletingPosts: false,
  updatingPosts: false,
  error: null,
  gettingUser: false,
  activeUser: {},
  registeredUser: {},
  userRegistered: false
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
        loggingIn: false,
        activeUser: { user_name: action.credentials, user_id: action.user_id }
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        error: action.payload,
        activeUser: {}
      };
    case REGISTER_START:
      return {
        ...state,
        error: null,
        registeringUser: true,
        userRegistered: false
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        registeringUser: false,
        userRegistered: true,
        registeredUser: action.user
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        error: "Something went wrong",
        registeringUser: false,
        userRegistered: false
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
    case NEW_POST_START:
      return {
        ...state,
        error: null,
        postingPosts: true
      };

    case NEW_POST_SUCCESS:
      return {
        ...state,
        error: null,
        postingPosts: false,
        posts: action.payload
      };
    case NEW_POST_FAILURE:
      return {
        ...state,
        error: "Something went wrong",
        postingPosts: false
      };
    case GET_POST_ID_START:
      return {
        ...state,
        error: null,
        gettingPost: true
      };

    case GET_POST_ID_SUCCESS:
      return {
        ...state,
        error: null,
        post: action.payload,
        gettingPost: false
      };
    case GET_POST_ID_FAILURE:
      return {
        ...state,
        error: "Something went wrong",
        gettingPost: false
      };
    case GET_USER_START:
      return {
        ...state,
        error: null,
        gettingUser: true
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        error: null,
        activeUser: action.credentials,
        gettingUser: false
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        error: "Something went wrong",
        gettingUser: false,
        activeUser: {}
      };
    case GET_USER_POST_START:
      return {
        ...state,
        error: null,
        gettingUser: true
      };
    case GET_USER_POST_SUCCESS:
      return {
        ...state,
        error: null,
        activeUser: action.credentials,
        gettingUser: false
      };
    case GET_USER_POST_FAILURE:
      return {
        ...state,
        error: "Something went wrong",
        gettingUser: false,
        activeUser: {}
      };
    default:
      return state;
  }
};

export default rootReducer;
