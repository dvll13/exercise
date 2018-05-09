import React from 'react';

const WithCls = (props) => {
    return (
        <div className={props.classes}>
            {props.children}
        </div>
    )
};

export default WithCls;