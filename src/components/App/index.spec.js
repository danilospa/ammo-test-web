import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('App component', () => {
  let component, fetchProducts, products, productCurrentPage, productPages, productsPageSize, totalProducts;

  beforeEach(() => {
    fetchProducts = jest.fn();
    productCurrentPage = 2;
    productPages = 'total pages for product';
    products = 'list of products';
    productsPageSize = 'page size';
    totalProducts = 100;
    component = shallow(
      <App
        fetchProducts={fetchProducts}
        products={products}
        productCurrentPage={productCurrentPage}
        productPages={productPages}
        productsPageSize={productsPageSize}
        totalProducts={totalProducts}
        />
    );
  });

  it('fetches products when component will mount', () => {
    expect(fetchProducts).toHaveBeenCalledWith();
  });

  it('fetches products for specified page when handling pagination', () => {
    const page = 2;
    component.instance().handlePagination(page);
    expect(fetchProducts).toHaveBeenCalledWith({ page });
  });

  describe('when changing page size', () => {
    const changePageSize = (size) => component.instance().handlePageSizeChange(size);

    it('fetches products with specified page size', () => {
      const size = 2;
      changePageSize(size);
      expect(fetchProducts).toHaveBeenCalledWith(expect.objectContaining({ pageSize: size }));
    });

    it('fetches products for current page when new number of pages is greater than the current one', () => {
      const size = 2;
      changePageSize(size);
      expect(fetchProducts).toHaveBeenCalledWith(expect.objectContaining({ page: productCurrentPage }));
    });

    it('fetches products for last page of the new number of pages when it is lower than the current one', () => {
      const size = 100;
      changePageSize(size);
      expect(fetchProducts).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }));
    });
  });

  it('renders total products found', () => {
    expect(component.find('.app__products-count').text()).toMatch(totalProducts.toString());
  });
  
  it('renders ProductList with correct prop', () => {
    expect(component.find('ProductList').props().products).toEqual(products);
  });

  it('renders PageSizeSelector with correct props', () => {
    expect(component.find('PageSizeSelector').props()).toEqual({
      label: 'produtos por página',
      options: [5, 10, 20],
      onChange: component.instance().handlePageSizeChange,
      pageSize: productsPageSize,
    });
  });
  
  it('renders Pagination with correct props', () => {
    expect(component.find('Pagination').props()).toEqual({
      current: productCurrentPage,
      pages: productPages,
      onClick: component.instance().handlePagination,
    });
  });
});
