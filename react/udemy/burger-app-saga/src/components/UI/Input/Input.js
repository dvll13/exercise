import React from 'react'
import classes from './Input.css'

const Input = (props) => {
    let inputElement = null

    // Warning: React does not recognize the `inputType` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `inputtype` instead.
    // switch (props.inputtype) {
    const inputClasses = [classes.InputElement]
    let validationMessage = null

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)

        validationMessage = 'Please fill in the field!'
        if (props.valueType) {
            validationMessage = `Please enter a valid ${props.valueType}!`
        }

        validationMessage = <p className={classes.ValidationError}>{validationMessage}</p>
    }

    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            )
            break
        case 'textarea':
            inputElement = (
                <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            )
            break
        case 'select':
            inputElement = (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break
        default:
            inputElement = (
                <input
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            )
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationMessage}
        </div>
    )
}

export default Input
