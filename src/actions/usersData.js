import axiosWithAuth from "../utils/axiosWithAuth";

// getUsers action suite for Register.js and Login.js
export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

export const getUsers = () => dispatch => {
  dispatch({ type: GET_USERS_START });
  axiosWithAuth()
    .get("https://expat-backend.herokuapp.com/users")
    .then(res => {
      console.log(res.data);
      dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS_FAILURE,
        payload: err
      })
    );
};
