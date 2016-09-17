<template>
  <div style="height:100%;">
    <loading :show="isLoading" text="努力" position="absolute">加载中</loading>
    <div class="title">
      <p>ET智慧餐厅前台</p>
    </div>
    <router-view :transition="viewTransition"></router-view>
  </div>
</template>

<script>
import store from './vuex/store'
import { Loading } from './components'
import Vconsole from 'vconsole'

export default {
  components: {
    Loading,
    Vconsole
  },
  vuex: {
    getters: {
      route: (state) => state.route,
      isLoading: (state) => state.isLoading,
      direction: (state) => state.direction
    }
  },
  store: store,
  computed: {
    viewTransition () {
      return this.direction === 'forward' ? 'vux-view-left' : 'vux-view-right'
    }
  }
}
</script>

<style lang="less">
  @import './styles/index.less';
  @import './styles/variable.less';
  @import './styles/weui/weui.less';
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
    color: @theme-color-fuzhu2;
    margin: 10px 10px 10px 10px;
  }
  
  .vux-notice {
    vertical-align: middle;
    text-align: center;
    color: @theme-color-text;
  }
  
  .title {
    width: 100%;
    padding: 10px 0px;
    .vux-center;
    p {
      color: @theme-color-dianjing;
      font-weight: 500;
      font-size: 24px;
      font-family: @bizFont;
    }
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