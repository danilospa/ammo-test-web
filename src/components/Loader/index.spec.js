import React from 'react';
import { shallow } from 'enzyme';
import Loader from './index';

describe('Loader component', () => {
  let component, product;

  beforeEach(() => {
    component = shallow(<Loader show={false}/>);
  });

  it('hides loader when show prop is false', () => {
    expect(component.html()).toEqual(null);
  });

  it('shows loader when show prop is true', () => {
    component.setProps({ show: true });
    expect(component.html()).not.toEqual(null);
  });
});
