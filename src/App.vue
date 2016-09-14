<template>
  <div style="height:100%;">
    <loading :show="isLoading" text="努力" position="absolute">加载中</loading>
    <view-box v-ref:view-box>
      <swiper :list="ad_list" auto :aspect-ratio="300/800" dots-position="center"></swiper>
      <div class="step_box">
        <div class="step_title">
          <p>提示：{{prompt}}</p>
        </div>
        <step :current="orderStep" background-color='#FFFAFA'>
          <step-item title="第一步" description="领取桌牌"></step-item>
          <step-item title="第二步" description="扫码点餐"></step-item>
          <step-item title="第三步" description="提交订单"></step-item>
        </step>
      </div>
      <router-view :transition="viewTransition"></router-view>
    </view-box>
  </div>
</template>

<script>
import store from './vuex/store'
import { setStatus } from './vuex/actions'
import { Loading, ViewBox, Alert, Box, Step, StepItem, Swiper, XButton, Divider, Flexbox, FlexboxItem, XHeader, Masker } from './components'
import wx from 'we-jssdk'
import Vconsole from 'vconsole'

export default {
  components: {
    Loading,
    ViewBox,
    Alert,
    Box,
    Step,
    StepItem,
    Swiper,
    XButton,
    Divider,
    Flexbox,
    FlexboxItem,
    Vconsole,
    XHeader,
    Masker
  },
  vuex: {
    getters: {
      route: (state) => state.route,
      isLoading: (state) => state.isLoading,
      direction: (state) => state.direction,
      status: (state) => state.status
    },
    actions: {
      setStatus
    }
  },
  store: store,
  data () {
    return {
      ad_list: [
        {
          url: 'javascript:',
          img: 'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
          title: '广告位招商'
        },
        {
          url: 'javascript:',
          img: 'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
          title: '广告位招商'
        },
        {
          url: 'javascript:',
          img: 'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff',
          title: '广告位招商'
        }]
    }
  },
  computed: {
    viewTransition () {
      return this.direction === 'forward' ? 'vux-view-left' : 'vux-view-right'
    },
    orderStep () {
      if (this.status >= 4) return 2
      if (this.status >= 2) return 1
      return 0
    },
    prompt () {
      if (this.status === 0) return '请领取桌牌'
      else if (this.status === 1) return '您已获取桌牌，请进入下一步进行点餐'
      else if (this.status === 2) return '请扫码点餐'
      else if (this.status === 3) return '请继续点餐'
      else if (this.status === 4) return '请核对订单'
      else if (this.status === 5) return '您的订单已提交，后厨为您准备中，请稍等'
      else console.log('prompt error:' + this.status)
    }
  },
  ready () {
    var storage = window.localStorage
    if (!storage.getItem('pageLoadCount')) storage.setItem('pageLoadCount', 0)
    storage.pageLoadCount = parseInt(storage.getItem('pageLoadCount')) + 1
    console.log('pageLoadCount:' + storage.pageLoadCount)
    console.log('arg_openid:' + document.getElementById('arg_openid').innerHTML)

    // GET /someUrl
    this.$http.get('http://tdkjgzh.applinzi.com/home/qrorder/getSignPackage').then((response) => {
      var result = JSON.parse(response.data)
      console.log('getSignPackage:' + response.data)

      wx.config({
        debug:	false,
        appId:	result.appId,
        timestamp:	result.timestamp,
        nonceStr:	result.nonceStr,
        signature:	result.signature,
        jsApiList:	['scanQRCode', 'closeWindow']
      })

      wx.ready(() => {
        console.log('wx.ready')
      })
    }, (response) => {
      console.log('get http://tdkjgzh.applinzi.com/home/qrorder/getSignPackage failed')
    })
  }
}
</script>

<style lang="less">
  @import './styles/index.less';
  @import './styles/weui/weui.less';
  @import './styles/variable.less';
  @import './styles/animate.css';
  html,
  body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  
  body {
    background-color: @theme-color-bg;
  }
  
  .vux-title {
    vertical-align: middle;
    text-align: center;
    color: @theme-color-text;
    margin: 10px 10px 10px 10px;
  }
  
  .vux-notice {
    vertical-align: middle;
    text-align: center;
    color: @theme-color-text;
  }

  .gwc-pos {
    bottom: 12px;
    left: 12px;
    width: 60px;
    height: 48px;
    z-index: 5002;
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
      color: @theme-color-text;
      .vux-center;
    }
  }
  /**
* vue-router transition
*/
  
  .card-in-transition,
  .vux-view-left-transition,
  .vux-view-right-transition {
    width: 100%;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    backface-visibility: hidden;
  }
  
  .card-in-enter,
  .card-in-leave,
  .vux-view-left-enter,
  .vux-view-left-leave,
  .vux-view-right-enter,
  .vux-view-right-leave {
    will-change: transform;
    height: 100%;
    position: absolute;
    left: 0;
  }
  
  .card-in-enter {
    animation-name: fadeIn
  }
  
  .card-in-leave {
    animation-name: fadeOut
  }
  
  .vux-view-left-enter {
    animation-name: bounceInLeft;
  }
  
  .vux-view-left-leave {
    animation-name: bounceOutRight;
  }
  
  .vux-view-right-enter {
    perspective: 1000;
    animation-name: bounceInRight;
  }
  
  .vux-view-right-leave {
    animation-name: bounceOutLeft;
  }
</style>

<style lang="less" scoped>
  @import './styles/variable.less';
  @import './styles/index.less';
  .step_box {
    padding: 10px 30px;
    margin: 10px;
    .vux-1px-b;
  }
  
  .step_title {
    color: @theme-color-dianjing;
    margin-bottom: 20px;
    .vux-center-h;
  }
</style>