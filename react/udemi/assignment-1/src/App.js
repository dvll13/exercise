import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'

class App extends Component {
    state = {
        user: {
            username: 'username_state'
        }
    };

    changeUsernameHandler = () => {
        debugger
        this.setState({
            user: {
                username: this.value
            }
        });
    };

    render() {
        return (
            <div className="App">
                <UserInput change={this.changeUsernameHandler} />

                <UserOutput username='username_static'/>
                <UserOutput username={this.state.user.username}/>
            </div>
        );
    }
}

export default App;
