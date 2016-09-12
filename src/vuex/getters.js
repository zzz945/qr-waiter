export function totalPrice (state) {
  let sum = 0
  console.log('totalPrice')
  for (let i = 0; i < state.foodList.length; i++) {
    sum += parseInt(state.foodList[i].PRICE) * state.foodList[i].NUM
  }
  return sum
}
