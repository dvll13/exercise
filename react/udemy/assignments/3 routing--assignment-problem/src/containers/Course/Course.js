import React, { Component } from 'react';

class Course extends Component {
    state = {
        id: null,
        title: null
    }

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     for (let param of query.entries()) {
    //         console.log(param); // yields ['start', '5']
    //         let obj = {};
    //         obj[param[0]] = param[1];
    //         this.setState(obj);
    //     }
    // }

    render() {
        return (
            <div>
                <h1>{this.props.match.params.title}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
                
                {/* <p>EXTRACTED PARAMS:</p>
                <h1>{this.state.title}</h1>
                <p>You selected the Course with ID: {this.state.id}</p> */}
            </div>
        );
    }
}

export default Course;