import Vue from 'vue'
import Vuex from 'vuex'
import cats from '../assets/cats.json'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {},
  mutations: {
    addCat(state, cat) {
      state.cats.push(cat);
    },
    editCat(state, editedCat) {
      state.cats.forEach(function(cat, i) {
        if (cat.id == editedCat.id) state.cats[i] = editedCat;
      });
    },
    selectCat(state, cat) {
      state.selectedCat = cat.id;
    },
    unselectCat(state) {
      state.selectedCat = "";
    },
    deleteCat(state, cat) {
      let id = cat.id;
      state.cats = state.cats.filter(cat => {
        return cat.id != id;
      });
    }
  },
  state: {
    cats: cats || [],
    selectedCat: ""
  },
  getters: {
    allCats(state) {
      return state.cats;
    },
    allGenders(state) {
      let allGenders = [];
      for (let item in state.cats) {
        if (!allGenders.includes(state.cats[item].gender)) {
          allGenders.push(state.cats[item].gender);
        }
      }
      return allGenders;
    },
    allColors(state) {
      let allColors = [];
      for (let item in state.cats) {
        if (!allColors.includes(state.cats[item].color)) {
          allColors.push(state.cats[item].color);
        }
      }
      return allColors;
    },
    allBreeds(state) {
      let allBreeds = [];
      for (let item in state.cats) {
        if (!allBreeds.includes(state.cats[item].breed)) {
          allBreeds.push(state.cats[item].breed);
        }
      }
      return allBreeds;
    }
  },
  modules: {}
});
