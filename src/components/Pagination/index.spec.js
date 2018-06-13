import React from 'react';
import { shallow } from 'enzyme';
import Pagination from './index';

describe('Pagination component', () => {
  let component, current, pages, callback;

  beforeEach(() => {
    current = 1;
    pages = 10;
    callback = jest.fn();
    component = shallow(
      <Pagination
        current={current}
        pages={pages}
        onClick={callback}
        />
    );
  });

  describe('goToFirstPage', () => {
    it('does not invoke callback when current page is the first', () => {
      component.instance().goToFirstPage();
      expect(callback).not.toHaveBeenCalled();
    });

    it('does invoke callback when current page is not the first', () => {
      component.setProps({ current: 2 });
      component.instance().goToFirstPage();
      expect(callback).toHaveBeenCalledWith(1);
    });
  });

  describe('goToPreviousPage', () => {
    it('does not invoke callback when current page is the first', () => {
      component.instance().goToPreviousPage();
      expect(callback).not.toHaveBeenCalled();
    });

    it('does invoke callback when current page is not the first', () => {
      component.setProps({ current: 4 });
      component.instance().goToPreviousPage();
      expect(callback).toHaveBeenCalledWith(3);
    });
  });

  describe('goToLastPage', () => {
    it('does not invoke callback when current page is the last', () => {
      component.setProps({ current: pages });
      component.instance().goToLastPage();
      expect(callback).not.toHaveBeenCalled();
    });

    it('does invoke callback when current page is not the last', () => {
      component.instance().goToLastPage();
      expect(callback).toHaveBeenCalledWith(pages);
    });
  });

  describe('goToNextPage', () => {
    it('does not invoke callback when current page is the last', () => {
      component.setProps({ current: pages });
      component.instance().goToNextPage();
      expect(callback).not.toHaveBeenCalled();
    });

    it('does invoke callback when current page is not the last', () => {
      component.instance().goToNextPage();
      expect(callback).toHaveBeenCalledWith(current + 1);
    });
  });

  describe('goToPage', () => {
    it('does not invoke callback when specified page is the current one', () => {
      component.instance().goToPage(current);
      expect(callback).not.toHaveBeenCalled();
    });

    it('does invoke callback when specified page is not the current one', () => {
      component.instance().goToPage(current + 1);
      expect(callback).toHaveBeenCalledWith(current + 1);
    });
  });

  it('sets -first class on wrapper when current page is the first', () => {
    expect(component.hasClass('-first')).toBe(true);
  });

  it('does not set -first class on wrapper when current page is not the first', () => {
      component.setProps({ current: 2 });
    expect(component.hasClass('-first')).toBe(false);
  });

  it('sets -last class on wrapper when current page is the last', () => {
      component.setProps({ current: pages });
    expect(component.hasClass('-last')).toBe(true);
  });

  it('does not set -last class on wrapper when current page is not the last', () => {
    expect(component.hasClass('-last')).toBe(false);
  });

  it('sets -active class on the current item', () => {
    expect(component.find('.-active').text()).toEqual(current.toString());
  });

  it('shows correct number for each page', () => {
    component.setProps({ pages: 2 });
    expect(component.find('.pagination__number').at(0).text()).toEqual('1');
    expect(component.find('.pagination__number').at(1).text()).toEqual('2');
    expect(component.find('.pagination__number').at(2).text()).toEqual('');
  });

  it('changes to correct page when clicking on number', () => {
    component.instance().goToPage = jest.fn();
    component.find('.pagination__number').at(0).simulate('click');
    expect(component.instance().goToPage).toHaveBeenCalledWith(1);
  });
});
