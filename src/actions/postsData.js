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

// getComments action for Posts.js
export const GET_COMMENTS_START = "GET_COMMENTS_START";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_FAILURE = "GET_COMMENTS_FAILURE";

export const getComments = id => dispatch => {
  dispatch({ type: GET_COMMENTS_START });
  return axiosWithAuth()
    .get(`https://expat-backend.herokuapp.com/comments/post_id/${id}`)
    .then(res => {
      console.log("From getComments:", res.data);
      dispatch({ type: GET_COMMENTS_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: GET_COMMENTS_FAILURE,
        payload: err
      })
    );
};
