import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost } from "../actions/index";
class UpdateForm extends Component {
  state = {
    title: this.props.activePost.title
    // description,
    // story,
    // img_url,
    // city,
    // state,
    // country
  };

  changeHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  editNewPost = e => {
    e.preventDefault();
    this.props.newPost(this.state);
    this.setState({
      title: "",
      description: "",
      story: "",
      img_url: ""
    });
  };

  render() {
    const {
      title,
      description,
      story,
      img_url,
      city,
      state,
      country
    } = this.state;
    return (
      <div>
        <h1> Edit Post </h1>
        <form onSubmit={this.addNewPost}>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Description"
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="img_url"
            value={img_url}
            placeholder="Image"
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="city"
            value={city}
            placeholder="City"
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="state"
            value={state}
            placeholder="State"
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="country"
            value={country}
            placeholder="Country"
            onChange={this.changeHandler}
          />
          <textarea
            type="text"
            name="story"
            value={story}
            placeholder="Story"
            onChange={this.changeHandler}
          />
          <button> Add Post </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    activePost: state.activePost
  };
};

export default connect(
  mapStateToProps,
  {}
)(UpdateForm);
