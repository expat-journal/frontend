import axios from "axios";
import { setUserInfoIntoLocalStorage } from "../utils/encryptDecrypt";
import { setUser, setJwtToken } from "./users";

// registerUser action creator Register.js
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerUser = credentials => dispatch => {
    dispatch( { type: REGISTER_START } );
    
    return axios.post( "https://expat-backend.herokuapp.com/users/register",
        credentials
    ).then( res => {
        
        setUserInfoIntoLocalStorage( {
            user: res.data.user, token: res.data.token
        } );
        dispatch( {
            type: REGISTER_SUCCESS,
            payload: res.data,
            user: res.data.user.user_name
        } );
        dispatch( setUser( res.data.user ) );
        dispatch( setJwtToken( res.data.token ) );
    } ).catch( err => {
        
        dispatch( {
            type: REGISTER_FAILURE, payload: err.response.data.message
        } );
    } );
};
