import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "../actions";

class LoginPage extends React.Component{
    state = {
        credentials: {
            user_name: "", password: ""
        }
    };
    
    // event handler for input field
    handleChanges = e => {
        this.setState( {
            credentials: {
                ...this.state.credentials, [ e.target.name ]: e.target.value
            }
        } );
    };
    
    // event handler for submit field - invoke login()
    submitForm = e => {
        
        e.preventDefault();
        this.props.login( this.state.credentials ).then( res => {
            
            if( this.props.loggedInSuccessfully ){
                this.props.history.push( "/posts" );
            }
        } );
    };
    
    render(){
        
        // conditional render - if logginIn is true
        if( this.props.loggingIn ){
            return ( <div className="container loading-container">
                <h1>Logging you in...</h1>
            </div> );
        }
        return ( <div className="form-container home-form">
            <h2>Login</h2>
            <p>Please login to view posts</p>
            <form className="form" onSubmit={ this.submitForm }>
                <input
                    type="text"
                    name="user_name"
                    value={ this.state.credentials.user_name }
                    onChange={ this.handleChanges }
                    placeholder="Username"
                />
                <input
                    type="password"
                    name="password"
                    value={ this.state.credentials.password }
                    onChange={ this.handleChanges }
                    placeholder="Password"
                />
                { this.props.error &&
                <p className={ "error" }>{ this.props.error }</p> }
                <button className="btn submit-btn">Login</button>
            </form>
        </div> );
    }
}

const mapStateToProps = state => ( {
    loggingIn: state.loginReducer.loggingIn,
    activeUser: state.usersReducer.activeUser,
    error: state.loginReducer.error,
    loggedInSuccessfully: state.loginReducer.loggedInSuccessfully
    
} );

export default  connect( mapStateToProps, { login } )( LoginPage );
