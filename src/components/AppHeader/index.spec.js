import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from './index';

describe('AppHeader component', () => {
  let component, props;

  beforeEach(() => {
    props = {
      fetchProducts: 'fetch products',
      searchTerm: 'search term',
      loading: 'loading',
    };
    component = shallow(<AppHeader {...props}/>);
  });

  it('renders Loader with correct prop', () => {
    expect(component.find('Loader').props()).toEqual({ show: props.loading});
  });

  it('renders ProductSearchInput with correct props', () => {
    expect(component.find('ProductSearchInput').props()).toEqual({
      fetchProducts: props.fetchProducts,
      searchTerm: props.searchTerm,
    });
  });

  it('renders search term', () => {
    expect(component.find('h2').text()).toEqual(props.searchTerm);
  });

  it('hides search term when it is empty', () => {
    component.setProps({ searchTerm: '' });
    expect(component.find('h2').length).toEqual(0);
  });
});
