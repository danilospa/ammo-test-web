import React from 'react';
import { mount } from 'enzyme';
import Price from './index';

describe('Price component', () => {
  let component, product;

  beforeEach(() => {
    component = mount(<Price value={1000}/>);
  });

  it('renders price', () => {
    expect(component.text()).toEqual('R$1.000,00');
  });
});
