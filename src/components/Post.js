import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPosts } from "../actions";

class Post extends React.Component {
  componentDidMount() {
    // invoke getPosts action here
    this.props.getPosts();
  }

  render() {
    console.log(this.props);
    const singlePost = this.props.posts.find(post => {
      return `${post.id}` === this.props.match.params.id;
    });
    if (!singlePost) {
      return <p> Testing</p>;
    }
    return <div>{singlePost.id}</div>;
  }
}
const mapStateToProps = state => ({
  posts: state.posts,
  gettingPosts: state.gettingPosts
});

export default withRouter(
  connect(
    mapStateToProps,
    { getPosts }
  )(Post)
);
