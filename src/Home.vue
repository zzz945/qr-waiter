<template>
  <view-box>
    <div class="table-card-wrap vux-center">
      <div v-show="hasTableId" transition="table-card-in" class="table-card vux-center">
        <p>{{ tableid }}号桌</p>
      </div>
    </div>
    <div slot="bottom">
      <x-button @click="scanTableId">领取桌牌</x-button>
    </div>
  </view-box>
</template>

<script>
import store from './vuex/store'
const commit = store.commit || store.dispatch
import { Alert, Divider, XButton, ViewBox } from './components'
import wx from 'we-jssdk'

export default {
  components: {
    Alert,
    Divider,
    XButton,
    ViewBox
  },
  store: store,
  data () {
    return {
      tableid: '?',
      hasTableId: true
    }
  },
  methods: {
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
            this.hasTableId = true
            commit('UPDATE_STATUS', this.status + 1)
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
    }
  }
}
</script>

<style lang="less" scoped>
  @import 'styles/index.less';
  @import './styles/variable.less';
  @import 'styles/weui/weui.less';
  @import './styles/animate.min.css';
  .table-card {
    background-color: @theme-color;
    border: 10px solid @theme-color-fuzhu;
    color: @theme-color-dianjing;
    width: 50%;
    height: 80%;
    font-weight: 500;
    font-size: 32px;
    font-family: @bizFont;
  }
  
  .table-card-wrap {
    width: 100%;
    height: 100%;
  }
  
  .table-card-in-enter {
    animation-name: bounceInLeft;
  }
  
  .table-card-in-leave {
    animation-name: bounceOutRight;
  }
</style>