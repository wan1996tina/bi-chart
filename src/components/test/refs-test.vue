<template lang="pug">
div(ref='div')
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {

    }
  },
  props: {
    bgColor: String
  },
  mounted () {
    this.call()
  },
  methods: {
    call () {
      d3.select(this.$refs.div)
        .append('svg')
        .attr('width', 200)
        .attr('height', 200)
        .append('rect')
        .attr('width', 200)
        .attr('height', 200)
        .style('fill', this.bgColor)
    }
  }
}
</script>
