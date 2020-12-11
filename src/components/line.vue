<template lang="pug">
.line
  h3 chart title
  .svg-wraper
    svg.line_content
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      width: 650,
      height: 400
    }
  },
  mounted () {

  },
  methods: {
    renderChart () {
      const data = this.$store.getters.getChartData
      const width = this.width
      const height = this.height

      const svg = d3.select('.line_content')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', '#fff')

      svg.append('rect')
        .attr('width', width)
        .attr('height', height)

      svg.selectAll('g')
        .data(data)
        .enter()
    }
  }

}
</script>

<style>
.line {
  background: #a8d274;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.line h3 {
  color:#888;
}
.line_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}
</style>
