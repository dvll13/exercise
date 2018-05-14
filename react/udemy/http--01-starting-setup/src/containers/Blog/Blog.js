import React, { Component } from 'react';
import './Blog.css';
import {Route} from 'react-router-dom';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {
    render () {
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            <li><a href='/'>Home</a></li>
                            <li><a href='/new-post'>New Post</a></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path='/' render={() => <h1>Home</h1>}/>*/}
                {/*<Route path='/' exact render={() => <h2>Home 2</h2>}/>*/}
                {/*<Route path='/new-post' render={() => <h1>NewPost</h1>}/>*/}
                <Route path='/' exact component={Posts}/>
                <Route path='/new-post' component={NewPost}/>
            </div>
        );
    }
}

export default Blog;