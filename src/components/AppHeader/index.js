import React from 'react';
import ProductSearchInput from '../ProductSearchInput/index';
import './index.css';

class AppHeader extends React.Component {
  render() {
    return (
      <header className="app-header">
        <div className="app-header__content">
          <h1>mmartan</h1>
          <div className="app-header__search-wrapper">
            <ProductSearchInput fetchProducts={this.props.fetchProducts} searchTerm={this.props.searchTerm}/>
          </div>
        </div>

        { this.props.searchTerm &&
          (<h2 className="app-header__search-term">{this.props.searchTerm}</h2>)
        }
      </header>
    );
  }
}

export default AppHeader;
