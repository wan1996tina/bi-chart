<template lang="pug">
.pie
  h3 This is the pie chart title
  .svg-wraper
    svg.pie_content
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
  computed: {
    storeChartData () {
      const data = this.$store.getters.getSports
      const x = []
      const y = []
      for (const i in data) {
        x.push(data[i])
        y.push(i)
      }
      return { x, y }
    }
  },
  methods: {
    renderData () {
      const data = this.storeChartData.x
      const index = this.storeChartData.y
      const width = this.width
      const height = this.height

      // 背景色塊
      d3.select('.pie_content').append('rect')
        .attr('width', width + 30)
        .attr('height', height)
        .attr('fill', '#ffffff')

      const svg = d3.select('.pie_content')
        .attr('width', width + 30)
        .attr('height', height)
      const g = svg.append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

      const radius = Math.min(width, height) / 2.5

      const color = d3.scaleOrdinal(['#fce4a6', '#fbdc88', '#fbd163', '#f9c435', '#f8b90d'])

      const pie = d3.pie()

      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

      const arcs = g.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc')

      arcs.append('path')
        .attr('fill', function (d, i) {
          return color(i)
        })
        .attr('d', arc)

      arcs.append('text')
        .attr('transform', function (d) { // set the label's origin to the center of the arc
          // we have to make sure to set these before calling arc.centroid
          d.innerRadius = 0
          d.outerRadius = radius
          return 'translate(' + arc.centroid(d) + ')' // this gives us a pair of coordinates like [50, 50]
        })
        .attr('text-anchor', 'middle') // center the text on it's origin
        .text(function (d, i) { return data[i] })

      const icons = svg.selectAll('svg')
        .data(index)
        .enter()
        .append('g')
        .attr('transform', function (d, i) { return `translate(${width * 0.8},${i * 30 + 90})` })

      icons
        .append('rect')
        .attr('width', height * 0.05)
        .attr('height', height * 0.05)
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('fill', function (d, i) { return color(i) })

      icons.append('text')
        .attr('x', 30)
        .attr('y', height * 0.025)
        .attr('dy', '0.3rem')
        .attr('fill', '#777')
        .style('font-size', '14px')
        .text(function (d) { return d })
    }
  },
  mounted () {
    this.renderData()
  }
}
</script>

<style>
.pie {
  background:blanchedalmond;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.pie h3 {
  color:#888;
}
.pie_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}
</style>
