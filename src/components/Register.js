import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/index";

class Register extends Component {
  state = {
    user_name: "",
    password: ""
  };

  // Event handlers

  changeHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  registerUser = e => {
    e.preventDefault();
    this.props.registerUser(this.state);
  };

  render() {
    console.log(this.props);
    const { user_name, password } = this.state;
    return (
      <div>
        <div>
          <h1> Register</h1>
          <p> Please fill out the fields below: </p>
        </div>
        <form onSubmit={this.registerUser}>
          <input
            type="text"
            placeholder="Username"
            name="user_name"
            value={user_name}
            onChange={this.changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.changeHandler}
          />
          <button>Submit</button>

          {this.state.registeringUser ? (
            <p>You have successfully registered!</p>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registeringUser: state.registeringUser
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
