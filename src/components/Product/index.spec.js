import React from 'react';
import { shallow } from 'enzyme';
import Product from './index';

describe('Product component', () => {
  let component, product;

  beforeEach(() => {
    product = {
      name: 'product name'
    };
    component = shallow(<Product product={product}/>);
  });

  it('renders product name', () => {
    expect(component.html()).toMatch(product.name);
  });
});
