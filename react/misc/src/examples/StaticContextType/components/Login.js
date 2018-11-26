import React from 'react'

// import {AuthContext} from '../StaticContextType'

// const Login = (props) => (
//     <AuthContext.Consumer>
//         {(authContext) => <button onClick={authContext.toggleAuth}>{authContext.isAuth ? 'Logout' : 'Login'}</button>}
//     </AuthContext.Consumer>
// )

// from React 16.6 that can be shortened to:

import AuthContext from '../auth-context'

class Login extends React.Component {
    static contextType = AuthContext

    componentDidMount() {
        console.log(this.context)
        //{isAuth: false, toggleAuth: ƒ}
    }

    render() {
        return <button onClick={this.context.toggleAuth}>{this.context.isAuth ? 'Logout' : 'Login'}</button>
    }
}

export default Login
