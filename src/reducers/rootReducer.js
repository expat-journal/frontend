import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import usersReducer from "./usersReducer";
import commentsReducer from "./commentsReducer";

export default combineReducers( {
    postsReducer,
    registerReducer,
    loginReducer,
    usersReducer,
    commentsReducer,
} );