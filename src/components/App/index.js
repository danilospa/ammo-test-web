import React from 'react';
import ProductList from '../ProductList/index';
import Pagination from '../Pagination/index';
import './index.css';

class App extends React.Component {
  componentWillMount() {
    this.props.fetchProducts();
  }

  handlePagination = (page) => {
    this.props.fetchProducts({ page });
  }

  render() {
    const { products, productPages, productCurrentPage } = this.props;

    return (
      <div className="app">
        <ProductList products={products}/>
        <div className="app__product-list-footer">
          <div className="app__pagination">
            <Pagination current={productCurrentPage} pages={productPages} onClick={this.handlePagination}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
