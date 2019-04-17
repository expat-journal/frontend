import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getPostID, getComments, setActivePost } from "../actions";

class Post extends React.Component {
  state = {
    likesCounter: 0
  };

  componentDidMount() {
    this.props.getPostID(this.props.match.params.id);
    console.log("Active User:", this.props.activeUser);
    this.props.getComments(this.props.match.params.id);
  }

  // increase likes event handler
  increaseLikes = event => {
    this.setState(prevState => {
      return {
        likesCounter: prevState.likesCounter + 1
      };
    });
  };

  setPostActive = post => {
    this.props.setActivePost(post);
    this.props.history.push("/update-form");
  };

  render() {
    const postId = this.props.post.user_id;
    const userId = Number(localStorage.getItem("user_id"));
    const { story, img_url, title, user_name } = this.props.post;

    return (
      <div>
        {userId === postId && (
          <button onClick={e => this.setPostActive(this.props.post)}>
            Edit
          </button>
        )}
        {userId === postId && <button>Delete</button>}
        <h2>{title}</h2>
        <p>By: {user_name}</p>
        <img src={img_url} alt="post illustration" />
        <span>
          <i className="far fa-heart" onClick={this.increaseLikes} />
          {this.state.likesCounter} likes
        </span>

        <span>
          <i className="far fa-comment" /> {this.props.comments.length} comments
        </span>

        <p>"{story}"</p>

        <div className="comment-section">
          {this.props.comments.map(comment => (
            <div key={comment.id}>
              <p>
                <strong>{comment.user_name} </strong>
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("New! Comments on mSTP:", state.comments);
  return {
    post: state.post,
    comments: state.comments,
    gettingPost: state.gettingPost,
    activeUser: state.activeUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getPostID, getComments, setActivePost }
  )(Post)
);
