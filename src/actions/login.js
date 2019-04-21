import axios from "axios";
import { setUserInfoIntoLocalStorage } from "../utils/encryptDecrypt";
import { SET_USER_AND_TOKEN } from "./users";

// login action suite LoginPage.js
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const login = credentials => dispatch => {
    
    dispatch( { type: LOGIN_START } );
    return axios.post( "https://expat-backend.herokuapp.com/users/login",
        credentials
    ).then( res => {
        debugger;
        const user = {
            id: res.data.id, user_name: res.data.user_name,
        };
        setUserInfoIntoLocalStorage( { user: user, token: res.data.token } );
        dispatch( {
            type: LOGIN_SUCCESS,
        } );
        dispatch( {
            type: SET_USER_AND_TOKEN,
            payload: { user: user, token: res.data.token }
        } );
    } ).catch( err => {
        
        console.log( "CAN'T LOG IN" );
        dispatch( { type: LOGIN_FAIL, payload: err.response.data.message } );
    } );
};
