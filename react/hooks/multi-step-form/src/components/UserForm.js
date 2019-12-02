import React, {useState} from 'react'
import FormUserDetails from './FormUserDetails'
import FormPersonalDetails from './FormPersonalDetails'
import Confirm from './Confirm'

const UserForm = () => {
    const [step, setStep] = useState(1)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [occupation, setOccupation] = useState('')
    const [city, setCity] = useState('')
    const [bio, setBio] = useState('')

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    const values = {firstName, lastName, email, occupation, city, bio}
    const setters = {setFirstName, setLastName, setEmail, setOccupation, setCity, setBio}

    switch (step) {
        case 2:
            return <FormPersonalDetails nextStep={nextStep} prevStep={prevStep} values={values} setters={setters} />
        case 3:
            return <Confirm nextStep={nextStep} prevStep={prevStep} values={values} />
        case 4:
            return <h1>Success (2do)</h1>
        default:
            return <FormUserDetails nextStep={nextStep} values={values} setters={setters} />
    }
}

export default UserForm
