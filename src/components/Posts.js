import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts } from "../actions";

class Posts extends React.Component {
  componentDidMount() {
    // invoke getPosts action here
    this.props.getPosts();
  }

  render() {
    // conditional render - if gettingPosts is true
    if (this.props.gettingPosts) {
      return (
        <div className="container loading-container">
          <h1>One moment please. We are loading the data...</h1>
        </div>
      );
    }
    return (
      <div className="container story-list-container">
        <h1>Stories of our Travelers</h1>
        <Link to="/post-form">Submit Your Story</Link>
        {this.props.posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <h3>By: {post.user_name}</h3>
            <img src={post.img_url} alt="To Be Uploaded"/>
            <p>{post.description}</p>
            <Link to={`/posts/${post.id}`}>View Full Story</Link>
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
  gettingPosts: state.gettingPosts
});

export default withRouter(
  connect(
    mapStateToProps,
    { getPosts }
  )(Posts)
);
