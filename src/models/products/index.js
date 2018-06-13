import ammoTestApi from '../../clients/ammoTestApi';

export default {
  state: {
    items: [],
    pages: 1,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    searchTerm: '',
    loading: false,
  },
  reducers: {
    setState: (state, payload) => Object.assign({}, state, payload),
    startLoading: (state, payload) => Object.assign({}, state, { loading: true }),
    stopLoading: (state, payload) => Object.assign({}, state, { loading: false }),
  },
  effects: {
    async fetchProducts(payload = {}, rootState) {
      const pageSize = payload.pageSize || rootState.products.pageSize;
      const page = payload.page || rootState.products.currentPage;
      const searchTerm = payload.searchTerm === undefined
        ? rootState.products.searchTerm
        : payload.searchTerm;
      this.startLoading();
      const response = await ammoTestApi.fetchProducts({ searchTerm, pageSize, page });
      this.setState({
        items: response.data.products,
        pages: response.data.pages,
        total: response.data.total,
        pageSize: pageSize,
        currentPage: page,
        searchTerm: searchTerm,
      });
      this.stopLoading();
    },
  }
};
