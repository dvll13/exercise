import React, {Component} from 'react';
import { connect } from 'react-redux';

import { TemplateCollection } from "../../components";
import * as actions from "../../store/actions";

class Templates extends Component {
    componentDidMount() {
        this.props.fetchTemplates();
    }

    render() {
        console.log('[RENDER] templates');

        let templatesList = 'Loading...';
        if (this.props.templates.templates && this.props.templates.templates.length > 0) {
            templatesList = <TemplateCollection items={this.props.templates.templates}/>;
        }
        return (
            <React.Fragment>
                <p>Templates</p>
                {templatesList}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        templates: state.t
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTemplates: () => dispatch( actions.fetchTemplates() )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Templates);