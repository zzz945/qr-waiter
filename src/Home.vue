<template>
  <div style="width=100%;">
    <div class="table-card-pos" v-show="hasTableId" transition="card-in">
      <div class="table-card">
        <p>{{ tableid }}号桌</p>
      </div>
    </div>
    <div class="get-card-pos" v-show="!hasTableId">
      <div class="round-btn-wrap">
        <x-button class="round-btn-class" type="primary" @click="scanTableId">领取桌牌</x-button>
      </div>
    </div>
    <div class="footer_box">
      <x-button class="next_btn" @click="btnNext" :disabled="btnNextDisabled">下一步</x-button>
    </div>
  </div>
</template>
<script>
import * as actions from './vuex/actions'
import { Alert, Divider, XButton, ViewBox, Flexbox, FlexboxItem, Badge } from './components'
import wx from 'we-jssdk'

export default {
  components: {
    Alert,
    Divider,
    XButton,
    ViewBox,
    Badge,
    Flexbox,
    FlexboxItem
  },
  vuex: {
    getters: {
      status: (state) => state.status,
      tableid: (state) => state.tableid
    },
    actions: actions
  },
  data () {
    return {
    }
  },
  computed: {
    hasTableId () {
      if (this.tableid === -1) return false
      else return true
    },
    btnNextDisabled () {
      if (this.status === 0) return true
      else return false
    }
  },
  ready () {
    if (this.status !== 0) this.setStatus(1)
  },
  methods: {
    btnNext () {
      this.setStatus(2)
      this.$route.router.go('/subpages/orderFood')
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
            this.setStatus(1)
            this.setTableId(result.TABLE_ID)
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
  @import './styles/index.less';
  @import './styles/variable.less';
  @import './styles/weui/weui.less';
  .table-card-pos {
    margin-top: 20px;
    .vux-center;
    .table-card {
      background-color: @theme-color;
      border: 5px solid @theme-color-fuzhu;
      color: @theme-color-fuzhu;
      width: 100px;
      height: 200px;
      font-weight: 500;
      font-size: 24px;
      font-family: @bizFont;
      .vux-center;
    }
  }
  
  .get-card-pos {
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
  
  .footer_box {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    .next_btn {
      width: 100%;
      height: 100%;
      border-radius: 0;
      &:after {
        border-radius: 0;
      }
    }
  }
</style>