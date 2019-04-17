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

// Styles
import "../styles/App.css";

class App extends Component {
    render() {
        return (
            <>
                <div className={ "background" }/>
                <div className="App">
                    
                    <nav>
                        <div className={ "nav-button" }><Link
                            to="/register">Register</Link></div>
                        <div className={ "nav-button" }><Link
                            to="/login">Login</Link></div>
                        <div className={ "nav-button" }><Link
                            to="/posts">Posts</Link></div>
                        <div className={ "nav-button" }><Link to="/post-form">Post
                            Your Story</Link></div>
                    </nav>
                    {/* <h2>Please Register or Login to Your Account to View Posts</h2> */ }
                    <Route path="/login" component={ LoginPage }/>
                    <Route exact path="/register" component={ Register }/>
                    <PrivateRoute exact path="/posts" component={ Posts }/>
                    <PrivateRoute path="/posts/:id" component={ Post }/>
                    <PrivateRoute path="/post-form" component={ PostForm }/>
                    <PrivateRoute path="/update-form" component={ UpdateForm }/>
                </div>
            </>
        );
    }
}

export default App;
