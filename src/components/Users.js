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
    this.props.updateUser(user);
    this.setState({
      ...this.state,
      credentials: {
        user_name: "",
        password: ""
      },
      open: false
    });
    alert(
      "You have successfully updated your account! Your page will now refresh."
    );
    setInterval(() => window.location.reload(), 1000);
  };

  goToPost = id => {
    this.props.history.push(`/posts/${id}`);
  };
  render() {
    return (
      <div className="user-profile">
        <div className="user-edit">
          <p className="user-name">
            {this.props.userProfile.user_name}'s Profile
          </p>
          <button className="btn btn-user" onClick={this.toggleEdit}>
            Edit Profile
          </button>
          {this.state.open ? (
            <form onSubmit={this.editUser}>
              <input
                className="edit-profile"
                type="text"
                value={this.state.credentials.user_name}
                name="user_name"
                placeholder="Change User_Name"
                onChange={this.changeHandler}
              />
              <input
                className="edit-profile"
                type="password"
                value={this.state.credentials.password}
                name="password"
                placeholder="Change Password"
                onChange={this.changeHandler}
              />
              <button className="btn">Submit</button>
            </form>
          ) : null}
        </div>
        {this.props.userPost.length === 0 ? (
          <p className="no-post"> No post yet! Be sure to post your stories!</p>
        ) : (
          <div className="user-profile-posts">
            <h3 className="user-profile-current">My Current Posts: </h3>
            {this.props.userPost.map(user => (
              <div key={user.id}>
                <button
                  className="btn btn-edit-post"
                  onClick={() => this.goToPost(user.id)}
                >
                  Edit/Delete Post
                </button>
                <h2 className="user-profile-title">{user.title}</h2>
                {user.img_url === "test.com" ? (
                  <img
                    src="https://picsum.photos/1000/1000/?random"
                    alt="post illustration"
                    className="user-profile-img"
                  />
                ) : (
                  <img
                    className="user-profile-img"
                    src={user.img_url}
                    alt="my post illustration"
                  />
                )}
                <p className="user-profile-location">
                  <strong>Location:</strong> {""}
                  {user.city}, {user.state}, {user.country}
                </p>
                <p className="user-profile-likes">
                  <i className="far fa-heart" /> {user.likes} likes
                </p>
                <p className="user-profile-story">{user.story}</p>
              </div>
            ))}
          </div>
        )}
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
