import subject from './index';
import axios from 'axios';
import { AMMO_TEST_API_BASE_URL } from '../../config'

jest.mock('axios');

describe('ammoTestApi client', () => {
  describe('fetchProducts', () => {
    it('performs correct request', () => {
      subject.fetchProducts();
      expect(axios.get).toBeCalledWith(`${AMMO_TEST_API_BASE_URL}/v1/products`);
    });

    it('returns correct value', () => {
      axios.get.mockReturnValue('fetch products response');
      expect(subject.fetchProducts()).toEqual('fetch products response');
    });
  });
});
