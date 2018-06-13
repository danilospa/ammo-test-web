import React from 'react';
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
    this.props.fetchProducts({ pageSize: size });
  }

  render() {
    const { products, productPages, productCurrentPage, productsPageSize, totalProducts } = this.props;

    return (
      <div className="app">
        <div className="app__product-list-header">
          <p className="app__products-count">{totalProducts} produtos encontrados</p>
        </div>

        <ProductList products={products}/>
        <div className="app__product-list-footer">
          <PageSizeSelector label="produtos por página" options={[5, 10, 20]} onChange={this.handlePageSizeChange} pageSize={productsPageSize}/>

          <div className="app__pagination">
            <Pagination current={productCurrentPage} pages={productPages} onClick={this.handlePagination}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
