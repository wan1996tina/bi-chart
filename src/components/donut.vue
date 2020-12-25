<template lang="pug">
.donut
  h3 donut chart title
  .svg-wrapper
    svg.donut_content(ref='content')
</template>

<script>
import * as d3 from 'd3'
export default {
  props: {
    chartData: Object
  },
  data () {
    return {
      width: 650,
      height: 400
    }
  },
  mounted () {
    this.chart(this.chartData)
  },
  methods: {
    chart (data) {
      const w = this.width
      const h = this.height
      const keys = Object.keys(data)
      const values = Object.values(data)

      const svg = d3.select(this.$refs.content)
        .attr('width', w)
        .attr('height', h)
        .append('g')
        .attr('transform', `translate(${w / 2}, ${h / 2})`)

      const r = Math.min(w, h) / 2.5

      // const color = d3.scaleOridinal(['#fce4a6', '#fbdc88', '#fbd163', '#f9c435', '#f8b90d'])
      const interpolateRgb = d3.interpolateRgb('#f8efd4', '#ffac41')
      const colorLinear = d3.scaleLinear()
        .domain([0, keys.length - 1])
        .range([0, 1])

      const pie = d3.pie()
      const arc = d3.arc()
        .innerRadius(r / 1.5)
        .outerRadius(r)

      const arcs = svg.selectAll('arc')
        .data(pie(values))
        .enter()
        .append('g')

      arcs.append('path')
        .attr('fill', function (d, i) {
          return interpolateRgb(colorLinear(parseInt(i)))
        })
        .attr('d', arc)
        .style('stroke', '#00416d')
        .style('stroke-width', '2.5')
    }
  }
}
</script>

<style>
.donut {
  background: #00416d;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.donut h3 {
  color:#ccc;
}
.donut_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}
</style>
