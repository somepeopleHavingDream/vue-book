import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    test: 1
  },
  mutations: {
    // 'SET_TEST': (state, newTest) => {
    //   state.test = newTest
    // }
  },
  actions: {
    setTest: ({ commit, state }, newTest) => {
      console.log(state.test, newTest)
    }
  }
})
