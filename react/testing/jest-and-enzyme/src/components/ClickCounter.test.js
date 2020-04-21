import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import ClickCounter from './ClickCounter'

Enzyme.configure({adapter: new EnzymeAdapter()})

/**
 * Factory function to create shallow wrapper for the ClickCounter component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {any} state - Initial state for setup.
 */
const setup = (props = {}, state = null) => {
    return shallow(<ClickCounter {...props} />)
}

/**
 * Returns ShallowWrapper containing node(s) with the da value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Valu of data-test-id attribute for search.
 * @return {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test-id="${val}"]`)
}

test('renders without error', () => {
    const wrapper = setup()
    const counterComponent = findByTestAttr(wrapper, 'component-click-counter')
    expect(counterComponent.length).toBe(1)
})

test('renders increment button', () => {
    const wrapper = setup()
    const buttonComponent = findByTestAttr(wrapper, 'increment-button')
    expect(buttonComponent.length).toBe(1)
})

test('renders counter display', () => {
    const wrapper = setup()
    const textComponent = findByTestAttr(wrapper, 'counter-display')
    expect(textComponent.length).toBe(1)
})

test('counter starts at 0', () => {})

test('clicking button increments counter display', () => {})
