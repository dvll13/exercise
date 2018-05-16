import React, { Component } from 'react';
import Course from './containers/Course/Course';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import {BrowserRouter, Route, NavLink, Redirect, Switch} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <ol style={{ textAlign: 'left' }}>
                        <li style={{textDecoration: 'line-through'}}>Add Routes to load "Users" and "Courses" on different pages (by entering a URL, without Links)</li>
                        <li style={{textDecoration: 'line-through'}}>Add a simple navigation with two links => One leading to "Users", one leading to "Courses"</li>
                        <li style={{textDecoration: 'line-through'}}>Make the courses in "Courses" clickable by adding a link and load the "Course" component in the place of "Courses" (without passing any data for now)</li>
                        <li style={{textDecoration: 'line-through'}}>Pass the course ID to the "Course" page and output it there</li>
                        <li style={{textDecoration: 'line-through'}}>Pass the course title to the "Course" page - pass it as a param or score bonus points by passing it as query params (you need to manually parse them though!)</li>
                        <li>Load the "Course" component as a nested component of "Courses"</li>
                        <li>Add a 404 error page and render it for any unknown routes</li>
                        <li>Redirect requests to /all-courses to /courses (=> Your "Courses" page)</li>
                    </ol>
                </div>
                <hr/>
                <BrowserRouter basename='/assignment-3'>
                    <section>
                        <div>
                            <ul>
                                <li><NavLink to='/users' activeStyle={{color: 'brown'}}>Users</NavLink></li>
                                <li><NavLink to='/courses' activeStyle={{color: 'brown'}}>Courses</NavLink></li>
                            </ul>
                        </div>
                        <div>
                            <Switch>
                                <Route path='/users' exact component={Users}/>
                                <Route path='/courses' exact component={Courses}/>
                                <Route path='/course/:id/title/:title' exact component={Course}/>
                                {/* <Route path='/course' exact component={Course}/> */}
                                <Redirect from='/' to='/users'/>
                            </Switch>
                        </div>
                    </section>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default App;
