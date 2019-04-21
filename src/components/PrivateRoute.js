import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ( { component: Component, token, ...rest } ) => {
    debugger;
    if( token ){
        return ( <Route
            { ...rest }
            component={ Component }
        /> );
    }else{
        if( rest.location.pathname !== "/login" && rest.location.pathname !==
            "/register" ){
            return <Redirect to={ "/login" }/>;
        }else{
            return <></>;
        }
    }
    
};

const mapStateToProps = state => ( {
    token: state.usersReducer.token,
} );

export default withRouter( connect( mapStateToProps )( PrivateRoute ) );
