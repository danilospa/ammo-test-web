import React from 'react';
import AppHeader from '../AppHeader/index';
import ProductList from '../ProductList/index';
import Pagination from '../Pagination/index';
import PageSizeSelector from '../PageSizeSelector/index';
import './index.css';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  handlePagination = (page) => {
    this.props.fetchProducts({ page });
  }

  handlePageSizeChange = (size) => {
    const { totalProducts, productCurrentPage } = this.props;
    const newPages = Math.ceil(totalProducts / size);
    const currentPage = Math.min(productCurrentPage, newPages);
    this.props.fetchProducts({ pageSize: size, page: currentPage });
  }

  render() {
    const { fetchProducts, products, productPages, productCurrentPage,
      productsPageSize, totalProducts, searchTerm, loading, fetchError } = this.props;

    return (
      <div className="app">
        <AppHeader fetchProducts={fetchProducts} searchTerm={searchTerm} loading={loading}/>

        <div className={`app__content ${searchTerm && '-with-search-term'}`}>
          { fetchError && (<p className="app__fetch-error-message">Erro ao buscar produtos</p>)}

          { !fetchError && (
            <div className="app__product-list-header">
              <p className="app__products-count">{totalProducts} produtos encontrados</p>
            </div>
          )}

          { !!products.length && (
            <div>
              <ProductList products={products}/>
              <div className="app__product-list-footer">
                <PageSizeSelector label="produtos por página" options={[5, 10, 20]} onChange={this.handlePageSizeChange} pageSize={productsPageSize}/>

                <div className="app__pagination">
                  <Pagination current={productCurrentPage} pages={productPages} onClick={this.handlePagination}/>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
