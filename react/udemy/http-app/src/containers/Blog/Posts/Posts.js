import React, {Component} from 'react';
import './Posts.css';
import axiosInstance from "../../../axios";
import Post from '../../../components/Post/Post';
import FullPost from "../FullPost/FullPost";
import {Route} from "react-router-dom";
// import {Link} from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() { // best place to cause side-effects
        console.log(this.props);
        axiosInstance.get('/posts')
            .then(response => {
                console.log(response);

                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Marin'
                    }
                });

                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log('ERROR [Posts]', error);
            });
    }

    postSelectedHandler = (id) => {
        // this.setState({ selectedPostId: id });
        // this.props.history.push({ pathname: '/posts' + id }); or:
        this.props.history.push('/posts/' + id);
    };

    render() {
        const posts = this.state.posts.map(post => {
            return (
                //<Link to={'/posts/' + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                //</Link>
            )
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:my_id'} exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts;