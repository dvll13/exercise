import React from 'react';

import Template from '../Template/Template';

const TemplateCollection = props => (
    <div style={{display: 'flex'}}>
        {props.items.map((template, index) => {
            return <div key={`${template.id}_${index}`} style={{marginRight: 8}}>
                <Template {...template}/>
            </div>
        })}
    </div>
);

export default TemplateCollection;