import React from 'react';
import ProductSearchInput from '../ProductSearchInput/index';
import './index.css';

class AppHeader extends React.Component {
  render() {
    return (
      <header className="app-header">
        <h1>mmartan</h1>
        <div className="app-header__search-wrapper">
          <ProductSearchInput fetchProducts={this.props.fetchProducts} searchTerm={this.props.searchTerm}/>
        </div>
      </header>
    );
  }
}

export default AppHeader;
