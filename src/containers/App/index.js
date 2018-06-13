import { connect } from 'react-redux';
import App from '../../components/App';

const mapState = ({ products }) => ({
  products: products.items,
  productPages: products.pages,
  productCurrentPage: products.currentPage,
});

const mapDispatch = ({ products: { fetchProducts }}) => ({
  fetchProducts,
});

export default connect(mapState, mapDispatch)(App);
