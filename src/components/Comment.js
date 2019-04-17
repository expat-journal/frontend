import React from "react";
import { connect } from "react-redux";
import { addComment } from "../actions";

class Comment extends React.Component {
  state = {
    newComment: {
      comment: "",
      post_id: this.props.post.id
    }
  };

  // Grab input field to state
  changeHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  addNewComment = e => {
    e.preventDefault();
    this.props.addComment(this.state.newComment.comment);

    this.setState({
      comment: "",
      post_id: this.props.post.id
    });
  };

  render() {
    // const { comments } = this.props.post.comments;
    // console.log(comment);
    return (
      <div>
        {/* {comments.map(comment =>
          comment.length < 0 ? (
            <p>Be the first to comment!</p>
          ) : (
            <p>{comment}</p>
          )
        )} */}
        <form onSubmit={this.addNewComment}>
          <textarea
            type="text"
            name="comment"
            value={this.state.newComment.comment}
            placeholder="Add Comment"
            onChange={this.changeHandler}
          />
          <button>Add Comment</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  gettingPost: state.gettingPost,
  activeUser: state.activeUser
});

export default connect(
  mapStateToProps,
  { addComment }
)(Comment);
