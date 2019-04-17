import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPostID, getComments } from "../actions";

class Post extends React.Component {
  componentDidMount() {
    this.props.getPostID(this.props.match.params.id);
    console.log("Active User:", this.props.activeUser);
    
    this.props.getComments(this.props.match.params.id);
  }


  render() {
    if (this.props.match.params.id) {
      return (
        <div>
          <button>Edit</button>
          <button>Delete</button>
          <h2>{this.props.post.title}</h2>
          <p>By: {this.props.post.user_name}</p>
          <img src={this.props.post.img_url} alt="post illustration" />
          <p>{this.props.post.story}</p>
        
            <div>
              {this.props.comments.map(comment => (
                  <div key={comment.id}>
                    <p>{comment.comment}</p>
                  </div>
              ))};
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
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    { getPostID, getComments }
  )(Post)
);
