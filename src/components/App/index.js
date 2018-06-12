import React from 'react';
import ProductList from '../ProductList/index';

class App extends React.Component {
  componentWillMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div>
        <ProductList products={this.props.products}/>
      </div>
    );
  }
}

export default App;
