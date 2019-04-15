import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";

// for login action creator LoginPage.js
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";


// action creator for logging in with POST request
export const login = credentials => dispatch => {
    dispatch({ type: LOGIN_START });
    return axios
        .post("https://expat-backend.herokuapp.com/users/login", credentials)
        .then(res => {
            console.log("POST Req Approved!", res.data);
            // DOUBLE CHECK PAYLOAD
            localStorage.setItem("token", res.data.payload);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.payload });
        })
        .catch(err => {
            console.log("CAN'T LOG IN");
            dispatch({ type: LOGIN_FAIL, payload: err });
        });
};
