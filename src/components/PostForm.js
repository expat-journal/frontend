import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { newPost } from "../actions";
class PostForm extends Component {
  state = {
    title: "",
    description: "",
    story: "",
    img_url: "test.com",
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
    setInterval(() => window.location.reload(), 500);
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
        <form className="form" onSubmit={this.addNewPost}>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={this.changeHandler}
            required
          />
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Description"
            onChange={this.changeHandler}
            required
          />
          <input
            type="text"
            name="img_url"
            value={img_url}
            placeholder="Image URL"
            onChange={this.changeHandler}
            className="popup-parent"
          />
          <span className="popup">
            No IMAGE URL? Keep default text or add your own
          </span>
          <input
            type="text"
            name="city"
            value={city}
            placeholder="City"
            onChange={this.changeHandler}
            required
          />
          <input
            type="text"
            name="state"
            value={state}
            placeholder="State"
            onChange={this.changeHandler}
            required
          />
          <input
            type="text"
            name="country"
            value={country}
            placeholder="Country"
            onChange={this.changeHandler}
            required
          />
          <textarea
            type="text"
            name="story"
            value={story}
            placeholder="Story"
            onChange={this.changeHandler}
            required
          />
          <div className="btn-container">
            <button className="btn"> Add Post </button>
            <Link to="/posts">
              <button className="btn">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer.posts
  };
};

export default connect(
  mapStateToProps,
  { newPost }
)(PostForm);
