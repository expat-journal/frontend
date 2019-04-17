import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser, getUserPost } from "../actions";
class Users extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }
  render() {
    console.log(this.props);
    return <div>My profile </div>;
  }
}

const mapStateToProps = state => ({
  activeUser: state.activeUser,
  gettingPost: state.gettingPost
});

export default withRouter(
  connect(
    mapStateToProps,
    { getUser, getUserPost }
  )(Users)
);
