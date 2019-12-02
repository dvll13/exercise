import React from 'react'
import {AppBar, TextField, Button} from '@material-ui/core'
import Test from 'testFolder'

const FormUserDetails = ({nextStep, values, setters}) => {
    const proceed = (e) => {
        e.preventDefault()
        nextStep()
    }

    return (
        <>
            <AppBar position="static">Enter user details</AppBar>
            <Test />
            <TextField
                label="First name"
                placeholder="Enter your first name"
                // onChange={handleFieldChange('LastName')}
                onChange={(e) => {
                    setters.setFirstName(e.target.value)
                }}
                value={values.firstName}
            />
            <br />

            <TextField
                label="Last name"
                placeholder="Enter your last name"
                onChange={(e) => {
                    setters.setLastName(e.target.value)
                }}
                value={values.lastName}
            />
            <br />

            <TextField
                label="Email"
                placeholder="Enter your first email"
                onChange={(e) => {
                    setters.setEmail(e.target.value)
                }}
                value={values.email}
            />
            <br />
            <br />

            <Button variant="contained" role="primary" onClick={proceed}>
                Continue
            </Button>
        </>
    )
}

export default FormUserDetails
