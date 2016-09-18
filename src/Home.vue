<template>
  <div style="width=100%;">
    <div>
      <div class="round-btn">
        <x-button class="round-btn-class" type="primary" @click="scanTableId">加水</x-button>
      </div>
      <div class="round-btn">
        <x-button class="round-btn-class" type="primary" @click="scanTableId">加餐</x-button>
      </div>
      <div class="round-btn">
        <x-button class="round-btn-class" type="primary" @click="scanTableId">买单</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import { XButton } from './components'

export default {
  components: {
    XButton
  },
  methods: {
  },
  ready () {
  }
}
</script>

<style lang="less" scoped>
  @import './styles/index.less';
  @import './styles/variable.less';
  .round-btn {
    width: 30vmin;
    height: 30vmin;
    display: inline-block;
    .round-btn-class {
      border-radius: 100%;
      width: 100%;
      height: 100%;
      &:after {
        border-radius: 100%;
      }
    }
  }
</style>