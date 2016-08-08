<template>
  <div>
    <span v-text="format(time1, 'YYYY-MM-DD')"></span>
    <br/>
    <span v-text="format(time2, 'YYYY-MM-DD HH:mm:ss')"></span>
  </div>
</template>

<script>
import { DateFormatter } from '../components'

export default {
  filters: {
    DateFormatter
  },
  methods: {
    format (time, format) {
      return DateFormatter(time, format)
    }
  },
  data () {
    return {
      time1: new Date('2016/01/03 19:19:19'),
      time2: new Date('2016-01-03 09:09:09')
    }
  }
}
</script>