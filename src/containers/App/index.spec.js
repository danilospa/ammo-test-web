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

  it('should pass correct fetch products dispatcher to component', () => {
    const props = component.find('App').props();
    expect(props.fetchProducts).toEqual(dispatch.products.fetchProducts);
  });
});
