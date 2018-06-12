import React from 'react';
import { shallow } from 'enzyme';
import ProductList from './index';

describe('ProductList component', () => {
  let component, products;

  beforeEach(() => {
    products = [
      { id: 1 },
      { id: 2 },
    ];
    component = shallow(<ProductList products={products}/>);
  });

  it('renders each product with correct product prop', () => {
    products.forEach((product, index) => {
      expect(component.find('Product').at(index).props().product).toEqual(product);
    });
  });
});
