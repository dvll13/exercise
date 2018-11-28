import React, {Component, Suspense} from 'react'
// import {BrowserRouter, Route, NavLink} from 'react-router-dom'

import User from './containers/User'
// import Welcome from './containers/Welcome'

const Posts = React.lazy(() => import('./containers/Posts'))
//only delault imports are currently supported

class Lazy extends Component {
    //for case 2
    state = {
        showPosts: false
    }

    modeHandler = () => {
        this.setState((prevState) => ({
            showPosts: !prevState.showPosts
        }))
    }

    render() {
        return (
            <>
                <section>
                    <h2>Case 1 - Routing</h2>
                    {/*
                    <BrowserRouter>
                        <React.Fragment>
                            <nav>
                                <NavLink to="/user">User Page</NavLink> |&nbsp;
                                <NavLink to="/posts">Posts Page</NavLink>
                            </nav>
                            <Route path="/" component={Welcome} exact />
                            <Route path="/user" component={User} />
                            <Route
                                path="/posts"
                                render={() => (
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Posts />
                                    </Suspense>
                                )}
                            />
                        </React.Fragment>
                    </BrowserRouter>
                    */}
                </section>

                <section style={{marginTop: 50}}>
                    <h2>Case 2</h2>

                    <button onClick={this.modeHandler}>Toggle mode</button>

                    {this.state.showPosts ? (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Posts />
                        </Suspense>
                    ) : (
                        <User />
                    )}
                </section>
            </>
        )
    }
}

export default Lazy
