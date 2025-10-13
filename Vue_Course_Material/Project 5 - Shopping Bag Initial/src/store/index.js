import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {    
    loadProducts(state, products) {
      state.products = products;
    },

    addToBag(state, product) {
      state.productsInBag.push(product);
    },

    removeFromBag(state, productId) {
      const i = state.productsInBag.findIndex(item => item.id == productId);
      if (i !== -1) state.productsInBag.splice(i, 1);

      // Alteranatively:
      // var updatedBag = state.productsInBag.filter(item => item.id != productId);
      // state.productsInBag = updatedBag;
    }
  },
  actions: {
    loadProducts( {commit} ) {    
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          commit('loadProducts', response.data);
        })        
    },

    addToBag( {commit}, product ) {
      commit('addToBag', product);
    },

    removeFromBag( {commit}, productId){
      commit ('removeFromBag', productId);
    },
  },
  modules: {
  }
})
