import React from 'react'

const ClickCounter = ({count = 0}) => {
    const [counter, setCounter] = React.useState(count)
    const [showError, setShowError] = React.useState(false)

    const increaseHandler = () => {
        setCounter(counter + 1)
        setShowError(false)
    }

    const decreaseHandler = () => {
        const newValue = counter - 1
        if (newValue < 0) {
            setShowError(true)
        } else {
            setCounter(newValue)
        }
    }

    return (
        <div data-test-id="component-click-counter">
            <button onClick={increaseHandler} data-test-id="increment-button">
                Increase
            </button>

            <button onClick={decreaseHandler} data-test-id="decrement-button">
                Decrease
            </button>

            <h1 data-test-id="counter-display">Counter: {counter}</h1>
            {showError && <p data-test-id="error-message">Sorry, the counter can't go below zero.</p>}
        </div>
    )
}

export default ClickCounter
