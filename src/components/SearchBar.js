import React from 'react';
import { connect } from "react-redux";

class SearchBar extends React.Component {
    state = {
        filteredPost: [],
        searching: false
    }
    render(){
        return (
            <div>
                <h2>SEARCH BAR HERE</h2>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts
  });
  
  export default connect(
    mapStateToProps,
    {}
  )(SearchBar);
  
