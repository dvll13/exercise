import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
    state = {
        text: ''
    };

    inputChangeHandler = (event) => {
        this.setState({ text: event.target.value });
    };

    charClickHandler = (index) => {
        let textArray = this.state.text.split('');
        textArray.splice(index, 1);
        this.setState({ text: textArray.join('')});
    };


    render() {
        let charComponents = null;

        if (this.state.text.length > 0) {
            let textArray = this.state.text.split('');
            charComponents = textArray.map((char, index) => {
                return (
                    <CharComponent
                        char={char}
                        key={'char_' + index}
                        click={this.charClickHandler.bind(this, index)} />
                );
            });
        }

        return (
            <div className="App">
                <ol>
                    <li>* Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
                    <li>* Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
                    <li>* Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
                    <li>* Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
                    <li>* Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
                    <li>When you click a CharComponent, it should be removed from the entered text.</li>
                </ol>
                <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>

                <input id='textInput' onChange={this.inputChangeHandler} value={this.state.text}/>
                <p id="inputTextLength">{this.state.text.length}</p>
                <ValidationComponent chars={this.state.text.length}/>
                {charComponents}
            </div>
        );
    }
}

export default App;
