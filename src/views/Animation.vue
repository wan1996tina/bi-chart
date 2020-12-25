<template lang='pug'>
.animation
  h1 2
  newBar(v-if="this.data" :chart-data='this.data')
</template>
<script>
import newBar from '@/components/new-bar'
export default {
  components: {
    newBar
  },
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    this.data = this.$store.getters.getSports
  }
}
</script>
