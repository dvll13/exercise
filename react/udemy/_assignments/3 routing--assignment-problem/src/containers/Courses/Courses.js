import React, { Component } from 'react';
import './Courses.css';
// import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Course from '../Course/Course';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    };

    handleClick = (id, title) => {
        // this.props.history.push(`${this.props.match.url}/course/${id}/title/${title}`);
        this.props.history.push(`/courses/${id}?title=${title}`);
    };

    render() {
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map(course => {
                            /* <Link to='/course' key={course.id}>
                                <article className="Course">{course.title}</article>
                            </Link> */
                            return (
                                <article
                                    className="Course"
                                    key={course.id}
                                    onClick={() => this.handleClick(course.id, course.title)}
                                >
                                    {course.title}
                                </article>
                            );
                        })
                    }
                </section>
                <section>
                    {/* <Route path={this.props.match.url + '/course/:id/title/:title'} component={Course}/> */}
                    <Route path={this.props.match.url + '/:id'} component={Course}/>
                </section>
            </div>
        );
    }
}

export default Courses;