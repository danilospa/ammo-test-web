import React from 'react';
import { shallow } from 'enzyme';
import ProductSearchInput from './index';

describe('ProductSearchInput component', () => {
  let component, props;

  beforeEach(() => {
    props = {
      fetchProducts: jest.fn(),
      searchTerm: 'search term',
    };
    component = shallow(<ProductSearchInput {...props}/>);
  });

  it('fetches products when handling search', () => {
    component.instance().handleSearch('term');
    expect(props.fetchProducts).toHaveBeenCalledWith({
      searchTerm: 'term',
      page: 1,
    });
  });

  it('renders SearchInput with correct props', () => {
    expect(component.find('SearchInput').props()).toEqual({
      onSearch: component.instance().handleSearch,
      value: props.searchTerm,
    });
  });
});
