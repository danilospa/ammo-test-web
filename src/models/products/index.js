import ammoTestApi from '../../clients/ammoTestApi';

export default {
  state: {
    items: [],
    pages: 1,
    currentPage: 1,
    pageSize: 10,
  },
  reducers: {
    setState: (state, payload) => Object.assign({}, state, payload),
  },
  effects: {
    async fetchProducts(payload = {}, rootState) {
      const pageSize = payload.pageSize || rootState.products.pageSize;
      const page = payload.page || rootState.products.currentPage;
      const response = await ammoTestApi.fetchProducts({ pageSize, page });
      this.setState({
        items: response.data.products,
        pages: response.data.pages,
        pageSize: pageSize,
        currentPage: page,
      });
    },
  }
};
