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
  GET_COMMENTS_START,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_POST_START,
  GET_USER_POST_SUCCESS,
  GET_USER_POST_FAILURE,
  NEW_COMMENT_START,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  SET_ACTIVE_POST,
  UPDATE_POST_START,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE
} from "../actions";

const initialState = {
  posts: [],
  post: {},
  comments: [],
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
  userRegistered: null,
  userPost: [],
  userProfile: {},
  gettingUserPost: false,
  userToUpdate: {},
  updateUser: false,
  postingComment: false
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
        registeringUser: true
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
    case GET_COMMENTS_START:
      return {
        ...state,
        error: null
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload
      };
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        error: "Something went wrong"
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
        ...state,
        error: null,
        updateUser: true
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

    case GET_USER_POST_START:
      return {
        ...state,
        error: null,
        gettingUserPost: true
      };
    case GET_USER_POST_SUCCESS:
      return {
        ...state,
        error: null,
        userPost: action.payload,
        gettingUserPost: false
      };
    case GET_USER_POST_FAILURE:
      return {
        ...state,
        error: "Something went wrong",
        gettingUser: false,
        gettingUserPost: {}
      };
    case NEW_COMMENT_START:
      return {
        ...state,
        postingComment: true,
        error: null
      };
    case NEW_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        postingComment: false
      };
    case NEW_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case SET_ACTIVE_POST:
      return {
        ...state,
        activePost: action.payload
      };
    case UPDATE_POST_SUCCESS:
      const posts = this.state.posts.map(post => {
        if (post.id === action.payload.id) {
          const post = {
            ...action.payload
          };
          return post;
        }
        return post;
      });
      return {
        ...state,
        posts: [...posts]
      };

      return {
        ...state
      };

    case DELETE_POST_START:
      return {
        ...state,
        deletingPost: true
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        deletingPost: false
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        deletingPost: false
      };
    default:
      return state;
  }
};

export default rootReducer;
