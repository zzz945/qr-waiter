<template>
  <div style="width=100%;">
    <group title="food list">
      <cell title="Go to Radio" link="/component/radio" inline-desc='link="/component/radio"'></cell>
      <cell title="Go to Demo" :link="{path:'/demo'}" inline-desc=':link={path:"/demo"}'></cell>
      <cell title="http link" link="https://vux.li" inline-desc='link="https://vux.li"'></cell>
    </group>
  </div>
</template>
<script>

import { Group, Cell } from '../components'

export default {
  components: {
    Group,
    Cell
  },
  ready () {
  }
}
</script>

<style lang="less" scoped>
  @import '../styles/index.less';
  @import '../styles/variable.less';
</style>