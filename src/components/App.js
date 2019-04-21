import React, { Component } from "react";
import { Route, Link, NavLink, withRouter } from "react-router-dom";
import {
    checkLocalStorageForInfo, removeUserAndTokenFromLocalStorage
} from "../utils/encryptDecrypt";
import { connect } from "react-redux";
// Components
import LoginPage from "./LoginPage";
import Posts from "./Posts";
import Post from "./Post";
import PostForm from "./PostForm";
import UpdateForm from "./UpdateForm";
import Register from "./Register";
import Users from "./Users";
import { setJwtToken, setUser } from "../actions";
import PrivateRoute from "./PrivateRoute"; // redirecting to login for now

// Styles
import "../css/index.css";

//import "../styles/App.css";

class App extends Component{
    
    state = {
        location: "",
    };
    
    componentDidMount(){
        debugger;
        const info = checkLocalStorageForInfo();
        if( info.user ){
            this.props.setUser( info.user );
        }
        if( info.jwt ){
            this.props.setJwtToken( info.jwt );
            this.props.history.push( "/posts" );
        }
    }
    
    // Clears localstorage and logs out user
    logOutHandler = () => {
        removeUserAndTokenFromLocalStorage();
        alert( "Thanks for visiting! Come back soon!" );
        setInterval( () => window.location.reload(), 900 );
    };
    
    render(){
        debugger;
        return ( <div className="App">
            { this.props.loggedIn ? ( <nav>
                <p className="current-user">Welcome Expat</p>
                <NavLink to="/posts" activeClassName="active-nav">
                    Posts
                </NavLink>
                <NavLink to="/post-form" activeClassName="active-nav">
                    Post Your Story
                </NavLink>
                <NavLink
                    to="/login"
                    activeClassName="active-nav"
                    onClick={ this.logOutHandler }
                >
                    Log Out
                </NavLink>
            </nav> ) : ( <div>
                <nav className="home-nav">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </nav>
                <div className="container home-container">
                    <h1>Welcome to Expat Journal!</h1>
                    <h2>
                        If you're a new user, please register.
                        <br/> If you've already registered, please
                        login to view posts.
                    </h2>
                    <div className="home-btn">
                        <Link to="/register" className="home-btn">
                            <button
                                className="btn register-btn">Register
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="btn login-btn">Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div> ) }
            <Route path="/login" component={ LoginPage }
                   pathname={ this.props.location.pathname }/>
            <Route path="/register" component={ Register }
                   pathname={ this.props.location.pathname }/>
            <PrivateRoute token={ this.props.token } exact path="/posts"
                          component={ Posts }/>
            <PrivateRoute token={ this.props.token } path="/posts/:id"
                          component={ Post }/>
            <PrivateRoute token={ this.props.token } path="/post-form"
                          component={ PostForm }/>
            <PrivateRoute token={ this.props.token } exact
                          path="/user/:id" component={ Users }/>
            <PrivateRoute token={ this.props.token } path="/update-form"
                          component={ UpdateForm }/>
        </div> );
    }
}

const mapStateToProps = state => ( {
    user: state.usersReducer.user,
    loggedIn: state.usersReducer.loggedIn,
    token: state.usersReducer.jwtToken
} );

export default withRouter( connect( mapStateToProps,
    { setUser, setJwtToken, }
)(
    App ) );
