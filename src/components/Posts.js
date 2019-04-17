import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts } from "../actions";
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
  filteredPostHandler = e => {
    const newPostsData = this.props.posts.filter(post => {
      if (
        post.city.includes(e.target.value) ||
        post.state.includes(e.target.value) ||
        post.country.includes(e.target.value)
      ) {
        return post;
      }
    });
    this.setState({ filteredPost: newPostsData, searching: true });
    console.log("Filtered Posts", newPostsData);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts !== this.props.posts) {
      this.setState({ posts: this.props.posts });
    }
  }

  showPost = id => {
    this.props.history.push(`/posts/${id}`);
  };

  showUser = id => {
    this.props.history.push(`/user/${id}`);
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

    let userId = Number(localStorage.getItem("user_id"));
    console.log("User", userId);

    return (
      <div className="container story-list-container">
        <input
          onChange={this.filteredPostHandler}
          placeholder="Search by city, state, or country..."
        />
        <h1>Stories of our Travelers</h1>
        <Link to="/post-form">Submit Your Story</Link>
        <button onClick={() => this.showUser(userId)}>
          Go to your Profile
        </button>
        {mappedPosts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <h3>By: {post.user_name}</h3>
            <img src={post.img_url} alt="To Be Uploaded" />
            <span>
              {post.description}{" "}
              <strong>
                {post.city}, {post.state}, {post.country}
              </strong>
            </span>
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
    { getPosts }
  )(Posts)
);
