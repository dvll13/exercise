import React, { Component } from 'react';
import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    state = {
        loadedPost: null,
        error: false
    };

    // good place to call after we receive a new prop.id
    componentDidUpdate() {
        if (this.props.selectedpostid) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.props.selectedpostid !== this.state.loadedPost.id)) {
                axios.get('/posts/' + this.props.selectedpostid)
                    .then(response => {
                        console.log('get', response);
                        this.setState({loadedPost: response.data});
                    });

                // error test
                axios.get('/postsss' + this.props.selectedpostid)
                    .then(response => {
                        console.log('get', response);
                    })
                    .catch(error => {
                        this.setState({ error: true });
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.selectedpostid)
            .then(response => {
                console.log('deleted', response);
            });
    };

    render () {
        let post = <p style={{textAlign: 'center', color: 'red'}}>'Oooops, something went wrong!!!'</p>;

        if (!this.state.error) {
            post = <p style={{textAlign: 'center'}}>'Please select a Post!'</p>;

            if (this.props.selectedpostid) {
                post = <p style={{textAlign: 'center'}}>'Loading...'</p>;
            }

            if (this.state.loadedPost) {
                post = (
                    <div className="FullPost" onClick={this.props.clicked}>
                        <h1>{this.state.loadedPost.title}</h1>
                        <p>{this.state.loadedPost.body}</p>
                        <div className="Edit">
                            <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                        </div>
                    </div>

                );
            }
        }

        return post;
    }
}

export default FullPost;