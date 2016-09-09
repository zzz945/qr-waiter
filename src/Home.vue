<template>
  <view-box>
    <div class="table-card-wrap vux-center">
      <div class="table-card vux-center" v-show="hasTableId" transition="table-card-in">
        <p>{{ tableid }}号桌</p>
      </div>
      <flexbox orient="vertical" :gutter="30" class="vux-center" v-show="!hasTableId" transition="table-card-in">
        <flexbox-item class="btn-wrap" >
          <x-button class="btn-class" v-show="showBtnGetTableCard" type="primary" @click="scanTableId">领取桌牌</x-button>
        </flexbox-item>
        <flexbox-item v-show="!hasTableId" transition="table-card-in" class="prompt vux-center">
          <p>ET提示：请点击上方领取桌牌按钮，并按提示操作，点餐过程中请勿关闭此页面，祝您用餐愉快</p>
        </flexbox-item>
      </flexbox>
    </div>
  </view-box>
</template>
<script>
import store from './vuex/store'
const commit = store.commit || store.dispatch
import { Alert, Divider, XButton, ViewBox, Flexbox, FlexboxItem } from './components'
import wx from 'we-jssdk'

export default {
  components: {
    Alert,
    Divider,
    XButton,
    ViewBox,
    Flexbox,
    FlexboxItem
  },
  store: store,
  vuex: {
    getters: {
      status: (state) => state.status
    }
  },
  data () {
    return {
      tableid: '?',
      hasTableId: false
    }
  },
  computed: {
    showBtnGetTableCard () {
      if (this.status === 0) return true
      else return false
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
    border: 5px solid @theme-color-fuzhu;
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
  
  .prompt {
    font-family: @bizFont;
    color: @theme-color-dianjing;
    width: 50%;
  }
  
  .btn-class {
    border-radius: 100%;
    background-color: @theme-color-dianjing;
    width: 100%;
    height: 100%;
    &:after {
      border: 0px solid rgba(0, 0, 0, .2);
    }
  }
  
  .btn-wrap {
    width: 200px;
    height: 200px;
  }
</style>