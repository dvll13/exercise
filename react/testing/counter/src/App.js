import React from 'react'
import './App.css'
import ClickCounter from './components/ClickCounter'

function App() {
    return (
        <div className="App" data-test="component-app">
            <h1>learn testing</h1>

            <ClickCounter />
        </div>
    )
}

export default App
