import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPostID, getComments, newComment } from "../actions";

class Post extends React.Component {
  state = {
    likesCounter: 0,
    newComment: {
      comment: "",
      post_id: ""
    }
  };

  componentDidMount() {
    this.props.getPostID(this.props.match.params.id);
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

  // event handler for adding comment
  handleChanges = e => {
    this.setState({
      newComment: {
        ...this.state.newComment,
        [e.target.name]: e.target.value,
        post_id: this.props.post.id
      }
    });
  };

  // onSubmit event handler for adding comment - invoke newComment function
  submitComment = e => {
    e.preventDefault();
    this.props.newComment(this.state.newComment);
    this.setState({
      newComment: {
        comment: "",
        post_id: ""
      }
    });
  };

  render() {
    const postId = this.props.post.user_id;
    const userId = Number(localStorage.getItem("user_id"));
    const { story, img_url, title, user_name } = this.props.post;

    if (userId === postId) {
      return (
        <div>
          <button>Edit</button>
          <button>Delete</button>
          <h2>{this.props.post.title}</h2>
          <p>By: {this.props.post.user_name}</p>
          <img src={this.props.post.img_url} alt="post illustration" />
          <span>
            <i className="far fa-heart" onClick={this.increaseLikes} />
            {this.state.likesCounter} likes
          </span>

          <span>
            <i className="far fa-comment" /> {this.props.comments.length}{" "}
            comments
          </span>

          <p>"{this.props.post.story}"</p>

          <div className="comment-section">
            {this.props.comments.map(comment => (
              <div key={comment.id}>
                <p>
                  <strong>{comment.user_name} </strong>
                  {comment.comment}
                </p>
              </div>
            ))}
            ;
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>{title}</h2>
          <p>By: {user_name}</p>
          <img src={img_url} alt="post illustration" />
          <span>
            <i className="far fa-heart" onClick={this.increaseLikes} />
            {this.state.likesCounter} likes
          </span>

          <span>
            <i className="far fa-comment" /> {this.props.comments.length}{" "}
            comments
          </span>

          <p>"{this.props.post.story}"</p>

          <div className="comment-section">
            {this.props.comments.map(comment => (
              <div key={comment.id}>
                <p>
                  <strong>{comment.user_name} </strong>
                  {comment.comment}
                </p>
              </div>
            ))}
            <form onSubmit={this.submitComment}>
              <input
                type="text"
                name="comment"
                value={this.state.newComment.comment}
                onChange={this.handleChanges}
                placeholder="Write your comment"
              />
              <button>Add</button>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log("Post:", state.post);
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
    { getPostID, getComments, newComment }
  )(Post)
);
