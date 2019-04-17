import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPostID } from "../actions";
import Comment from "./Comment";
class Post extends React.Component {
  state = {
    likes: this.props
  };

  //Match post with post ID
  componentDidMount() {
    this.props.getPostID(this.props.match.params.id);
  }

  likeChanger = () => {
    let likes = this.state.likes + 1;
    this.setState({
      likes
    });
  };

  render() {
    const postId = this.props.post.user_id;
    const userId = Number(localStorage.getItem("user_id"));
    const { story, img_url, title, user_name, likes } = this.props.post;

    if (userId === postId) {
      return (
        <div>
          <button>Edit</button>
          <button>Delete</button>
          <h2>{title}</h2>
          <p>By: {user_name}</p>
          <img src={img_url} alt="post illustration" />
          <p>{story}</p>
          <p onClick={this.likeChanger}>Likes: {likes}</p>
          <Comment {...this.props} />
        </div>
      );
    } else {
      return (
        <div>
          <h2>{title}</h2>
          <p>By: {user_name}</p>
          <img src={img_url} alt="post illustration" />
          <p>{story}</p>
          <p>Likes: {likes}</p>
          <Comment />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  post: state.post,
  gettingPost: state.gettingPost,
  activeUser: state.activeUser
});

export default withRouter(
  connect(
    mapStateToProps,
    { getPostID }
  )(Post)
);
