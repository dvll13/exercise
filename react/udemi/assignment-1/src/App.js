import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'

class App extends Component {
    state = {
        userOutputs: [
            { username: 'username1_static'},
            { username: 'username2_static' }
        ]
    };

    changeUsernameHandler = (event) => {
        this.setState({
            userOutputs: [
                { username: event.target.value },
                { username: 'username2_static' }
            ]
        });
    };

    render() {
        return (
            <div className="App">
                <UserInput change={this.changeUsernameHandler} username={this.state.userOutputs[0].username} />

                <UserOutput username={this.state.userOutputs[0].username}/>
                <UserOutput username={this.state.userOutputs[1].username}/>
            </div>
        );
    }
}

export default App;
