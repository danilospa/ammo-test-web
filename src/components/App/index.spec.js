import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('App component', () => {
  let component, fetchProducts, products, productCurrentPage, productPages;

  beforeEach(() => {
    fetchProducts = jest.fn();
    productCurrentPage = 'current page for product';
    productPages = 'total pages for product';
    products = 'list of products';
    component = shallow(
      <App
        fetchProducts={fetchProducts}
        products={products}
        productCurrentPage={productCurrentPage}
        productPages={productPages}
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
  
  it('renders ProductList with correct prop', () => {
    expect(component.find('ProductList').props().products).toEqual(products);
  });
  
  it('renders Pagination with correct props', () => {
    expect(component.find('Pagination').props()).toEqual({
      current: productCurrentPage,
      pages: productPages,
      onClick: component.instance().handlePagination,
    });
  });
});
