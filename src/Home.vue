<template>
  <div style="width=100%;">
    <divider v-show="this.tId === ''">未绑定桌牌号</divider>
    <divider v-show="this.tId !== ''">{{tId}}号桌</divider>
    <div>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('茶水')">茶水</div>
      </a>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('催一催')">催一催</div>
      </a>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('上主食')">上主食</div>
      </a>
    </div>
    <div>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('再来啤酒')">再来啤酒</div>
      </a>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('再来白酒')">再来白酒</div>
      </a>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('热菜')">热菜</div>
      </a>
    </div>
    <div>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('加个菜')">加个菜</div>
      </a>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('火锅加汤')">火锅加汤</div>
      </a>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('烧烤换纸')">烧烤换纸</div>
      </a>
    </div>
    <div>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('瓶起子')">瓶起子</div>
      </a>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('餐具不够')">餐具不够</div>
      </a>
      <a class="round-btn-box">
        <div class="round-btn" v-on:click="sendMsg('叫服务员')">叫服务员</div>
      </a>
    </div>
  </div>
</template>
<script>
import { Divider } from './components'
import wx from 'we-jssdk'

export default {
  components: {
    Divider
  },
  data () {
    return {
      tId: '',
      rId: '',
      msg: ''
    }
  },
  methods: {
    sendMsg (msg) {
      console.log('sendMsg:' + msg)
      this.msg = msg
      if (this.tId === '') {
        this.scanTableId()
      } else {
        this._sendMsg(this)
      }
    },
    _sendMsg (_this) {
      let params = {
        r_id: _this.rId,
        t_id: _this.tId,
        type: _this.msg
      }
      _this.$http.get('http://tdkjgzh.applinzi.com/home/qrorder/addNewMsg', {params: params}).then((response) => {
        _this.$vux.alert.show({
          title: '提示',
          content: '您的消息已发送到前台，请稍等',
          onHide () {
          }
        })
        console.log('addMsg:' + response.data)
      }, (response) => {
        console.log('addMsg failed')
        console.log(params)
        console.log(response)
      })
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
            _this.tId = result.TABLE_ID
            _this.rId = result.RESTAURANT_ID
            _this._sendMsg(_this)
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
  },
  ready () {
    // GET /someUrl
    this.$http.get('http://tdkjgzh.applinzi.com/home/qrwaiter/getSignPackage').then((response) => {
      var result = JSON.parse(response.data)
      console.log('getSignPackage:' + response.data)

      wx.config({
        debug:	false,
        appId:	result.appId,
        timestamp:	result.timestamp,
        nonceStr:	result.nonceStr,
        signature:	result.signature,
        jsApiList:	['scanQRCode']
      })

      wx.ready(() => {
        console.log('wx.ready')
      })
    }, (response) => {
      console.log('get http://tdkjgzh.applinzi.com/home/qrwaiter/getSignPackage failed')
    })
  }
}
</script>

<style lang="less" scoped>
  @import './styles/index.less';
  @import './styles/variable.less';
  .round-btn-box {
    float: left;
    .round-btn {
      border-radius: 100%;
      width: 100%;
      height: 100%;
      width: 24vmin;
      height: 24vmin;
      background-color: @theme-color;
      .vux-center;
      margin-left: 7vmin;
      margin-top: 7vmin;
    }
  }
</style>