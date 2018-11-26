import React from 'react'

// import {AuthContext} from '../StaticContextType'

import AuthContext from '../auth-context'

const Profile = (props) => (
    <AuthContext.Consumer>
        {(authContext) => <h1>{authContext.isAuth ? 'You are logged in!' : 'Not logged in!'}</h1>}
    </AuthContext.Consumer>
)

export default Profile
