import axios from "axios";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerUser = credentials => dispatch => {
  dispatch({ type: REGISTER_START });
  axios
    .post("https://expat-backend.herokuapp.com/users/register", credentials)
    .then(res => {
      console.log("data", res);
      localStorage.setItem("token", res.data.payload);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.payload });
    })
    .catch(err =>
      dispatch({
        type: REGISTER_FAILURE,
        payload: err
      })
    );
};
