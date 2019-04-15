import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
// Components
import LoginPage from "./LoginPage";
import Posts from "./Posts";
import Post from "./Post";
import PostForm from "./PostForm";
import UpdateForm from "./UpdateForm";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute"; // redirecting to login for now

//import "./App.css";
import "../styles/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/post-form">Post Your Story</Link>
        </nav>
        <h2>Welcome to App - Delete this</h2>
        <Route path="/login" component={LoginPage} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path="/posts" component={Posts} />
        <PrivateRoute path="/posts/:id" component={Post} />
        <PrivateRoute path="/post-form" component={PostForm} />
        <PrivateRoute path="/update-form" component={UpdateForm} />
      </div>
    );
  }
}

export default App;
