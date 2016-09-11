<template>
  <div style="width=100%;">
    <div class="round-btn-pos">
      <div class="round-btn-wrap">
        <x-button class="round-btn-class" type="primary" @click="scanFoodId">扫码点餐</x-button>
      </div>
    </div>
    <flexbox class="bottom-box" v-show="!is_empty">
      <flexbox-item class="gwc-item" :span="1/4"></flexbox-item>
      <flexbox-item class="bottom-item" :span="1/4">
        <div class="bottom-text">共￥{{total_price}}</div>
      </flexbox-item>
      <flexbox-item class="bottom-item" :span="1/6"></flexbox-item>
      <flexbox-item class="bottom-item">
        <div class="ok_btn">点好了</div>
      </flexbox-item>
    </flexbox>
    <flexbox class="bottom-box" v-show="is_empty">
      <flexbox-item class="bottom-item" :span="1/4"></flexbox-item>
      <flexbox-item class="bottom-item" :span="1/2">
        <p class="bottom-text">购物车是空的</p>
      </flexbox-item>
      <flexbox-item class="bottom-item" :span="1/4"></flexbox-item>
    </flexbox>
    <div class="gwc-pos" v-show="!is_empty">
      <a v-link="{ path: '/subpages/submitOrder' }">
        <img src="http://tdkjgzh.applinzi.com/Public/qr-order/img/gwc.png" />
        <sup><badge :text="food_count"></badge></sup>
      </a>
    </div>
    <div class="gwc-pos" v-show="is_empty">
      <a>
        <img src="http://tdkjgzh.applinzi.com/Public/qr-order/img/gwc2.png" />
      </a>
    </div>
    <confirm :show.sync="show_confirm" :title="confirm_title" confirm-text="确定" cancel-text="取消" @on-cancel="onCancel" @on-confirm="onConfirm"
      @on-show="onShow" @on-hide="onHide">
      <flexbox>
        <flexbox-item class="bottom_item" :span="1/4">
          <div>￥{{ parseInt(this.food.PRICE) * this.food.NUM }}</div>
        </flexbox-item>
        <flexbox-item class="bottom_item" :span="1/4">
          <div v-on:click="plusFoodNum"><img src="http://tdkjgzh.applinzi.com/Public/qr-order/img/add-24.png" /></div>
        </flexbox-item>
        <flexbox-item class="bottom_item" :span="1/4">
          <div>{{ 1 * this.food.NUM }}</div>
        </flexbox-item>
        <flexbox-item class="bottom_item" :span="1/4">
          <div v-on:click="minusFoodNum"><img src="http://tdkjgzh.applinzi.com/Public/qr-order/img/remove-24.png" /></div>
        </flexbox-item>
      </flexbox>
    </confirm>
  </div>
</template>

<script>
import * as actions from '../vuex/actions'
import { XButton, Badge, Flexbox, FlexboxItem, Confirm } from '../components'
import wx from 'we-jssdk'

export default {
  components: {
    XButton,
    Badge,
    Flexbox,
    FlexboxItem,
    Confirm
  },
  vuex: {
    getters: {
      status: (state) => state.status,
      tableid: (state) => state.tableid,
      food_list: (state) => state.foodList
    },
    actions: actions
  },
  data () {
    return {
      food: {},
      show_confirm: false
    }
  },
  computed: {
    total_price: function () {
      let sum = 0
      for (let i = 0; i < this.food_list.length; i++) {
        sum += parseInt(this.food_list[i].PRICE) * this.food_list[i].NUM
      }
      return sum
    },
    food_count: function () {
      return this.food_list.length
    },
    is_empty: function () {
      if (this.food_list.length === 0) return true
      else return false
    },
    confirm_title: function () {
      return this.food.NAME
    }
  },
  methods: {
    onConfirm () {
      if (this.food.NUM !== 0) {
        this.addFood(this.food)
        this.setStatus(3)
        console.log('onConfirm')
        console.log(this.food)
      }
    },
    onCancel () {
      console.log('on cancel')
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    plusFoodNum () {
      this.food.NUM = this.food.NUM + 1
    },
    minusFoodNum () {
      if (this.food.NUM !== 0) {
        this.food.NUM = this.food.NUM - 1
      }
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
    },
    scanFoodId () {
      let _this = this
      _this.$vux.alert.show({
        title: '提示',
        content: '请扫描菜单二维码点餐',
        onHide () {
          _this._scanFoodId(_this)
        }
      })
    },
    _scanFoodId (_this) {
      wx.scanQRCode({
        needResult:	1,
        scanType: ['qrCode', 'barCode'],
        success: (res) => {
          try {
            let result = JSON.parse(res.resultStr)
            if (result.ID === undefined) {
              throw new Error('Food ID is undefined')
            }
            result['NUM'] = 1
            this.food = result
            this.show_confirm = true
          } catch (e) {
            console.log('_scanFoodId:' + e)
            _this.$vux.alert.show({
              title: '提示',
              content: '菜品二维码错误，请扫菜单二维码'
            })
          }
        }
      })
    }
  },
  ready () {
    if (this.food_list.length === 0) this.setStatus(2)
    else this.setStatus(3)
  }
}
</script>

<style lang="less" scoped>
  @import '../styles/index.less';
  @import '../styles/variable.less';
  @import '../styles/weui/weui.less';
  .round-btn-pos {
    margin-top: 40px;
    .vux-center-h;
    .round-btn-wrap {
      width: 100px;
      height: 100px;
      .round-btn-class {
        border-radius: 100%;
        width: 100%;
        height: 100%;
        &:after {
          border-radius: 100%;
        }
      }
    }
  }
  
  .gwc-pos {
    bottom: 12px;
    left: 12px;
    width: 60px;
    height: 48px;
    position: absolute;
    a {
      line-height: 0;
      font-size: 0;
    }
  }
  
  .bottom-box {
    width: 100%;
    height: 48px;
    position: absolute;
    bottom: 0;
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
      width: 100%;
      height: 100%;
      background-color: @theme-color;
      .vux-center;
    }
  }
</style>