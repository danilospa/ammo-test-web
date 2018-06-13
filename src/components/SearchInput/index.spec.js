import React from 'react';
import { shallow } from 'enzyme';
import SearchInput from './index';

describe('SearchInput component', () => {
  let component, props;

  beforeEach(() => {
    props = {
      value: 'search value',
      onSearch: jest.fn(),
    };
    component = shallow(<SearchInput {...props}/>);
  });

  it('initializes value with given prop', () => {
    expect(component.instance().state.value).toEqual(props.value);
  });

  it('updates value on state when changing it', () => {
    component.find('input').simulate('change', { target: { value: 'new value' }});
    expect(component.instance().state.value).toEqual('new value');
  });

  it('invokes callback from prop when bluring input', () => {
    component.find('input').simulate('blur', { target: { value: 'other value' }});
    expect(props.onSearch).toHaveBeenCalledWith('other value');
  });

  it('does not invoke callback from prop when bluring input but keeping its value', () => {
    component.find('input').simulate('blur', { target: { value: 'search value' }});
    expect(props.onSearch).not.toHaveBeenCalled();
  });

  it('performs search when pressing enter on input', () => {
    component.instance().search = jest.fn();
    const event = { key: 'Enter' };
    component.find('input').simulate('keypress', event);
    expect(component.instance().search).toHaveBeenCalledWith(event);
  });

  it('does not perform search when pressing other key on input', () => {
    component.instance().search = jest.fn();
    const event = { key: 'a' };
    component.find('input').simulate('keypress', event);
    expect(component.instance().search).not.toHaveBeenCalled();
  });

  it('clears value on state when clicking on clear button', () => {
    component.find('button').simulate('click');
    expect(component.instance().state.value).toEqual('');
  });

  it('performs search with cleaned value when clicking on clear button', () => {
    component.instance().search = jest.fn();
    component.find('button').simulate('click');
    expect(component.instance().search).toHaveBeenCalledWith({ target: { value: '' }});
  });
});
