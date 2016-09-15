<template>
  <div style="width=100%;">
    <group title="有新订单了" v-for="order in order_list">
      <cell :title="order.r_id" link="/component/radio" :inline-desc='order.t_id'></cell>
    </group>
  </div>
</template>
<script>

import { Group, Cell } from './components'

const myarray = [
  {
    openid: 'oRcn4wF1K1KZc_eELqveTXpKTNuQ',
    r_id: '11'
  }
]

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      myarray: myarray,
      order_list: []
    }
  },
  ready () {
    let openid = document.getElementById('arg_openid').innerHTML
    let rId
    for (let i = 0; i < this.myarray.length; i++) {
      if (openid === myarray[i].openid) {
        rId = myarray[i].r_id
      }
    }

    let params = {
      r_id: rId
    }

    let _this = this
    setTimeout(function () {
      _this.$http.get('http://tdkjgzh.applinzi.com/Home/Qrorder/hasNewOrder', {params: params}).then((response) => {
        if (response.data === 'yes') {
          _this.$http.get('http://tdkjgzh.applinzi.com/Home/Qrorder/getNewOrder', {params: params}).then((response) => {
            console.log('getNewOrder:')
            console.log(response.data)
            let strList = JSON.parse(response.data)
            for (let i = 0; i < strList.length; i++) {
              let order = {}
              order.openid = strList[i].openid
              order.r_id = strList[i].r_id
              order.t_id = strList[i].t_id
              order.food_list = JSON.parse(strList[i].food_list)
              _this.order_list.push(order)
            }
            console.log('this.order_list:')
            console.log(_this.order_list)
          }, (response) => {
            console.log('getNewOrder failed:')
            console.log(response)
          })
        }

        console.log('hasNewOrder:' + response.data)
      }, (response) => {
        console.log('hasNewOrder failed:')
        console.log(response)
      })
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
  @import './styles/index.less';
  @import './styles/variable.less';
</style>