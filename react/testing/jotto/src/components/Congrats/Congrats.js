import React from 'react'
import PropTypes from 'prop-types'

const Congrats = ({success}) => {
    return <div data-test-id="component-congrats">{success && <div data-test-id="congrats-message">yeeeeey</div>}</div>
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired
}

export default Congrats
