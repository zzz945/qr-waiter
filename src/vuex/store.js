import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false,
  direction: 'forward',
  orderList: {},
  curOrder: {}
}
export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    },
    SET_CUR_ORDER (state, order) {
      state.curOrder = order
    },
    SET_ORDER_LIST (state, list) {
      state.orderList = list
    },
    ADD_ORDER (state, order) {
      state.orderList.push(order)
    },
    REMOVE_ORDER (state, order) {
      state.orderList.$remove(order)
    }
  }
})
