import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPostID } from "../actions";
import "../styles/posts.css";

class Post extends React.Component {
    componentDidMount() {
        this.props.getPostID( this.props.match.params.id );
    }
    
    render() {
        if ( this.props.match.params.id ) {
            return (
                <div className={ "post" }>
                    <button>Edit</button>
                    <button>Delete</button>
                    <h2>{ this.props.post.title }</h2>
                    <p>By: { this.props.post.user_name }</p>
                    <img src={ this.props.post.img_url }
                         alt="post illustration"/>
                    <p>{ this.props.post.story }</p>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>{ this.props.post.title }</h2>
                    <p>By: { this.props.post.user_name }</p>
                    <img src={ this.props.post.img_url }
                         alt="post illustration"/>
                    <p>{ this.props.post.story }</p>
                </div>
            );
        }
    }
}

const mapStateToProps = state => ( {
    post:        state.post,
    gettingPost: state.gettingPost
} );

export default withRouter(
    connect(
        mapStateToProps,
        { getPostID }
    )( Post )
);
