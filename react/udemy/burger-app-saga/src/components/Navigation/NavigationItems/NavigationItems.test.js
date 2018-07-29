import React from 'react';

// enzyme enables us to render components standalone
// shallow - renders subcomponents but just as placeholders, not the whole subtree (should be used as often as possible)
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// connect enzyme
configure({ adapter: new Adapter() });

// param 1 - what to show in the console about what are we testing
// param 2 - the actual test
describe('<NavigationItems/>', () => {

    // if we constantly do the same:
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    // we also have afterEach() for cleanup

    // it - a test
    // param 1 - a description for the console
    // param 2 - testing fn 
    it('should render two <NavigationItem/> elements if not authenticated', () => {
        // const wrapper = shallow(<NavigationItems />);

        // check what's in the wrapper
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem/> elements if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated />);
        //wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({ isAuthenticated: true });

        // find: finds every node in the render tree of the current wrapper that matches the provided selector
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render an exact logout button', () => {
        wrapper.setProps({ isAuthenticated: true });

        //contains: Returns whether or not all given react elements match elements in the render tree. It will determine if an element in the wrapper matches the expected element by checking if the expected element has the same props as the wrapper's element and share the same values
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});