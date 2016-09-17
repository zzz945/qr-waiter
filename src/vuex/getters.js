export function totalPrice (state) {
  let sum = 0
  console.log('totalPrice')
  console.log(state.curOrder.food_list)
  for (let i = 0; i < state.curOrder.food_list.length; i++) {
    sum += parseInt(state.curOrder.food_list[i].PRICE) * state.curOrder.food_list[i].NUM
  }
  return sum
}
