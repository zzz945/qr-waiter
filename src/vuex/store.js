import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*  status:
*   0:在获取桌牌页面，未获取桌牌
*   1:在获取桌牌页面，已获取桌牌
*   2:在点菜页面，未点菜
*   3:在点菜页面，已点菜
*   4:在提交订单页面，未提交
*   5:在提交订单页面，已提交
*/
const state = {
  isLoading: false,
  direction: 'forward',
  status: 0,
  tableid: -1,
  foodList: []
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
    UPDATE_STATUS (state, status) {
      state.status = status
    },
    UPDATE_TABLEID (state, id) {
      state.tableid = id
    },
    ADD_FOOD (state, food) {
      state.foodList.push(food)
    },
    REMOVE_FOOD (state, food) {
      state.foodList.$remove(food)
    },
    SET_FOOD_LIST (state, list) {
      state.foodList = list
    },
    PLUS_FOOD_NUM (state, idx) {
      state.foodList[idx].NUM += 1
    },
    MINUS_FOOD_NUM (state, idx) {
      if (state.foodList[idx].NUM === 1) {
        state.foodList.splice(idx, 1)
      } else {
        state.foodList[idx].NUM -= 1
      }
    },
    CHANGE_FOOD_NUM (state, param) {
      state.foodList[param.idx].NUM = param.num
    }
  }
})
