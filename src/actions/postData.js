import axiosWithAuth from "../utils/axiosWithAuth";

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
