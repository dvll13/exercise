import React, { Component } from "react";

//NEW
import Transition from 'react-transition-group/Transition'

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
    state = {
        modalIsOpen: false,
        showBlock: false
    }

    showModal = () => {
        this.setState({ modalIsOpen: true });
    }

    hideModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div className="App">
                <h1>React Animations</h1>
                
                <button
                    className='Button'
                    onClick={() => {
                        this.setState(prevState => ({showBlock: !prevState.showBlock}))
                    }
                }>
                    Toggle
                </button>

                <Transition
                    in={this.state.showBlock} // start/stop transition
                    timeout={1000} // transition duration, should be the same as in css
                    mountOnEnter // if "in === true" add the element in dom
                    unmountOnExit // remove it if in === false
                    onEnter={() => console.log('onEnter')} // events
                    onEntering={() => console.log('onEntering')}
                    onEntered={() => console.log('onEntered')}
                    onExit={() => console.log('onExit')}
                    onExiting={() => console.log('onExiting')}
                    onExited={() => console.log('onExited')}
                >
                    {/*returns a fn with the current state (entering, entered, exiting, exited)*/}
                    {state => (
                        <div style={{
                            background: 'red',
                            width: 100,
                            height: 100,
                            margin: 'auto',
                            transition: 'opacity 1s ease-out',
                            opacity: state === 'exiting' ? 0 : 1
                        }}></div>
                    )}
  
                </Transition>
<br/>


                <Modal show={this.state.modalIsOpen} closed={this.hideModal} />
                
                {this.state.modalIsOpen ? <Backdrop show /> : null}


                <button className="Button" onClick={this.showModal}>Open Modal</button>
                <h3>Animating Lists</h3>
                <List />
            </div>
        );
    }
}

export default App;
