import React from 'react'
import PropTypes from 'prop-types'

const Congrats = ({success}) => {
    return (
        <div data-test="component-congrats" className="alert alert-success">
            {success && <div data-test="congrats-message">Yeeeeey!</div>}
        </div>
    )
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired
}

export default Congrats
