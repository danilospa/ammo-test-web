import React from 'react';
import ProductSearchInput from '../ProductSearchInput/index';
import Loader from '../Loader/index';
import './index.css';

class AppHeader extends React.Component {
  render() {
    const { fetchProducts, searchTerm, loading } = this.props;

    return (
      <header className="app-header">
        <div className="app-header__content">
          <h1>mmartan</h1>
          <div className="app-header__loader">
            <Loader show={loading}/>
          </div>

          <div className="app-header__search-wrapper">
            <ProductSearchInput fetchProducts={fetchProducts} searchTerm={searchTerm}/>
          </div>
        </div>

        { this.props.searchTerm &&
          (<h2 className="app-header__search-term">{searchTerm}</h2>)
        }
      </header>
    );
  }
}

export default AppHeader;
