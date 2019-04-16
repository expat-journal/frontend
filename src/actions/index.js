import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";

// login action suite LoginPage.js
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post("https://expat-backend.herokuapp.com/users/login", credentials)
    .then(res => {
      console.log("POST Req Approved!", res.data);
      // DOUBLE CHECK PAYLOAD
      localStorage.setItem("token", res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
    })
    .catch(err => {
      console.log("CAN'T LOG IN");
      dispatch({ type: LOGIN_FAIL, payload: err });
    });
};

// registerUser action creator Register.js
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerUser = credentials => dispatch => {
  dispatch({ type: REGISTER_START });
  axios
    .post("https://expat-backend.herokuapp.com/users/register", credentials)
    .then(res => {
      // localStorage.setItem("token", res.data);
      // console.log("data", res.data.payload);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: REGISTER_FAILURE,
        payload: err
      })
    );
};

// getUsers action suite for Register.js and Login.js
export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

export const getUsers = () => dispatch => {
  dispatch({ type: NEW_POST_START });
  axiosWithAuth()
    .get("https://expat-backend.herokuapp.com/users")
    .then(res => {
      console.log(res.data);
      dispatch({ type: NEW_POST_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: NEW_POST_FAILURE,
        payload: err
      })
    );
};

// getPosts action suite for Posts.js
export const GET_POSTS_START = "GET_POSTS_START";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAIL = "GET_POSTS_FAIL";

export const getPosts = () => dispatch => {
  dispatch({ type: GET_POSTS_START });
  axiosWithAuth()
    .get("https://expat-backend.herokuapp.com/posts/0")
    .then(res => {
      console.log("GOT POSTS DATA!", res.data);
      // DOUBLE CHECK PAYLOAD
      dispatch({ type: GET_POSTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_POSTS_FAIL, payload: err.response });
    });
};

// newPost action suite PostForm.js
export const NEW_POST_START = "NEW_POST_START";
export const NEW_POST_SUCCESS = "NEW_POST_SUCCESS";
export const NEW_POST_FAILURE = "NEW_POST_FAILURE";

export const newPost = post => dispatch => {
  dispatch({ type: NEW_POST_START });
  axiosWithAuth()
    .post("https://expat-backend.herokuapp.com/posts", post)
    .then(res => {
      console.log(res.data);
      dispatch({ type: NEW_POST_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: NEW_POST_FAILURE,
        payload: err
      })
    );
};
