<template>
  <div style="height:100%;">
    <loading :show="isLoading" text="努力" position="absolute">加载中</loading>
    <view-box v-ref:view-box>
      <div slot="header">
        <div>
          <swiper :list="ad_list" auto :aspect-ratio="300/800" dots-position="center"></swiper>
          <divider>点餐流程</divider>
          <box gap="0px 30px">
            <step :current.sync="order_step" background-color='#fbf9fe' gutter="20px">
              <step-item title="获取桌牌"></step-item>
              <step-item title="扫码点菜"></step-item>
              <step-item title="提交订单"></step-item>
            </step>
          </box>
        </div>
      </div>
      <router-view></router-view>
      <div slot="bottom">
        <x-button @click="btnNext" v-show="showBtnNext" :disabled="btnNextDisabled">下一步</x-button>
        <x-button @click="btnBack" :disabled="btnBackDisabled">返回</x-button>
      </div>
    </view-box>
  </div>
</template>

<script>
import store from './vuex/store'
const commit = store.commit || store.dispatch
import { Loading, ViewBox, Alert, Box, Step, StepItem, Swiper, XButton, Divider, Flexbox, FlexboxItem } from './components'
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
    Vconsole
  },
  store: store,
  vuex: {
    getters: {
      route: (state) => state.route,
      isLoading: (state) => state.isLoading,
      direction: (state) => state.direction,
      status: (state) => state.status,
      btnBackDisabled: (state) => state.btnBackDisabled,
      btnNextDisabled: (state) => state.btnNextDisabled
    }
  },
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
    btnBackDisabled () {
      if (this.status === 0) return true
      else return false
    },
    btnNextDisabled () {
      if (this.status === 1 || this.status === 3) return false
      else return true
    },
    showBtnNext () {
      if (this.status === 4 || this.status === 5) return false
      else return true
    }
  },
  methods: {
    btnBack () {
      commit('UPDATE_STATUS', this.status - 1)
      this.go()
    },
    btnNext () {
      commit('UPDATE_STATUS', this.status + 1)
      this.go()
    },
    go () {
      if (this.status === 0) {
        this.$route.router.go('/')
      } else if (this.status === 1) {
        this.$route.router.go('/subpages/orderFood')
      } else if (this.status === 2) {
        this.$route.router.go('/subpages/submitOrder')
      } else {
        console.log('unknoew status:' + this.status)
      }
      console.log('go () status:' + this.status)
    }
  },
  ready () {
    // GET /someUrl
    this.$http.get('http://tdkjgzh.applinzi.com/home/qrorder/getSignPackage').then((response) => {
      var result = JSON.parse(response.data)
      console.log('getSignPackage:' + response.data)

      wx.config({
        debug:	true,
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
      console.log('get http://tdkjgzh.applinzi.com/home/qrorder/getSignPackage failed')
    })
  }
}
</script>

<style lang="less">
  @import 'styles/index.less';
  @import 'styles/weui/weui.less';
  @import './styles/variable.less';
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
  /**
* vue-router transition
*/
  
  .vux-view-left-transition,
  .vux-view-right-transition {
    width: 100%;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    backface-visibility: hidden;
  }
  
  .vux-view-left-enter,
  .vux-view-left-leave,
  .vux-view-right-enter,
  .vux-view-right-leave {
    will-change: transform;
    height: 100%;
    position: absolute;
    left: 0;
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