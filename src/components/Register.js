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
    if (this.state.user_name) {
    } else {
      this.props.registerUser(this.state.user_name, this.state.password);
    }
    this.setState({
      user_name: "",
      password: ""
    });
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
