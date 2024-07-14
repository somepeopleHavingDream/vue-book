import Vuex from 'vuex'
import book from '@/store/modules/book'
import getters from './getters'

export default new Vuex.Store({
  modules: {
    book
  },
  getters
})
