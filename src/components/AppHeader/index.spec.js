import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from './index';

describe('AppHeader component', () => {
  let component, props;

  beforeEach(() => {
    props = {
      fetchProducts: 'fetch products',
      searchTerm: 'search term',
    };
    component = shallow(<AppHeader {...props}/>);
  });

  it('renders ProductSearchInput with correct props', () => {
    expect(component.find('ProductSearchInput').props()).toEqual(props);
  });
});
