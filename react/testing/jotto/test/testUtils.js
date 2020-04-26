/**
 * Returns ShallowWrapper containing node(s) with the da value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Valu of data-test-id attribute for search.
 * @return {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test-id="${val}"]`)
