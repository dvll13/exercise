import React from 'react';

import Instance from '../Instance/Instance';

const InstanceCollection = props => (
    <div style={{display: 'flex'}}>
        {props.items.map((instance, index) => {
            return <div key={`${instance.id}_${index}`} style={{marginRight: 8}}>
                <Instance {...instance}/>
            </div>
        })}
    </div>
);

export default InstanceCollection;