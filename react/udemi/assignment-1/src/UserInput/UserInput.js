import React from 'react';

const UserInput = (props) => {
    const style = {
        border: '1px solid blue',
        fontWeight: 'bold',
        padding: '5px',
        backgroundColor: '#ddd'
    };

    return (
        <div className='UserInput'>
            <input type='text' onChange={props.change} value={props.username} style={style}/>
        </div>
    )
};

export default UserInput;