export const setTableId = ({ dispatch }, id) => dispatch('UPDATE_TABLEID', id)
export const setStatus = ({ dispatch }, status) => dispatch('UPDATE_STATUS', status)
export const addFood = ({ dispatch }, food) => dispatch('ADD_FOOD', food)
export const removeFood = ({ dispatch }, food) => dispatch('REMOVE_FOOD', food)
export const setFoodList = ({ dispatch }, list) => dispatch('SET_FOOD_LIST', list)
export const plusFoodNum = ({ dispatch }, idx) => dispatch('PLUS_FOOD_NUM', idx)
export const minusFoodNum = ({ dispatch }, idx) => dispatch('MINUS_FOOD_NUM', idx)
export const changeFoodNum = ({ dispatch }, param) => dispatch('CHANGE_FOOD_NUM', param)

