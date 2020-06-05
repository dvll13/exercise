import React from 'react'
import GuessedWords from './components/GuessedWords/GuessedWords'
import Congrats from './components/Congrats/Congrats'

function App() {
    return (
        <div className="container">
            <h1>Jotto</h1>
            <Congrats success={true} />
            <GuessedWords guessedWords={[{guessedWord: 'train', letterMatchCount: 3}]} />
        </div>
    )
}

export default App
