import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updatePost } from "../actions/index";
class UpdateForm extends Component {
  state = {
    id: this.props.activePost.id,
    title: this.props.activePost.title,
    description: this.props.activePost.description,
    story: this.props.activePost.story,
    img_url: this.props.activePost.img_url,
    city: this.props.activePost.city,
    state: this.props.activePost.state,
    country: this.props.activePost.country
  };

  changeHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  updatePost = e => {
    e.preventDefault();
    this.props.updatePost(this.state);
    alert("Edit Confirmed!");
    setInterval(() => window.location.reload(), 50);

    this.props.history.push("/posts");
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
        <h1> Edit Post </h1>
        <form className="form" onSubmit={this.updatePost}>
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
          <div className="btn-container">
            <button className="btn"> Update Post </button>
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
    posts: state.posts,
    activePost: state.activePost
  };
};

export default connect(
  mapStateToProps,
  { updatePost }
)(UpdateForm);
