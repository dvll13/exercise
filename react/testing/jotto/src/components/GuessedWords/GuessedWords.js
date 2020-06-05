import React from 'react'
import PropTypes from 'prop-types'

function GuessedWords(props) {
    let contents

    if (props.guessedWords.length === 0) {
        contents = <span data-test="guess-instructions">Try to guess the secret word!</span>
    } else {
        const guessedWordsRows = props.guessedWords.map((word, index) => (
            <tr key={index} data-test="guessed-word">
                <td>{word.guessedWord}</td>
                <td>{word.letterMatchCount}</td>
            </tr>
        ))

        contents = (
            <div data-test="guessed-words">
                <h3>Guessed Words</h3>
                <table className="table table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>Guessed</th>
                            <th>Matching letters</th>
                        </tr>
                    </thead>
                    <tbody>{guessedWordsRows}</tbody>
                </table>
            </div>
        )
    }

    return <div data-test="component-guessed-words">{contents}</div>
}

GuessedWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired
        })
    ).isRequired
}

export default GuessedWords
