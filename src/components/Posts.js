// Class component for CDM

import React from "react";
//import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import { getPosts } from "../actions";

class Posts extends React.Component {
//   componentDidMount() {
//     // invoke getPosts action here
//     this.props.getPosts();
//   }

  render() {
    return (
      <div className="container story-list-container">
        <h1>Stories of our Travelers</h1>
        {/* {this.props.getPosts.map((post, index) => (
          <div key={index}>
            <h2>{post.title}</h2>
            <Link to={`/posts/${post.id}`}>View Full Story</Link>
          </div>
        ))}
        <Link to="/post-form">Submit Your Story</Link> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default withRouter(
  connect(
    mapStateToProps,
    { /*getPosts*/ }
  )(Posts)
);
