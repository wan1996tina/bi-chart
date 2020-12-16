<template lang="pug">
.bubble
  h3 bubble chart title
  .svg-wraper
    svg.bubble_content
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
    this.draw()
  },
  methods: {
    draw () {
      const margin = { top: 50, left: 30, bottom: 50, right: 30 }
      const w = this.width
      const h = this.height
      d3.csv('/4_ThreeNum.csv').then(function (d) {
        const svg = d3.select('.bubble_content')
          .attr('width', w + margin.left + margin.right)
          .attr('height', h + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`)
        svg.append('rect')
          .attr('width', w)
          .attr('height', h)
          .attr('fill', '#fff')

        const xScale = d3.scaleLinear()
          .domain([0, 50000])
          .range([0, w])
        svg.append('g')
          .attr('transform', `translate(0,${h})`)
          .call(d3.axisBottom(xScale))

        const yScale = d3.scaleLinear()
          .domain([40, 90])
          .range([h, 0])
        svg.append('g')
          .call(d3.axisLeft(yScale))

        const zScale = d3.scaleLinear()
          .domain([200000, 1310000000])
          .range([1, 40])

        svg.append('g')
          .selectAll('dot')
          .data(d)
          .enter()
          .append('circle')
          .attr('cx', function (d) { return xScale(d.gdpPercap) })
          .attr('cy', function (d) { return yScale(d.lifeExp) })
          .attr('r', function (d) { return zScale(d.pop) })
          .style('fill', '#d2d0fe')
          .style('opacity', '0.7')
          .attr('stroke', '#ccc')
      })
    }
  }
}
</script>

<style>
.bubble {
  background: #f2e7ff;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.bubble h3 {
  color:#888;
}
.bubble_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}

</style>
