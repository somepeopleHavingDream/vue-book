import Vuex from 'vuex'
import book from '@/store/modules/book'
import getters from './getters'
import actions from './actions'

export default new Vuex.Store({
  modules: {
    book
  },
  getters,
  actions
})
