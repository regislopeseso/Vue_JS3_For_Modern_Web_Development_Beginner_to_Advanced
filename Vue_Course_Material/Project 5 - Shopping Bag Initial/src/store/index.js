import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [1, 2, 3],
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products;
    }
  },
  actions: {
    loadProducts( commmit ) {    
      axios.get('https://fakestoreapi.com/products')
        .then(response => {
          commmit('loadProducts', response.data);
        })        
    },
  },
  modules: {
  }
})
