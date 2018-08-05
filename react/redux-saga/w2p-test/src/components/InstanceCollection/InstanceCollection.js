import React from 'react';

import Instance from '../Instance/Instance';

const InstanceCollection = props => (
    <div style={{display: 'flex'}}>
        {props.items.map((instance, index) => {
            return <Instance key={`${instance.id}_${index}`} {...instance} style={{marginRight: 8}}/>
        })}
    </div>
);

export default InstanceCollection;