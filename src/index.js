// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// Middleware
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// Reducers
import rootReducer from "./reducers/rootReducer";

// Components
import App from "./components/App";

// Styles
import "./css/index.css";

const store = createStore( rootReducer, applyMiddleware( thunk, logger ) );

ReactDOM.render( <Router>
    <Provider store={ store }>
        <App/>
    </Provider>
</Router>, document.getElementById( "root" ) );
