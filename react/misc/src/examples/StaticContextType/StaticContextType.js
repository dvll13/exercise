import React, {Component} from 'react'

import Login from './components/Login'
import Profile from './components/Profile'

// export const AuthContext = React.createContext({
//     isAuth: false,
//     toggleAuth: () => {}
// })

// that goes out to auth-context.js

import AuthContext from './auth-context'

//TODO: add example text

class StaticContextType extends Component {
    state = {
        isAuth: false
    }

    toggleAuth = () => {
        this.setState((prevState) => ({
            isAuth: !prevState.isAuth
        }))
    }

    render() {
        return (
            <AuthContext.Provider value={{isAuth: this.state.isAuth, toggleAuth: this.toggleAuth}}>
                <Login />
                <Profile />
            </AuthContext.Provider>
        )
    }
}

export default StaticContextType
