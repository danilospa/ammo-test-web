import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import AppContainer from './index';

const mockStore = configureStore([]);

describe('AppContainer', () => {
  let component, dispatch, products;

  beforeEach(() => {
    products = {
      items: [],
      pages: 10,
      currentPage: 5,
      pageSize: 20,
      total: 100,
      searchTerm: 'search term',
    };
    dispatch = {
      products: {
        fetchProducts: 'fetch products dispatcher',
      },
    };
    const store = mockStore({ products });
    Object.assign(store.dispatch, dispatch);

    component = shallow(<AppContainer store={store} />);
  });

  it('should pass correct products to component', () => {
    const props = component.find('App').props();
    expect(props.products).toEqual(products.items);
  });

  it('should pass correct product pages to component', () => {
    const props = component.find('App').props();
    expect(props.productPages).toEqual(products.pages);
  });

  it('should pass correct current page to component', () => {
    const props = component.find('App').props();
    expect(props.productCurrentPage).toEqual(products.currentPage);
  });

  it('should pass correct page size to component', () => {
    const props = component.find('App').props();
    expect(props.productsPageSize).toEqual(products.pageSize);
  });

  it('should pass correct total products to component', () => {
    const props = component.find('App').props();
    expect(props.totalProducts).toEqual(products.total);
  });

  it('should pass correct seach term to component', () => {
    const props = component.find('App').props();
    expect(props.searchTerm).toEqual(products.searchTerm);
  });

  it('should pass correct fetch products dispatcher to component', () => {
    const props = component.find('App').props();
    expect(props.fetchProducts).toEqual(dispatch.products.fetchProducts);
  });
});
