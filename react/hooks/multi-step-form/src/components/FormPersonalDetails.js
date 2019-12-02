import React from 'react'
import {AppBar, TextField, Button} from '@material-ui/core'

const FormPersonalDetails = ({nextStep, prevStep, values, setters}) => {
    const proceed = (e) => {
        e.preventDefault()
        nextStep()
    }

    const back = (e) => {
        e.preventDefault()
        prevStep()
    }

    return (
        <>
            <AppBar position="static">Enter Personal details</AppBar>

            <TextField
                label="Occupation"
                placeholder="Enter your occupation"
                onChange={(e) => {
                    setters.setOccupation(e.target.value)
                }}
                value={values.occupation}
            />
            <br />

            <TextField
                label="City"
                placeholder="Enter your city"
                onChange={(e) => {
                    setters.setCity(e.target.value)
                }}
                value={values.city}
            />
            <br />

            <TextField
                label="Bio"
                placeholder="Enter your first bio"
                onChange={(e) => {
                    setters.setBio(e.target.value)
                }}
                value={values.bio}
            />
            <br />
            <br />

            <Button variant="contained" role="secondary" onClick={back}>
                Back
            </Button>

            <Button variant="contained" role="primary" onClick={proceed}>
                Continue
            </Button>
        </>
    )
}

export default FormPersonalDetails
