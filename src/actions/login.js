import axios from "axios";

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