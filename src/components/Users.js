import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser, getUserPost, updateUser } from "../actions";
class Users extends Component {
  state = {
    credentials: {
      user_name: "",
      password: ""
    },
    open: false
  };
  componentDidMount() {
    this.props.getUserPost(this.props.match.params.id);
    this.props.getUser(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userProfile !== this.props.userProfile) {
      this.setState({ credentials: this.props.userProfile });
    }
  }

  toggleEdit = () => {
    this.setState({
      open: !this.state.open
    });
  };
  changeHandler = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  editUser = e => {
    e.preventDefault();
    let user = {};
    user.id = this.props.userProfile.id;
    user.user_name =
      this.state.user_name !== ""
        ? this.state.credentials.user_name
        : undefined;
    user.password =
      this.state.password !== "" ? this.state.credentials.password : undefined;
    console.log(user);
    this.props.updateUser(user);
    this.setState({
      ...this.state,
      credentials: {
        user_name: "",
        password: ""
      },
      open: false
    });
  };

  goToPost = id => {
    this.props.history.push(`/posts/${id}`);
  };
  render() {
    console.log(this.props.userProfile.id);
    return (
      <div className="user-profile">
        <p>{this.props.userProfile.user_name}</p>
        <button onClick={this.toggleEdit}>Edit Profile</button>
        {this.state.open ? (
          <form onSubmit={this.editUser}>
            <input
              type="text"
              value={this.state.credentials.user_name}
              name="user_name"
              placeholder="Change User_Name"
              onChange={this.changeHandler}
            />
            <input
              type="password"
              value={this.state.credentials.password}
              name="password"
              placeholder="Change Password"
              onChange={this.changeHandler}
            />
            <button>Submit</button>
          </form>
        ) : null}
        <div className="user-profile-posts">
          {this.props.userPost.map(user => (
            <div key={user.id}>
              <button onClick={() => this.goToPost(user.id)}>
                Edit/Delete Post?
              </button>
              <h2>{user.title}</h2>
              <img src={user.img_url} alt="my post illustration" />
              <p>
                Location: {user.city}, {user.state}, {user.country}
              </p>
              <p>Likes: {user.likes}</p>
              <p>{user.story}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("Users Posts:", state.userPost);
  return {
    userProfile: state.userProfile,
    userPost: state.userPost
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getUser, getUserPost, updateUser }
  )(Users)
);
