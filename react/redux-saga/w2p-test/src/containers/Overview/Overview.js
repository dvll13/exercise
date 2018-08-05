import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TemplateCollection, InstanceCollection } from '../../components';
import * as actions from '../../store/actions';

class Overview extends Component {
    componentDidMount() {
        this.props.fetchTemplates();
        this.props.fetchInstances();
    }

    render() {
        console.log('RENDER overview');
        
        let templatesList = 'Loading...';
        if (this.props.templates.templates && this.props.templates.templates.length > 0) {
            templatesList = <TemplateCollection items={this.props.templates.templates}/>;
        }
        
        let instancesList = 'Loading...';
        if (this.props.instances.instances && this.props.instances.instances.length > 0) {
            instancesList = <InstanceCollection items={this.props.instances.instances}/>;
        }
        
        return (
            <div>
                <h2>Overview</h2>

                <h3>Templates</h3>
                {templatesList}

                <h3>Instances</h3>
                {instancesList}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        templates: state.t,
        instances: state.i
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTemplates: () => dispatch( actions.fetchTemplates() ),
        fetchInstances: () => dispatch( actions.fetchInstances() )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);