import React, { Component } from 'react';
import './Blog.css';
import {Route, /*Link*/ NavLink, Switch, Redirect} from 'react-router-dom';
import Posts from './Posts/Posts';
import asyncComponent from "../../hoc/asyncComponent";
// import NewPost from './NewPost/NewPost';

const AsyncNewPost = asyncComponent(() => {
    // whatever is in the () will be only imported when the anonymous fn is executed
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    render () {
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            {/*<li><Link to='/'>Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</Link></li>*/}
                            <li>
                                <NavLink 
                                    to='/posts'
                                    exact
                                    activeClassName='my-active'
                                    activeStyle={{textDecoration: 'underline'}}>Posts</NavLink>
                            </li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/*<Route path='/' render={() => <h1>Home</h1>}/>*/}
                {/*<Route path='/' exact render={() => <h2>Home 2</h2>}/>*/}
                {/*<Route path='/new-post' render={() => <h1>NewPost</h1>}/>*/}
                <Switch>
                    {/*<Route path='/new-post' component={NewPost}/>*/}
                    <Route path='/new-post' component={AsyncNewPost}/>
                    <Route path='/posts' component={Posts}/>
                    <Redirect from='/' to='/posts'/> {/*catches anything not yet redirected*/}
                    {/* <Route render={() => <h1>404: Not found!</h1>}/> OR this, to catch 404 */}
                    {/*<Route path='/:my_id' exact component={FullPost}/>*/} {/* overrides the similar ones above it, should be last in order for the similar to be possible to be reached */}
                </Switch>
            </div>
        );
    }
}

export default Blog;