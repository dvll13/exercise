import React from 'react';
// import { render } from '@testing-library/react';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

Enzyme.configure({adapter: new EnzymeAdapter()})

test('renders without error', () => {
    const wrapper = shallow(<App />)
    // const appDiv = wrapper.find('div.App')
    // expect(appDiv.length).toBe(1)
    expect(wrapper).toBeTruthy()
})