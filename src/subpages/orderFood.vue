<template>
<div>
  <div>
    <box gap="10px 10px">
      <flexbox :gutter="20">
        <flexbox-item>
          <x-button @click="scanTableId" plain type="primary">绑定餐桌</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button @click="scanFoodId" :disabled="disableBtnOrder" :plain="!disableBtnOrder" :type="btnOrderType">继续点餐</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button @click="submitOrder" :disabled="disableBtnSubmit" :plain="!disableBtnSubmit" :type="btnSubmitType">提交订单</x-button>
        </flexbox-item>
      </flexbox>
    </box>
    <divider>我的点餐</divider>
    <flexbox class="vux-1px-tb" :gutter="0">
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="table_center">餐桌编号</div></flexbox-item>
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="table_center vux-notice">{{tableid}}</div></flexbox-item>
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="table_center">订单总价(￥)</div></flexbox-item>
      <flexbox-item :span="1/4"><div class="table_center vux-notice">{{totle_price}}</div></flexbox-item>
    </flexbox>
    <flexbox class="vux-1px-tb" :gutter="0">
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="table_center">菜名</div></flexbox-item>
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="table_center">价格</div></flexbox-item>
      <flexbox-item :span="1/2"><div class="table_center">数量</div></flexbox-item>
    </flexbox>
    <flexbox v-for="food in food_list" class="vux-1px-tb" :gutter="0">
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="table_center">{{ food.NAME }}</div></flexbox-item>
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="table_center vux-notice">{{ parseInt(food.PRICE) * parseInt(food.NUM) }}</div></flexbox-item>
      <flexbox-item :span="1/6"><div class="table_center" v-on:click="plusFoodNum(food)"><img class="img-pos" :src="img_plus"/></div></flexbox-item>
      <flexbox-item :span="1/6"><div class="table_center2">{{ food.NUM }}</div></flexbox-item>
      <flexbox-item :span="1/6"><div class="table_center" v-on:click="minusFoodNum(food)"><img class="img-pos" :src="img_minus"/></div></flexbox-item>
    </flexbox>
  </div>
  <!--bottom-->
</div>
</template>

<script>
import { Alert, Box, Step, StepItem, Swiper, XButton, Divider, Cell, Group, Flexbox, FlexboxItem } from '../components'
import wx from 'we-jssdk'

export default {
  components: {
    Alert,
    Box,
    Step,
    StepItem,
    Swiper,
    XButton,
    Divider,
    Cell,
    Group,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      order_step: 0,
      tableid: '无',
      totle_price: 0,
      food_list: [],
      disableBtnOrder: true,
      disableBtnSubmit: true,
      btnOrderType: 'default',
      btnSubmitType: 'default',
      img_minus: 'http://tdkjgzh.applinzi.com/Public/qr-order/img/remove-24.png',
      img_plus: 'http://tdkjgzh.applinzi.com/Public/qr-order/img/add-24.png'
    }
  },
  methods: {
    submitOrder () {
      console.log('submitOrder')
      this.order_step = 3
      this.$vux.alert.show({
        title: '提示',
        content: '点餐完成，后厨为您精心制作中，请稍候，如需加餐，请重复点餐流程',
        onHide () {
          console.log('submitOrder onHide')
        }
      })
    },
    plusFoodNum (food) {
      food.NUM = food.NUM + 1
      this.totle_price = this.totle_price + parseInt(food.PRICE)
    },
    minusFoodNum (food) {
      food.NUM = food.NUM - 1
      this.totle_price = this.totle_price - parseInt(food.PRICE)
      if (food.NUM === 0) {
        this.food_list.$remove(food)
        console.log(this.food_list)
      }
    },
    scanTableId () {
      let _this = this
      _this.$vux.alert.show({
        title: '提示',
        content: '请扫描桌角二维码',
        onHide () {
          _this._scanTableId(_this)
        }
      })
    },
    _scanTableId (_this) {
      wx.scanQRCode({
        needResult:	1,
        scanType: ['qrCode', 'barCode'],
        success: (res) => {
          try {
            var result = JSON.parse(res.resultStr)
            if (result.TABLE_ID === undefined) {
              throw new Error('TABLE_ID is undefined')
            }
            _this.tableid = result.TABLE_ID
            _this.order_step = 1
            _this.disableBtnOrder = false
            _this.btnOrderType = 'primary'
          } catch (e) {
            console.log('_scanTableId:' + e)
            _this.$vux.alert.show({
              title: '提示',
              content: '餐桌二维码错误，请扫描桌角二维码',
              onHide () {
                _this._scanTableId(_this)
              }
            })
          }
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
            _this.food_list.push(result)
            _this.totle_price = this.totle_price + parseInt(result.PRICE)
            _this.order_step = 2
            _this.disableBtnSubmit = false
            _this.btnSubmitType = 'primary'
            console.log('_this.totle_price:' + _this.totle_price)
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
  }
}
</script>

<style scoped>
.table_center2 {
  text-align: center;
  margin:8px 0px 8px 0px;
  color: @theme-color-dianjing;
}
.table_center {
  text-align: center;
  margin:8px 0px 8px 0px;
}
.bottom-pos {
  width: 100%;
  position: absolute;
  bottom: 5px;
}
.img-pos {
  vertical-align:middle;
}
</style>
