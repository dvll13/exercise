import React, {Component} from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children; // update only if shown; used instead of pureComponent because the later would run more unnecessary checks for this case
    }

    componentWillUpdate() {
        console.log('[Modal] componentWillUpdate');
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.clicked}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? 1 : 0
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;