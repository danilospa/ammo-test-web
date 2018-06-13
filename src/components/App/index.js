import React from 'react';
import ProductList from '../ProductList/index';
import Pagination from '../Pagination/index';

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
      <div>
        <ProductList products={products}/>
        <Pagination current={productCurrentPage} pages={productPages} onClick={this.handlePagination}/>
      </div>
    );
  }
}

export default App;
