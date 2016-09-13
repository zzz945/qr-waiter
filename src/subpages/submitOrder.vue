<template>
  <div class="bd">
    <div class="wrap">
      <flexbox class="vux-1px-b">
        <flexbox-item class="vux-center-h">
          <div>{{tableid}}号桌</div>
        </flexbox-item>
      </flexbox>
      <flexbox v-for="food in food_list" class="vux-1px-b">
        <flexbox-item :span="1/2">
          <div>{{ food.NAME }}</div>
        </flexbox-item>
        <flexbox-item :span="1/4">
          <div>￥{{ parseInt(food.PRICE) * parseInt(food.NUM) }}</div>
        </flexbox-item>
        <flexbox-item :span="1/4">
          <div>{{ food.NUM }}</div>
        </flexbox-item>
      </flexbox>
    </div>
    <flexbox class="bottom-box">
      <flexbox-item class="gwc-item" :span="1/4">
        <div class="bottom-text">共￥{{totalPrice}}</div>
      </flexbox-item>
      <flexbox-item class="bottom-item" :span="1/4">
      </flexbox-item>
      <flexbox-item class="bottom-item" :span="1/6"></flexbox-item>
      <flexbox-item class="bottom-item" v-on:click="btnOk">
        <div class="ok_btn">确认下单</div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import * as actions from '../vuex/actions'
import { totalPrice } from '../vuex/getters'
import { Flexbox, FlexboxItem } from '../components'
import wx from 'we-jssdk'

export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  vuex: {
    getters: {
      tableid: (state) => state.tableid,
      food_list: (state) => state.foodList,
      totalPrice
    },
    actions: actions
  },
  methods: {
    btnOk () {
      let openId = document.getElementById('arg_openid').innerHTML
      console.log(openId)

    /*  let foodList = []
      for (let i = 0; i < this.food_list.length; i++) {
        foodList.push(JSON.stringify(this.food_list[i]))
      }*/

     /* let params = {
        open_id: open_id,
        r_id: '11',
        t_id: '55',
        food_list: this.food_list
      }*/

      // params = JSON.stringify(params_json)

      /* this.$http.get('http://tdkjgzh.applinzi.com/home/qrorder/submitOrder').then((response) => {
        var result = JSON.parse(response.data)
          console.log('submitOrder:' + response.data)
        }, (response) => {
          console.log('get http://tdkjgzh.applinzi.com/home/qrorder/submitOrder failed')
        })
      }*/

      this.$vux.alert.show({
        title: '提示',
        content: '点餐完成，努力为您筹备中，请稍候',
        onHide () {
          wx.closeWindow()
        }
      })
    },
    submitOrder () {
      console.log('submitOrder')
      this.$vux.alert.show({
        title: '提示',
        content: '点餐完成，后厨为您精心制作中，请稍候，如需加餐，请重复点餐流程',
        onHide () {
          console.log('submitOrder onHide')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../styles/index.less';
  @import '../styles/variable.less';
  .bd {
    width: 100%;
    .wrap {
      margin: 10px 10px;
    }
  }
</style>