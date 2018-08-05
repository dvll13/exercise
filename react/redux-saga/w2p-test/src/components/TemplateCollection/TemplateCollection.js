import React from 'react';

import Template from '../Template/Template';

const TemplateCollection = props => (
    <div style={{display: 'flex'}}>
        {props.items.map((template, index) => {
            return <Template key={`${template.id}_${index}`} {...template} style={{marginRight: 8}}/>
        })}
    </div>
);

export default TemplateCollection;