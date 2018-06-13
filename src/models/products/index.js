import ammoTestApi from '../../clients/ammoTestApi';

export default {
  state: {
    items: [],
    pages: 0,
    currentPage: 1,
  },
  reducers: {
    setItems: (state, payload) => Object.assign({}, state, { items: payload }),
    setPages: (state, payload) => Object.assign({}, state, { pages: payload }),
    setCurrentPage: (state, payload) => Object.assign({}, state, { currentPage: payload }),
  },
  effects: {
    async fetchProducts(payload = {}) {
      const response = await ammoTestApi.fetchProducts(payload);
      this.setItems(response.data.products);
      this.setPages(response.data.pages);
      this.setCurrentPage(payload.page || 1);
    },
  }
};
