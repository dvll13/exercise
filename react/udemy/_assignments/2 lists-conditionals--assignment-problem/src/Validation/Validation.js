import React from 'react';

const Validation = props => {
    let validityMsg = 'Text too short!';

    if (props.chars > 5) {
        validityMsg = 'Text long enough.';
    }

    return <p>{validityMsg}</p>;
};

export default Validation;