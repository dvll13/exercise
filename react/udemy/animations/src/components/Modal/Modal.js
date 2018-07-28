import React from 'react';
// import Transition from 'react-transition-group/Transition'
import CSSTransition from 'react-transition-group/CSSTransition'

import './Modal.css';

const animationTiming = {
    enter: 1000,
    exit: 400
}

const Modal = (props) => {

    /*<Transition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={animationTiming}>
        {state => {
            const cssClasses = [
                'Modal',
                state === 'entering'
                    ? 'ModalOpen'
                    : state === 'exiting'
                        ? 'ModalClosed'
                        : null
            ];

            return (
                <div className={cssClasses.join(' ')}>
                    <h1>A Modal</h1>
                    <button className="Button" onClick={props.closed}>Dismiss</button>
                </div>
            )
        }}
    </Transition>
    
    so instead of manually adding classes we can use CSSTransition:
    */

    return (
        <CSSTransition
            mountOnEnter
            unmountOnExit
            in={props.show}
            timeout={animationTiming}
            classNames={{
                // enter:
                enterActive: 'ModalOpen',
                // exit:
                exitActive: 'ModalClosed'
                // appear: // only for the first time something appears in the dom
                // appearActive:
            }}
            //or
            //classNames='fade-slide'
        >
            <div className='Modal'>
                <h1>A Modal</h1>
                <button className="Button" onClick={props.closed}>Dismiss</button>
            </div>
        </CSSTransition>
    )
};

export default Modal;