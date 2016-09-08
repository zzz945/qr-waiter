<template>
  <div class="font-color">
    <p style="text-align: center; margin: 20px;">
      <span style="font-family: 楷体, 楷体_GB2312, SimKai; font-size: 16px; color: #4F0082;">发展理念&nbsp;</span>
      <span style="font-family: 楷体, 楷体_GB2312, SimKai; font-size: 16px;">&nbsp;&nbsp;&nbsp;海纳百川,顺势而行</span>
    </p>
    <p style="margin: 20px; text-align: center;">
      <span style="font-family: 楷体, 楷体_GB2312, SimKai; font-size: 16px; color: #4F0082;">服务理念&nbsp;</span>
      <span style="font-family: 楷体, 楷体_GB2312, SimKai; font-size: 16px;">&nbsp;&nbsp;&nbsp;己所不欲,勿施于人</span>
    </p>
    <p style="margin: 20px; text-align: center;">
      <span style="font-family: 楷体, 楷体_GB2312, SimKai; font-size: 16px; color: #4F0082;">技术理念</span>
      <span style="font-family: 楷体, 楷体_GB2312, SimKai; font-size: 16px;">&nbsp; &nbsp; 大道至简,其命惟新</span>
    </p>
  </div>
</template>

<script>
import { Divider } from '../components'

export default {
  components: {
    Divider
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variable';
  .font-color {
    color: @theme-color-text;
  }
</style>