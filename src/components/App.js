// Dependencies
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/index";

// Components
import Register from "./Register";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/register" component={Register} />
      </div>
    );
  }
}

export default connect(
  null,
  { registerUser }
)(App);
