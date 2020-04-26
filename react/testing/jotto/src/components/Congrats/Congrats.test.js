import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import {findByTestAttr} from '../../../test/testUtils'
import Congrats from './Congrats'

Enzyme.configure({adapter: new EnzymeAdapter()})

/**
 * Factory function to create shallow wrapper for the ClickCounter component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
    return shallow(<Congrats {...props} />)
}

test('Renders without error', () => {
    const wrapper = setup()
    expect(wrapper).toBeTruthy()
})

test('Renders no text when `success` prop is false', () => {})

test('Renders non-empty congrats message when `success` prop is true', () => {})
