import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts, getPostID } from "../actions";
class Posts extends React.Component {
  state = {
    filteredPost: [], // for search bar
    posts: [], // for search bar
    searching: false // not in use at the moment
  };

  componentDidMount() {
    // invoke getPosts action here
    this.props.getPosts();
  }

  // For Search Bar Input
  filterPostHandler = e => {
    const newPostsData = this.props.posts.filter(post => {
      if (post.title.includes(e.target.value)) {
        return post;
      }
    });
    this.setState({ filteredPost: newPostsData, searching: true });
    console.log("newPost", newPostsData);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts !== this.props.posts) {
      this.setState({ posts: this.props.posts });
    }
  }

  showPost = id => {
    this.props.history.push(`/posts/${id}`);
  };
  render() {
    const mappedPosts =
      this.state.filteredPost.length > 0
        ? this.state.filteredPost
        : this.state.posts;

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
        <input onChange={this.filterPostHandler} placeholder="Search..." />
        <h1>Stories of our Travelers</h1>
        <Link to="/post-form">Submit Your Story</Link>

        {mappedPosts.map(post => (
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

const mapStateToProps = state => {
  console.log(state);
  return {
    posts: state.posts,
    gettingPosts: state.gettingPosts
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getPosts, getPostID }
  )(Posts)
);
