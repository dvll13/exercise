import React from 'react';

const UserInput = (props) => {
    const inputStyle = {
        border: '1px solid blue',
        fontWeight: 'bold',
        padding: '5px',
        backgroundColor: '#ddd'
    };

    return (
        <input
            type='text'
            onChange={props.change}
            value={props.userName}
            style={inputStyle}/>
    )
};

export default UserInput;