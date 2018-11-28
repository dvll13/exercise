import React from 'react'

const login = (props) => {
    console.log(props)
    return (
        <>
            <button onClick={props.onLogout}>Logout</button>
            <button onClick={props.onLogin}>Login</button>
        </>
    )
}

export default React.memo(login)
//React.memo shallow-compares the old and new props and rerenders only when there is a change
//no objects deep checks - so you should use immutable approach when updating objects in your props
//use only if you want to filter re-renders (if there is a chance the new received props to be the same as the previous ones)
