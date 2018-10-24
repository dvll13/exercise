import React from 'react'

const funcAsChildren = ({children, ...restProps}) => {
    return (
        <React.Fragment>
            <p>test</p>
        </React.Fragment>
    );
};

export default funcAsChildren