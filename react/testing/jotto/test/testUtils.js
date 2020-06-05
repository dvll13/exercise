import CheckPropTypes from 'check-prop-types'
/**
 * Returns ShallowWrapper containing node(s) with the da value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Valu of data-test attribute for search.
 * @return {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`)

export const checkProps = (component, conformingProps) => {
    const propError = CheckPropTypes(component.propTypes, conformingProps, 'prop', component.name)
    expect(propError).toBeUndefined()
}
