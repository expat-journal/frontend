import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts } from "../actions";

// Components
import SearchBar from "./SearchBar";

class Posts extends React.Component {
  state = {
    filteredPost: [], // for search bar
    posts: [],
    searching: false,
  }

  componentDidMount() {
    // invoke getPosts action here
    this.props.getPosts();
    // this.setState({filteredPost: this.props.posts })
  

  }

  // For Search Input
  filterPostHandler = e => {
    const newPostsData = this.props.posts.filter(post => {
      if (post.title.includes(e.target.value)) {
          return post;
        }
    });
    this.setState({ posts: newPostsData, searching: true });
    console.log("newPost", newPostsData);
    // if (e.target.value === "" ) {
    //   this.setState({ searching: false, filteredPost: this.props.posts 
    //   });
    //   console.log("Filtered Posts",
    //   this.state.filteredPost);
    // } else {
    //   this.setState({ filteredPost: newPostsData, searching: true });
    //   console.log("Filtered Posts", this.state.filteredPost);
    // }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts !== this.props.posts) {
      this.setState({ filteredPost: this.props.posts })
    }
  }
    

  render() {
    console.log("another anything");
    const posts = this.state.posts.length > 0 ? this.state.posts : this.state.filteredPost
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
        <input
          onChange={this.filterPostHandler}
          placeholder="Search..."
        />
        <h1>Stories of our Travelers</h1>
        <Link to="/post-form">Submit Your Story</Link>
        
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <h3>By: {post.user_name}</h3>
            <img src={post.img_url} alt="To Be Uploaded" />
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

const mapStateToProps = state => {
  console.log(state);
  return {
    posts: state.posts,
    gettingPosts: state.gettingPosts
  }
  
};

export default withRouter(
  connect(
    mapStateToProps,
    { getPosts }
  )(Posts)
);
