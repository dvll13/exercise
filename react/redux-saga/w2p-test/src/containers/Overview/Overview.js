import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TemplateCollection, InstanceCollection } from '../../components';
import * as actions from '../../store/actions';
import { getLatestTemplates } from '../../store/selectors/templates';
import { getLatestInstances } from '../../store/selectors/instances';

class Overview extends Component {
    componentDidMount() {
        this.props.fetchLatestTemplates();
        this.props.fetchLatestInstances();
    }

    render() {
        console.log('RENDER overview');
        
        let templatesList = 'Loading...';
        if (this.props.latestTemplates && this.props.latestTemplates.length > 0) {
            templatesList = <TemplateCollection items={this.props.latestTemplates}/>;
        }
        
        let instancesList = 'Loading...';
        if (this.props.latestInstances && this.props.latestInstances.length > 0) {
            instancesList = <InstanceCollection items={this.props.latestInstances}/>;
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
        latestTemplates: getLatestTemplates(state.templates),
        latestInstances: getLatestInstances(state.instances)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLatestTemplates: () => dispatch( actions.fetchLatestTemplates() ),
        fetchLatestInstances: () => dispatch( actions.fetchLatestInstances() )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);