import React from 'react'
import {AppBar, List, ListItem, ListItemText, Button} from '@material-ui/core'

const Confirm = ({nextStep, prevStep, values}) => {
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

            <List>
                <ListItem>
                    <ListItemText primary="First name" secondary={values.firstName} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Last name" secondary={values.lastName} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Email" secondary={values.email} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Occupation" secondary={values.occupation} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="City" secondary={values.city} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Bio" secondary={values.bio} />
                </ListItem>
            </List>

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

export default Confirm
