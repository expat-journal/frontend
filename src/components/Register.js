import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions";

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
    this.setState({
      user_name: "",
      password: ""
    });
  };

  render() {
    console.log(this.props);
    const { user_name, password } = this.state;
    return (
      <div className=" form-container home-form">
        <div>
          <h2> Register</h2>
          <p> Please fill out the fields below: </p>
        </div>
        <form className="form" onSubmit={this.registerUser}>
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
          <button className="btn submit-btn">Submit</button>

          {this.props.userRegistered && ( // register works prompt
            <p className="register-success">
              You have successfully registered! {this.props.registeredUser}{" "}
              Please <Link to="/login">log in</Link>
            </p>
          )}
          {this.props.error && ( // registering fails error
            <p className="register-error">
              Sorry, please try again or <Link to="/login">log in</Link> with
              your credentials.
            </p>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRegistered: state.usersReducer.userRegistered,
    registeredUser: state.usersReducer.registeredUser,
    error: state.usersReducer.error
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
