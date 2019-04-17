import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPostID, getComments } from "../actions";

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

  render() {
    if (this.props.match.params.id) {
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
            <i className="far fa-comment" /> {this.props.comments.length} comments
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
          <h2>{this.props.post.title}</h2>
          <p>By: {this.props.post.user_name}</p>
          <img src={this.props.post.img_url} alt="post illustration" />
          <p>{this.props.post.story}</p>
        </div>
      );
    }
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
    { getPostID, getComments }
  )(Post)
);
