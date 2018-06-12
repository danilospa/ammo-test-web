import ammoTestApi from '../../clients/ammoTestApi';

export default {
  state: {
    items: [],
  },
  reducers: {
    setItems: (state, payload) => Object.assign({}, state, { items: payload }),
  },
  effects: {
    async fetchProducts(_, rootState) {
      const response = await ammoTestApi.fetchProducts();
      this.setItems(response.data.products);
    },
  }
};
