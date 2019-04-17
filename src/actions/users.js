import axiosWithAuth from "../utils/axiosWithAuth";

// getUser action suite for Users.js
export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const getUser = id => dispatch => {
  dispatch({ type: GET_USER_START });
  axiosWithAuth()
    .get(`https://expat-backend.herokuapp.com/users/${id}`)
    .then(res => {
      console.log("GOT USER", res.data);
      // DOUBLE CHECK PAYLOAD
      dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_USER_FAILURE, payload: err.response });
    });
};

// getUser action suite for Users.js
export const GET_USER_POST_START = "GET_USER_POST_START";
export const GET_USER_POST_SUCCESS = "GET_USER_POST_SUCCESS";
export const GET_USER_POST_FAILURE = "GET_USER_POST_FAILURE";

export const getUserPost = id => dispatch => {
  dispatch({ type: GET_USER_POST_START });
  axiosWithAuth()
    .get(`https://expat-backend.herokuapp.com/users/posts/${id}`)
    .then(res => {
      console.log("GOT USER", res.data);
      // DOUBLE CHECK PAYLOAD
      dispatch({ type: GET_USER_POST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_USER_POST_FAILURE, payload: err.response });
    });
};
