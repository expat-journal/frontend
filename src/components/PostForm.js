import React, { Component } from "react";

export default class PostForm extends Component {
  state = {
    title: "",
    description: "",
    story: "",
    img_url: ""
  };

  changeHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  addPost = e => {
    e.preventDefault();
    this.setState({
      user_name: "",
      password: ""
    });
  };

  render() {
    const { title, description, story, img_url } = this.state;
    return (
      <div>
        <h1> Add New Post </h1>
        <form>
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
            name="story"
            value={img_url}
            placeholder="Image"
            onChange={this.changeHandler}
          />
          <textarea
            type="text"
            name="img_url"
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
