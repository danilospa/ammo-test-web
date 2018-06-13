import React from 'react';
import SearchInput from '../SearchInput/index';

class ProductSearchInput extends React.Component {
  handleSearch = (term) => {
    this.props.fetchProducts({
      searchTerm: term,
      page: 1
    });
  }

  render() {
    return (
      <SearchInput onSearch={this.handleSearch} value={this.props.searchTerm}/>
    );
  }
}

export default ProductSearchInput;
