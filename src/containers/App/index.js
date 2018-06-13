import { connect } from 'react-redux';
import App from '../../components/App';

const mapState = ({ products }) => ({
  products: products.items,
  productPages: products.pages,
  productCurrentPage: products.currentPage,
  productsPageSize: products.pageSize,
});

const mapDispatch = ({ products: { fetchProducts }}) => ({
  fetchProducts,
});

export default connect(mapState, mapDispatch)(App);
