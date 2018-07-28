import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import './List.css';

class List extends Component {
    state = {
        items: [1, 2, 3]
    }

    addItemHandler = () => {
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(prevState.items.length + 1)
            };
        });
    }

    removeItemHandler = (selIndex) => {
        this.setState((prevState) => {
            return {
                items: prevState.items.filter((item, index) => index !== selIndex)
            };
        });
    }

    render () {
        const listItems = this.state.items.map( (item, index) => (
            // TransitionGroup manages the items and sets automatically the CSSTransition "in" property
            // key should be unique instead of index in order to animate the correct item
            <CSSTransition
                key={index}
                classNames='item-fade'
                timeout={300}>
                <li
                    className="ListItem" 
                    onClick={() => this.removeItemHandler(index)}>{item}</li>
            </CSSTransition>
        ) );

        return (
            <div>
                <button className="Button" onClick={this.addItemHandler}>Add Item</button>
                <p>Click Item to Remove.</p>
                {/* <ul className="List"> */}
                <TransitionGroup
                    component='ul'
                    className='List'
                >
                    {listItems}
                </TransitionGroup>
                {/* </ul> */}
            </div>
        );
    }
}

export default List;