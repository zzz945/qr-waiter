<template>
  <div>
    <flexbox class="vux-1px-b">
      <flexbox-item>
        <div class="table_center">{{tableid}}号桌</div>
      </flexbox-item>
    </flexbox>
    <flexbox v-for="food in food_list" class="vux-1px-b">
      <flexbox-item :span="1/2">
        <div class="table_center">{{ food.NAME }}</div>
      </flexbox-item>
      <flexbox-item :span="1/4">
        <div class="table_center vux-notice">￥{{ parseInt(food.PRICE) * parseInt(food.NUM) }}</div>
      </flexbox-item>
      <flexbox-item :span="1/4">
        <div class="table_center2">{{ food.NUM }}</div>
      </flexbox-item>
    </flexbox>
    <flexbox class="bottom-box">
      <flexbox-item class="gwc-item" :span="1/4"></flexbox-item>
      <flexbox-item class="bottom-item" :span="1/4">
        <div class="bottom-text">共￥{{totalPrice}}</div>
      </flexbox-item>
      <flexbox-item class="bottom-item" :span="1/6"></flexbox-item>
      <flexbox-item class="bottom-item">
        <a v-link="{ path: '/' }" class="ok_btn">确认下单</a>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import * as actions from '../vuex/actions'
import { totalPrice } from '../vuex/getters'
import { Flexbox, FlexboxItem } from '../components'

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

  .bottom-box {
    width: 100%;
    height: 48px;
    position: absolute;
    bottom: 0;
    z-index: 5001;
    background-color: @theme-color-fuzhu2;
    .bottom-item {
      height: 100%;
    }
    .bottom-text {
      width: 100%;
      height: 100%;
      color: #fff;
      .vux-center;
    }
    .ok_btn {
      display: block;
      width: 100%;
      height: 100%;
      background-color: @theme-color;
      .vux-center;
    }
  }
</style>