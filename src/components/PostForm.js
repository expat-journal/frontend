import React, { Component } from "react";
import { connect } from "react-redux";
import { newPost } from "../actions/index";
class PostForm extends Component {
  state = {
    title: "",
    description: "",
    story: "",
    img_url: "",
    city: "",
    state: "",
    country: ""
  };

  changeHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  addNewPost = e => {
    e.preventDefault();
    this.props.newPost(this.state);
    alert("Successfully added Post. Let's check it out!");
    this.props.history.push("/posts");
    setInterval(() => window.location.reload(), 800);
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
      <div className="container form-container">
        <h1> Add New Post </h1>
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
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  { newPost }
)(PostForm);
