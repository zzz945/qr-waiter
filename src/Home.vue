<template>
<view-box v-ref:view-box>
  <!--header slot-->
  <div class="center" slot="header">
    <svg style="width:60px;height:60px;" version="1.1" id="图形" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1024px" height="1024px" viewBox="0 0 1024 1024" enable-background="new 0 0 1024 1024" xml:space="preserve"><path class="svgpath" data-index="path_0" fill="#35495e" d="M512 816.64 51.2 985.6l460.8-947.2 460.8 947.2L512 816.64 512 816.64zM509.44 207.36 189.44 862.72l317.44-117.76L506.88 207.36 509.44 207.36zM509.44 207.36" /></svg>

    <h1 class="vux-title" style="display:none;">
      <span class="demo-icon" slot="icon" style="font-size:60px;color:#35495e;display: block;">&#xe637;</span>
    </h1>
    <p class="vux-notice">ET智能点餐v{{version}}</p>
  </div>
  <!--default slot-->
  <div>
    <flexbox class="vux-1px-tb" :gutter="0">
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="header-font">餐桌编号</div></flexbox-item>
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="header-font">{{tableid}}</div></flexbox-item>
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="header-font">订单总价(￥)</div></flexbox-item>
      <flexbox-item :span="1/4"><div class="header-font">{{totle_price}}</div></flexbox-item>
    </flexbox>
    <divider>我的点餐</divider>
    <flexbox class="vux-1px-tb" :gutter="0">
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="header-font">菜名</div></flexbox-item>
      <flexbox-item class="vux-1px-r" :span="1/4"><div class="header-font">价格</div></flexbox-item>
      <flexbox-item :span="1/2"><div class="header-font">数量</div></flexbox-item>
    </flexbox>
    <divider>END</divider>
  </div>
  <!--bottom slot-->
  <flexbox slot="bottom">
    <flexbox-item>
      <x-button type="primary">绑定餐桌</x-button>
    </flexbox-item>
    <flexbox-item>
      <x-button type="primary">提交订单</x-button>
    </flexbox-item>
    <flexbox-item>
      <x-button type="primary">取消订单</x-button>
    </flexbox-item>
  </flexbox>
</view-box>
</template>

<script>
import { Alert, XButton, Divider, Cell, Group, Flexbox, FlexboxItem } from './components'
import wx from 'we-jssdk'
import vConsole from 'vconsole'

const version = require('../package.json').version
export default {
  components: {
    Alert,
    XButton,
    Divider,
    Cell,
    Group,
    Flexbox,
    FlexboxItem,
    vConsole
  },
  data () {
    return {
      version: version,
      appid: '',
      tableid: '无',
      totle_price: 0,
      alert_show: 'false',
      alert_content: 'test'
    }
  },
  methods: {
    scanTableId () {
      wx.scanQRCode({
        needResult:	1,
        scanType: ['qrCode', 'barCode'],
        success: (res) => {
          try {
            var result = JSON.parse(res.resultStr)
            if (result && result.APPID === this.appid) {
              this.tableid = result.TABLE_ID
              let _this = this
              this.$vux.alert.show({
                title: '提示',
                content: '您的餐桌编号为' + this.tableid + ', 请扫描菜单二维码点餐',
                onHide () {
                  _this.scanFoodId()
                }
              })
            } else {
              let _this = this
              this.$vux.alert.show({
                title: '提示',
                content: '餐桌二维码错误，请扫描桌角二维码',
                onHide () {
                  _this.scanTableId()
                }
              })
            }
          } catch (e) {
            let _this = this
            this.$vux.alert.show({
              title: '提示',
              content: '餐桌二维码错误，请扫描桌角二维码',
              onHide () {
                _this.scanTableId()
              }
            })
          }
        }
      })
    },
    scanFoodId () {
      console.log('_this.scanFoodId()')
      wx.scanQRCode({
        needResult:	1,
        scanType: ['qrCode', 'barCode'],
        success: (res) => {
          try {
            let result = JSON.parse(res.resultStr)
            if (result) {
              this.totle_price = this.totle_price + parseInt(result.price)
              console.log('this.totle_price:' + this.totle_price)
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: '菜品二维码错误，请扫菜单二维码'
              })
            }
          } catch (e) {
            this.$vux.alert.show({
              title: '提示',
              content: '菜品二维码错误，请扫菜单二维码'
            })
          }
        }
      })
    }
  },
  ready () {
    // GET /someUrl
    this.$http.get('http://tdkjgzh.applinzi.com/home/qrorder/getSignPackage').then((response) => {
      var result = JSON.parse(response.data)
      console.log('getSignPackage:' + response.data)
      this.appid = result.appId

      wx.config({
        debug:	true,
        appId:	this.appid,
        timestamp:	result.timestamp,
        nonceStr:	result.nonceStr,
        signature:	result.signature,
        jsApiList:	['scanQRCode']
      })

      wx.ready(() => {
        let _this = this
        this.$vux.alert.show({
          title: '提示',
          content: '请扫描桌角二维码',
          onHide () {
            _this.scanTableId()
          }
        })
      })
    }, (response) => {
      console.log('get http://tdkjgzh.applinzi.com/home/qrorder/getSignPackage failed')
    })
  }
}
</script>

<style>
@import './demos/style.css';
.center {
  margin-top: 15px;
  text-align: center;
}
.header-font {
  text-align: center;
}
.vux-notice {
  color: #666;
  line-height: 40px;
}
.vux-title {
  vertical-align: middle;
  text-align: center;
  color: #04BE02;
  display: inline-block;
  width: 75px;
  height: 75px;
  line-height: 75px;
  border-radius: 50%;
}
body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
}
</style>
