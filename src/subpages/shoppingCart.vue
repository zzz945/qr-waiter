<template>
  <div class="vux-actionsheet">
    <div class="weui_mask_transition" :class="{'weui_fade_toggle': show}" :style="{display: show ? 'block' : 'none'}" @click="show=false"></div>
    <div class="weui_actionsheet" :class="{'weui_actionsheet_toggle': show}">
      <div class="weui_actionsheet_menu">
        <div class="weui_actionsheet_cell">
          <flexbox>
            <flexbox-item :span="1/2">
              <div>{{tableid}}号桌</div>
            </flexbox-item>
            <flexbox-item class="vux-center-h" :span="1/2" v-on:click="cleanShoppingCart()">
              <div>清空购物车</div>
            </flexbox-item>
        </div>
        <div class="weui_actionsheet_cell" v-for="(idx, item) in food_list">
          <flexbox>
            <flexbox-item :span="1/3">
              <div>{{ item.NAME }}</div>
            </flexbox-item>
            <flexbox-item :span="1/6">
              <div>￥{{ parseInt(item.PRICE) * item.NUM }}</div>
            </flexbox-item>
            <flexbox-item :span="1/6">
              <div v-on:click="plusFoodNum(idx)"><img src="http://tdkjgzh.applinzi.com/Public/qr-order/img/add-24.png" /></div>
            </flexbox-item>
            <flexbox-item :span="1/6">
              <div>{{ 1 * item.NUM }}</div>
            </flexbox-item>
            <flexbox-item :span="1/6">
              <div v-on:click="minusFoodNum(idx)"><img src="http://tdkjgzh.applinzi.com/Public/qr-order/img/remove-24.png" /></div>
            </flexbox-item>
          </flexbox>
        </div>
        <div style="height:60px;" class="weui_actionsheet_cell"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as actions from '../vuex/actions'
import { Flexbox, FlexboxItem } from '../components'

export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  },
  methods: {
    cleanShoppingCart () {
      this.setFoodList([])
    }
  },
  vuex: {
    getters: {
      tableid: (state) => state.tableid,
      food_list: (state) => state.foodList
    },
    actions: actions
  }
}
</script>

<style lang="less">
  @import '../styles/weui/widget/weui_tips/weui_mask';
  @import '../styles/weui/widget/weui_tips/weui_actionsheet';
  @import '../styles/index';
  .vux-actionsheet-cancel:before {
    border-top: none;
  }
</style>