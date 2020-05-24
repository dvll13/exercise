import React from 'react'
import {shallow} from 'enzyme'
import {findByTestAttr, checkProps} from '../../../test/testUtils'
import Congrats from './Congrats'

const defaultProps = {success: false}

/**
 * Factory function to create shallow wrapper for the ClickCounter component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<Congrats {...setupProps} />)
}

test('Renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-congrats')
    expect(component.length).toBeTruthy()
})

test('Renders no text when `success` prop is false', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-congrats')
    expect(component.text()).toBe('')
})

test('Renders non-empty congrats message when `success` prop is true', () => {
    const wrapper = setup({success: true})
    const message = findByTestAttr(wrapper, 'congrats-message')
    expect(message.text().length).not.toBe(0)
})

test('Does not throw warning with expected props', () => {
    const expectedProps = {success: false}
    // const propError = checkPropTypes(Congrats.propTypes, expectedProps, 'prop', Congrats.name)
    // expect(propError).toBeUndefined()

    checkProps(Congrats, expectedProps)
})
