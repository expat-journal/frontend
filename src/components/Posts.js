import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts, getPostID } from "../actions";
class Posts extends React.Component {
  componentDidMount() {
    // invoke getPosts action here
    this.props.getPosts();
  }

  showPost = id => {
    this.props.history.push(`/posts/${id}`);
  };

  showUser = id => {
    this.props.history.push(`/user/${id}`);
  };
  render() {
    // conditional render - if gettingPosts is true
    if (this.props.gettingPosts) {
      return (
        <div className="container loading-container">
          <h1>One moment please. We are loading the data...</h1>
        </div>
      );
    }
    let userId = Number(localStorage.getItem("user_id"));
    console.log("User", userId);

    return (
      <div className="container story-list-container">
        <h1>Stories of our Travelers</h1>
        <Link to="/post-form">Submit Your Story</Link>
        <button onClick={() => this.showUser(userId)}>
          Go to your Profile
        </button>
        {this.props.posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <h3>By: {post.user_name}</h3>
            <img src={post.img_url} alt="To Be Uploaded" />
            <p>{post.description}</p>
            <button onClick={() => this.showPost(post.id)}>
              View Full Story
            </button>
          </div>
        ))}
        <Link to="/post-form">Submit Your Story</Link>
      </div>
    );
  }
}

/*
available post object properties:
created_at:
description:
id: 1
img_url: 
likes: 0
story:
title: 
updated_at:
user_id: 93
user_name: 
user_profile_img: null
*/

const mapStateToProps = state => ({
  posts: state.posts,
  gettingPosts: state.gettingPosts,
  activeUser: state.activeUser
});

export default withRouter(
  connect(
    mapStateToProps,
    { getPosts, getPostID }
  )(Posts)
);
