<template>
  <div>
    <p>{{ tableid }}</p>
    <br>
    <x-button @click="scanTableId">领取桌牌</x-button>
  </div>
</template>

<script>
import { Alert, Divider, XButton } from '../components'
import wx from 'we-jssdk'

export default {
  components: {
    Alert,
    Divider,
    XButton
  },
  data () {
    return {
      tableid: '?'
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
  @import '../styles/variable';

</style>