import { connect } from 'react-redux';
import App from '../../components/App';

const mapState = ({ products }) => ({
  products: products.items,
});

const mapDispatch = ({ products: { fetchProducts }}) => ({
  fetchProducts,
});

export default connect(mapState, mapDispatch)(App);
