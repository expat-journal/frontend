import axios from "axios";
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

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
      const token = cryptr.encrypt("token");
      const user = cryptr.encrypt("user");
      const user_id = cryptr.encrypt("user_id")
      localStorage.setItem( token, res.data.token);
      localStorage.setItem(  user,  cryptr.encrypt(res.data.user_name));
      localStorage.setItem(  user_id,  cryptr.encrypt(res.data.id));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
        credentials: res.data.user_name,
        user_id: res.data.id
      });
    })
    .catch(err => {
      console.log("CAN'T LOG IN");
      dispatch({ type: LOGIN_FAIL, payload: err });
    });
};
