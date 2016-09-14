<template>
  <div style="width=100%;">
    <group title="isLink is set to true when link exists">
      <cell title="Go to Radio" link="/component/radio" inline-desc='link="/component/radio"'></cell>
      <cell title="Go to Demo" :link="{path:'/demo'}" inline-desc=':link={path:"/demo"}'></cell>
      <cell title="http link" link="https://vux.li" inline-desc='link="https://vux.li"'></cell>
    </group>
  </div>
</template>
<script>

import { Group, Cell } from './components'

export default {
  components: {
    Group,
    Cell
  },
  ready () {
    // let openid = document.getElementById('arg_openid').innerHTML
    let params = {
      r_id: '11'
    }

    setTimeout(function () {
      this.$http.get('http://tdkjgzh.applinzi.com/Home/Qrorder/hasNewOrder', {params: params}).then((response) => {
        if (response.data === 'yes') {
          this.$http.get('http://tdkjgzh.applinzi.com/Home/Qrorder/getNewOrder', {params: params}).then((response) => {
            console.log('getNewOrder:' + response.data)
          }, (response) => {
            console.log('getNewOrder failed:')
            console.log(response)
          })
        }

        console.log('hasNewOrder:' + response.data)
      }, (response) => {
        console.log('hasNewOrder failed:')
        console.log(response)
      })
    }, 10000)
  }
}
</script>

<style lang="less" scoped>
  @import './styles/index.less';
  @import './styles/variable.less';
</style>