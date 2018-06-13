import React from 'react';
import { shallow } from 'enzyme';
import Product from './index';

describe('Product component', () => {
  let component, product;

  beforeEach(() => {
    product = {
      name: 'product name',
      images: ['first image', 'second image', 'third image', 'fourth image', 'fifth image'],
    };
    component = shallow(<Product product={product}/>);
  });

  it('renders product name on h3', () => {
    expect(component.find('h3').text()).toEqual(product.name);
  });

  it('renders only first 4 images', () => {
    expect(component.find('.product__image-wrapper').length).toEqual(4);
  });

  it('renders correct image urls', () => {
    product.images.slice(0, 4).forEach((image, index) => {
      expect(component.find('.product__image-wrapper img').at(index).props().src).toEqual(image);
    });
  });
});
