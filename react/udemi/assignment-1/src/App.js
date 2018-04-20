import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'

class App extends Component {
    state = {
        userOutputs: [
            { userName: 'username1_static'},
            { userName: 'username2_static' }
        ]
    };

    changeUsernameHandler = (event) => {
        this.setState({
            userOutputs: [
                { userName: event.target.value },
                { userName: 'username2_static' }
            ]
        });
    };

    render() {
        return (
            <div className="App">
                <UserInput
                    change={this.changeUsernameHandler}
                    userName={this.state.userOutputs[0].userName} />

                <UserOutput userName={this.state.userOutputs[0].userName}/>
                <UserOutput userName={this.state.userOutputs[1].userName}/>
            </div>
        );
    }
}

export default App;
