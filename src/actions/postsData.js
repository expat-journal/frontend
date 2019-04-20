import axiosWithAuth from "../utils/axiosWithAuth";

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
      dispatch({ type: NEW_POST_SUCCESS, payload: res.data.payload });
    })
    .catch(err =>
      dispatch({
        type: NEW_POST_FAILURE,
        payload: err
      })
    );
};

// getPostID action for Posts.js
export const GET_POST_ID_START = "GET_POST_ID_START";
export const GET_POST_ID_SUCCESS = "GET_POST_ID_SUCCESS";
export const GET_POST_ID_FAILURE = "GET_POST_ID_FAILURE";

export const getPostID = id => dispatch => {
  dispatch({ type: GET_POST_ID_START });
  return axiosWithAuth()
    .get(`https://expat-backend.herokuapp.com/posts/id/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({ type: GET_POST_ID_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: GET_POST_ID_FAILURE,
        payload: err
      })
    );
};

// updatePost action for Posts.js
export const UPDATE_POST_START = "UPDATE_POST_START";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const updatePost = post => dispatch => {
  dispatch({ type: UPDATE_POST_START });
  return axiosWithAuth()
    .put(`https://expat-backend.herokuapp.com/posts/`, post)
    .then(res => {
      console.log("From updatePost:", res.data);
      dispatch({ type: UPDATE_POST_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: UPDATE_POST_FAILURE,
        payload: err
      })
    );
};

export const SET_ACTIVE_POST = "SET_ACTIVE_POST";

export const setActivePost = post => dispatch => {
  dispatch({ type: SET_ACTIVE_POST, payload: post });
};

// deletePost action for Post.js
export const DELETE_POST_START = "DELETE_POST_START";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const deletePost = id => dispatch => {
  dispatch({ type: DELETE_POST_START });
  return axiosWithAuth()
    .delete(`https://expat-backend.herokuapp.com/posts/${id}`)
    .then(res => {
      console.log("POST DELETED!");
      dispatch({ type: DELETE_POST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: DELETE_POST_FAILURE });
    });
};
