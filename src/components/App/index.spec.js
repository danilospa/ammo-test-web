import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('App component', () => {
  let component, props;

  beforeEach(() => {
    props = {
      fetchProducts: jest.fn(),
      productCurrentPage: 2,
      productPages: 'total pages for product',
      products: 'list of products',
      productsPageSize: 'page size',
      totalProducts: 100,
      searchTerm: 'search term',
      loading: 'loading',
      fetchError: false,
    };
    component = shallow(<App {...props}/>);
  });

  it('fetches products when component will mount', () => {
    expect(props.fetchProducts).toHaveBeenCalledWith();
  });

  it('fetches products for specified page when handling pagination', () => {
    const page = 2;
    component.instance().handlePagination(page);
    expect(props.fetchProducts).toHaveBeenCalledWith({ page });
  });

  describe('when changing page size', () => {
    const changePageSize = (size) => component.instance().handlePageSizeChange(size);

    it('fetches products with specified page size', () => {
      const size = 2;
      changePageSize(size);
      expect(props.fetchProducts).toHaveBeenCalledWith(expect.objectContaining({ pageSize: size }));
    });

    it('fetches products for current page when new number of pages is greater than the current one', () => {
      const size = 2;
      changePageSize(size);
      expect(props.fetchProducts).toHaveBeenCalledWith(expect.objectContaining({ page: props.productCurrentPage }));
    });

    it('fetches products for last page of the new number of pages when it is lower than the current one', () => {
      const size = 100;
      changePageSize(size);
      expect(props.fetchProducts).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }));
    });
  });

  it('renders AppHeader with correct prop', () => {
    expect(component.find('AppHeader').props()).toEqual({
      fetchProducts: props.fetchProducts,
      searchTerm: props.searchTerm,
      loading: props.loading,
    });
  });

  it('renders total products found', () => {
    expect(component.find('.app__products-count').text()).toMatch(props.totalProducts.toString());
  });
  
  it('renders ProductList with correct prop', () => {
    expect(component.find('ProductList').props().products).toEqual(props.products);
  });

  it('renders PageSizeSelector with correct props', () => {
    expect(component.find('PageSizeSelector').props()).toEqual({
      label: 'produtos por página',
      options: [5, 10, 20],
      onChange: component.instance().handlePageSizeChange,
      pageSize: props.productsPageSize,
    });
  });
  
  it('renders Pagination with correct props', () => {
    expect(component.find('Pagination').props()).toEqual({
      current: props.productCurrentPage,
      pages: props.productPages,
      onClick: component.instance().handlePagination,
    });
  });

  describe('when there are no products', () => {
    beforeEach(() => {
      component.setProps({ products: [] });
    });

    it('hides ProductList', () => {
      expect(component.find('ProductList').length).toEqual(0);
    });

    it('hides PageSizeSelector', () => {
      expect(component.find('PageSizeSelector').length).toEqual(0);
    });

    it('hides Pagination', () => {
      expect(component.find('Pagination').length).toEqual(0);
    });
  });

  it('adds -with-search-term class to app content when search term is not empty', () => {
    expect(component.find('.app__content').hasClass('-with-search-term')).toBe(true);
  });

  it('removes -with-search-term class to app content when search term is empty', () => {
    component.setProps({ searchTerm: '' });
    expect(component.find('.app__content').hasClass('-with-search-term')).toBe(false);
  });

  describe('when there is a fetch error', () => {
    beforeEach(() => {
      component.setProps({ fetchError: true });
    });

    it('show error message', () => {
      expect(component.find('.app__fetch-error-message').length).toEqual(1);
    });

    it('hides products list header', () => {
      expect(component.find('.app__product-list-header').length).toEqual(0);
    });
  });

  it('hides error message when there is no fetch error', () => {
    expect(component.find('.app__fetch-error-message').length).toEqual(0);
  });

  it('show products list header when there is no fetch error', () => {
    expect(component.find('.app__product-list-header').length).toEqual(1);
  });
});
