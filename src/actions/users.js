import axiosWithAuth from "../utils/axiosWithAuth";

// getUser action suite for Users.js
export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";

export const getUser = id => dispatch => {
    dispatch( { type: GET_USER_START } );
    axiosWithAuth().
        get( `https://expat-backend.herokuapp.com/users/${ id }` ).
        then( res => {
            console.log( "GOT USER", res.data );
            // DOUBLE CHECK PAYLOAD
            dispatch( { type: GET_USER_SUCCESS, payload: res.data } );
        } ).
        catch( err => {
            dispatch( { type: GET_USER_FAILURE, payload: err.response } );
        } );
};

export const setUser = user => dispatch => {
    dispatch( { type: SET_USER, payload: user } );
};

export const setJwtToken = token => dispatch => {
    dispatch( { type: SET_TOKEN, payload: token } );
};

// getUser action suite for Users.js
export const GET_USER_POST_START = "GET_USER_POST_START";
export const GET_USER_POST_SUCCESS = "GET_USER_POST_SUCCESS";
export const GET_USER_POST_FAILURE = "GET_USER_POST_FAILURE";

export const getUserPost = id => dispatch => {
    dispatch( { type: GET_USER_POST_START } );
    axiosWithAuth().
        get( `https://expat-backend.herokuapp.com/users/posts/${ id }` ).
        then( res => {
            console.log( "GOT USER's Posts", res.data );
            // DOUBLE CHECK PAYLOAD
            dispatch( { type: GET_USER_POST_SUCCESS, payload: res.data } );
        } ).
        catch( err => {
            dispatch( { type: GET_USER_POST_FAILURE, payload: err.response } );
        } );
};

// updateUser action suite for Users.js
export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const updateUser = ( { id, user_name, password } ) => dispatch => {
    dispatch( { type: UPDATE_USER_START } );
    return axiosWithAuth().put( "https://expat-backend.herokuapp.com/users", {
        id, user_name, password
    } ).then( res => {
        console.log( "GOT USER To Edit!", res.data );
        // DOUBLE CHECK PAYLOAD
        dispatch( { type: UPDATE_USER_SUCCESS, payload: res.data } );
    } ).catch( err => {
        dispatch( { type: UPDATE_USER_FAILURE, payload: err.response } );
    } );
};
