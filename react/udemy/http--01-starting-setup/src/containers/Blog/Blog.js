import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axiosInstance from '../../axios'; // overrides defaults

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    };

    componentDidMount() { // best place to cause side-effects
        axios.get('/posts')
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
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    };

    render () {
        const posts = this.state.posts.map(post => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} />
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedpostid={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;