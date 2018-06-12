import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('App component', () => {
  let component, fetchProducts, products;

  beforeEach(() => {
    fetchProducts = jest.fn();
    products = 'list of products';
    component = shallow(<App fetchProducts={fetchProducts} products={products}/>);
  });

  it('fetches products when component will mount', () => {
    expect(fetchProducts).toHaveBeenCalledWith();
  });
  
  it('renders ProductList with correct prop', () => {
    expect(component.find('ProductList').props().products).toEqual(products);
  });
});
