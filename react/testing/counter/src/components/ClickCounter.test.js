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
const setup = (props = {} /* , state = null */) => {
    return shallow(<ClickCounter {...props} />)
}

/**
 * Returns ShallowWrapper containing node(s) with the da value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Valu of data-test attribute for search.
 * @return {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`)
}

test('renders without error', () => {
    const wrapper = setup()
    const counterComponent = findByTestAttr(wrapper, 'component-click-counter')
    expect(counterComponent.length).toBe(1)
})

test('renders counter display', () => {
    const wrapper = setup()
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.length).toBe(1)
})

test('counter starts at 0', () => {
    const wrapper = setup()
    // initialCounterState = wrapper.state('count')
    // expect(initialCounterState).toBe(0)
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.text()).toContain('0')
})

// now we have enough tests to organize by function
describe('Increment', () => {
    test('renders increment button', () => {
        const wrapper = setup()
        const buttonComponent = findByTestAttr(wrapper, 'increment-button')
        expect(buttonComponent.length).toBe(1)
    })

    test('clicking button increments counter display', () => {
        const count = 7
        const wrapper = setup({count})
        const buttonComponent = findByTestAttr(wrapper, 'increment-button')

        buttonComponent.simulate('click')
        wrapper.update()

        const counterDisplay = findByTestAttr(wrapper, 'counter-display')
        expect(counterDisplay.text()).toContain(count + 1)
    })
})

describe('Decrement', () => {
    // using a describe here so I can use a "beforeEach" for shared setup

    // scoping wrapper to the describe, so it can be used in beforeEach and the tests
    let wrapper, decrementButton
    beforeEach(() => {
        wrapper = setup()

        decrementButton = findByTestAttr(wrapper, 'decrement-button')
    })

    test('Renders the decrement button', () => {
        expect(decrementButton.length).toBe(1)
    })

    test('Clicking the decrement button decreases the counter display', () => {
        const count = 3
        const _wrapper = setup({count})

        const _decrementButton = findByTestAttr(_wrapper, 'decrement-button')
        _decrementButton.simulate('click')

        const counterDisplay = findByTestAttr(_wrapper, 'counter-display')
        expect(counterDisplay.text()).toContain(2)
    })

    test('Decreasing the value is not possible below 0', () => {
        decrementButton.simulate('click')
        wrapper.update()

        const counterDisplay = findByTestAttr(wrapper, 'counter-display')
        expect(counterDisplay.text()).toContain(0)
    })

    test(`Don't show an error if the counter is not negative.`, () => {
        const errorElement = findByTestAttr(wrapper, 'error-message')

        // using enzyme's ".hasClass()" method
        // http://airbnb.io/enzyme/docs/api/ShallowWrapper/hasClass.html
        // const errorHasHiddenClass = errorElement.hasClass('hidden');
        // expect(errorHasHiddenClass).toBe(true);

        // expect(errorElement.exists()).toBe(false)
        expect(errorElement.length).toBe(0)
    })

    test('Decreasing the counter below zero should display an error message', () => {
        decrementButton.simulate('click')

        const errorElement = findByTestAttr(wrapper, 'error-message')
        // expect(errorElement.exists()).toBe(true)
        expect(errorElement.length).toBe(1)
    })
})
