import React from 'react';

const ValidationComponent = props => {
    let validityMsg = null;

    if (props.chars < 5) {
        validityMsg = 'Text too short!';
    } else {
        validityMsg = 'Text long enough.';
    }

    return <p>{validityMsg}</p>;
};

export default ValidationComponent;