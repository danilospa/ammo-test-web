import axios from 'axios';
import { AMMO_TEST_API_BASE_URL } from '../../config'

function fetchProducts() {
  return axios.get(`${AMMO_TEST_API_BASE_URL}/v1/products`);
}

export default { fetchProducts };
