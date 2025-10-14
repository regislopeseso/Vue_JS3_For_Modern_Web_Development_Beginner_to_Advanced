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

    loadBag(state, products) {
      state.productsInBag = products;
    },


    addToBag(state, product) {
      state.productsInBag.push(product);

      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));
    },

    removeFromBag(state, productId) {
      const i = state.productsInBag.findIndex(item => item.id == productId);
      if (i !== -1) state.productsInBag.splice(i, 1);

      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));

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

    loadBag( {commit} ) {     
      if(localStorage.getItem('productsInBag'))
      {
        commit('loadBag', JSON.parse(localStorage.getItem('productsInBag')));
      }         
    },

    addToBag( {commit}, product ) {
      commit('addToBag', product);
    },

    removeFromBag( {commit}, productId){
      if(confirm('Are you sure you want to remove the item?'))
      {
        commit ('removeFromBag', productId);
      }
    },
  },
  modules: {
  }
})
