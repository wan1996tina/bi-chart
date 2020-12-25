<template lang="pug">
.newBar
  h3 bar chart title
  .svg-wrapper
    svg(ref='content')
</template>

<script>
import * as d3 from 'd3'
export default {
  props: {
    chartData: {}
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
      console.log('newbar', data)
      const margin = { top: 40, left: 50, bottom: 80, right: 50 }
      const w = this.width
      const h = this.height

      const svg = d3.select(this.$refs.content)
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      svg.append('rect')
        .attr('width', w)
        .attr('height', h)
        .style('fill', '#fff')

      const xScale = d3.scaleLinear()
        .domain([0, d3.max(Object.values(data)) + 1])
        .range([0, w])
      svg.append('g')
        .attr('transform', `translate(0,${h})`)
        .call(d3.axisBottom(xScale))

      const yScale = d3.scaleBand()
        .domain(Object.keys(data))
        .range([0, h])
        .padding(0.4)
        .align(0.5)
      svg.append('g')
        .call(d3.axisLeft(yScale))

      // Define the div for the tooltip
      const div = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

      svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${h})`)
        .call(d3.axisBottom(xScale)
          .tickSize(-h)
          .tickFormat('')
        )

      const arr = Object.entries(data)
      const g = svg.append('g')
        .selectAll('g')
        .data(arr)
        .enter()
        .append('g')
        .attr('transform', function (d) { return `translate(0,${yScale(d[0])})` })

      g.append('rect')
        .attr('width', 0)
        .attr('height', yScale.bandwidth())
        .style('fill', '#5054dd')
        .on('mouseover', function (event, d) {
          d3.select(this).style('fill', '#949cdf')

          div.transition()
            .duration(200)
            .style('opacity', 0.9)
          div.html(d)
            .style('left', event.pageX + 'px')
            .style('top', event.pageY + 'px')
        })
        .on('mousemove', function (event, d) {
          div.html(`${d[0]} : ${d[1]} 天`)
            .style('left', event.pageX * 1.03 + 'px')
            .style('top', event.pageY + 'px')
        })
        .on('mouseleave', function (d) {
          d3.select(this).style('fill', '#5054dd')
          div.transition()
            .duration(500)
            .style('opacity', 0)
        })

      g.append('text')
        .attr('y', yScale.bandwidth() - 10)
        .attr('x', function (d) { return xScale(d[1]) - 20 })
        .style('font-size', 15)
        .style('fill', '#fff')
        .text(function (d) { return d[1] })

      g.selectAll('rect')
        .transition()
        .duration(1500)
        .attr('width', function (d) { return xScale(d[1]) })
        .delay(function (d) { return arr.indexOf(d) * 250 })
    }
  }
}
</script>

<style>
.newBar {
  background: #fff;
  border-radius: 10px;
  /* border:1px solid #000; */
  box-shadow: 0 3px 20px rgba(0,0,0,0.15);
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}

.newBar path {
  stroke:#ccc;
  stroke-width: 1.5px;
}

.newBar text {
  font-size: 12px;
}

.newBar h3 {
  color:#888;
}
.newBar_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}

.grid line {
  stroke: lightgrey;
  stroke-opacity: 0.7;
  shape-rendering: crispEdges;
}

.grid path {
  stroke-width: 0;
}

.tooltip {
  position: absolute;
  text-align: center;
  width: 70px;
  height: 20px;
  padding: 5px;
  font: 12px sans-serif;
  background: #333;
  border: 0px;
  border-radius: 3px;
  pointer-events: none;
  color: white;
}
</style>
