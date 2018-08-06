import React, {Component} from 'react';
import { connect } from 'react-redux';

import { InstanceCollection} from "../../components";
import * as actions from "../../store/actions";

class Instances extends Component {
    componentDidMount() {
        this.props.fetchInstances();
    }

    render() {
        console.log('[RENDER] instances');

        let instancesList = 'Loading...';
        if (this.props.instances.instances && this.props.instances.instances.length > 0) {
            instancesList = <InstanceCollection items={this.props.instances.instances}/>;
        }
        return (
            <React.Fragment>
                <p>Instances</p>
                {instancesList}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        instances: state.i
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchInstances: () => dispatch( actions.fetchInstances() )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Instances);