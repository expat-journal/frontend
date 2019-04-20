import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    getPostID,
    setActivePost,
    deletePost,
} from "../actions/postsData";
import { newComment, getComments } from "../actions/comments";

const Cryptr = require( "cryptr" );
const cryptr = new Cryptr( "myTotalySecretKey" );

class Post extends React.Component {
    state = {
        likesCounter: 0,
        newComment:   {
            comment: "",
            post_id: ""
        }
    };
    
    componentDidMount() {
        this.props.getPostID( this.props.match.params.id );
        this.props.getComments( this.props.match.params.id );
    }
    
    // increase likes event handler
    increaseLikes = event => {
        this.setState( prevState => {
            return {
                likesCounter: prevState.likesCounter + 1
            };
        } );
    };
    
    // event handler for adding comment
    handleChanges = e => {
        this.setState( {
            newComment: {
                ...this.state.newComment,
                [ e.target.name ]: e.target.value,
                post_id:           this.props.post.id
            }
        } );
    };
    
    // onSubmit event handler for adding comment - invoke newComment function
    submitComment = e => {
        e.preventDefault();
        this.props.newComment( this.state.newComment );
        this.setState( {
            newComment: {
                comment: "",
                post_id: ""
            }
        } );
        setInterval( () => window.location.reload(), 250 );
    };
    // setting Active Post for update
    setPostActive = post => {
        this.props.setActivePost( post );
        this.props.history.push( "/update-form" );
    };
    
    // deleting post
    deletePost = id => {
        if ( window.confirm( "Are you sure you want to delete this post" ) ) {
            this.props.deletePost( this.props.post.id ).
                then( setInterval( () => window.location.reload(), 250 ) );
        }
        this.props.history.push( "/posts" );
    };
    
    render() {
        const postId = this.props.post.user_id;
        const length = localStorage.length;
        let userId = null;
        for ( let i = 0; i < length; i++ ) {
            const key = localStorage.key( i );
            try {
                const decryptKey = cryptr.decrypt( key );
                if ( decryptKey === "user_id" ) {
                    const encryptedUserId = localStorage.getItem( key );
                    userId = Number( cryptr.decrypt( encryptedUserId ) );
                }
            } catch {
            }
        }
        
        const { story, img_url, title, user_name } = this.props.post;
        
        return (
            <div className="single-post-container">
                { userId === postId && (
                    <button
                        className="btn btn-edit"
                        onClick={ e => this.setPostActive( this.props.post ) }
                    >
                        Edit
                    </button>
                ) }
                { userId === postId && (
                    <button onClick={ this.deletePost }
                            className="btn btn-delete">
                        Delete
                    </button>
                ) }
                
                <h2 className="single-post-title">{ title }</h2>
                
                <p className="single-post-user">By: { user_name }</p>
                { { img_url: "test.com" } ? (
                    <img
                        src="https://picsum.photos/1000/1000/?random"
                        alt="post illustration"
                    />
                ) : (
                      <img src={ img_url } alt="post illustration"/>
                  ) }
                <div className="single-post-text-container">
          <span className="single-post-span post-likes">
            <i className="far fa-heart" onClick={ this.increaseLikes }/>
            <span>{ this.state.likesCounter } likes</span>
          </span>
                    
                    <p className="single-post-story">{ story }</p>
                    <span className="single-post-span post-comments">
            <i className="far fa-comment"/>{ " " }
                        <span>{ this.props.comments.length } comments</span>
          </span>
                    
                    <div>
                        { this.props.comments.map( comment => (
                            <div className="comment-section" key={ comment.id }>
                                <p>
                                    <strong>{ comment.user_name }: </strong>
                                    { comment.comment }
                                </p>
                            </div>
                        ) ) }
                        <form onSubmit={ this.submitComment }>
                            <input
                                type="text"
                                name="comment"
                                value={ this.state.newComment.comment }
                                onChange={ this.handleChanges }
                                placeholder="Write your comment"
                            />
                            <button className="btn">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log( "Post:", state.post );
    return {
        post:        state.postsReducer.post,
        comments:    state.commentsReducer.comments,
        gettingPost: state.postsReducer.gettingPost,
        activeUser:  state.usersReducer.activeUser,
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        { getPostID, getComments, setActivePost, deletePost, newComment }
    )( Post )
);
