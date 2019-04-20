import axios from "axios";
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

// registerUser action creator Register.js
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerUser = credentials => dispatch => {
  dispatch({ type: REGISTER_START });
  return axios
    .post("https://expat-backend.herokuapp.com/users/register", credentials)
    .then(res => {
      console.log("data", res.data.token);
      localStorage.setItem(cryptr.encrypt("token"), res.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
        user: res.data.user.user_name
      });
    })
    .catch(err =>
      dispatch({
        type: REGISTER_FAILURE,
        payload: err
      })
    );
};
