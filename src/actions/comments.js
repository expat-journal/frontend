import axiosWithAuth from "../utils/axiosWithAuth";

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

// newComment action suite for Posts.js
export const NEW_COMMENT_START = "NEW_COMMENT_START";
export const NEW_COMMENT_SUCCESS = "NEW_COMMENT_SUCCESS";
export const NEW_COMMENT_FAILURE = "NEW_COMMENT_FAILURE";

export const newComment = comment => dispatch => {
    dispatch({ type: NEW_COMMENT_START });
    console.log("Starting adding new comment");
    return axiosWithAuth()
    .post("https://expat-backend.herokuapp.com/comments", comment)
    .then(res => {
        console.log("Post Comment Accepted:", res.data);
        dispatch({ type: NEW_COMMENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
        dispatch({ type: NEW_COMMENT_FAILURE, payload: err.response });
    });
};