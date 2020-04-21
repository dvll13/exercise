import React from 'react'

const ClickCounter = () => {
    const [count, setCount] = React.useState(0)

    return (
        <div data-test-id="component-click-counter">
            <h1 data-test-id="counter-display">Counter: {count}</h1>
            <button onClick={() => setCount(count + 1)} data-test-id="increment-button">
                Increase
            </button>
        </div>
    )
}

export default ClickCounter
