<template lang="pug">
.column
  h3 column chart title
  .svg-wrapper
    svg.column_content(ref="content")
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
      const margin = { top: 50, left: 30, right: 30, bottom: 50 }
      const w = this.width
      const h = this.height

      const svg = d3.select(this.$refs.content)
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      svg.append('rect')
        .attr('width', w)
        .attr('height', h)
        .style('fill', '#fff')

      const keys = Object.keys(data)
      const values = Object.values(data)

      const xScale = d3.scaleBand()
        .domain(keys)
        .range([0, w])
        .padding(0.4)
      svg.append('g')
        .attr('transform', `translate(0, ${h})`)
        .call(d3.axisBottom(xScale))

      const yScale = d3.scaleLinear()
        .domain([0, 16])
        .range([h, 0])
      svg.append('g')
        .call(d3.axisLeft(yScale))

      const y = d3.scaleLinear()
        .domain([16, 0])
        .range([h, 0])

      const x = d3.scaleBand()
        .domain(d3.range(values.length))
        .range([0, w])
        .padding(0.4)
        .align(0.5)

      const g = svg.append('g')
        .selectAll('g')
        .data(values)
        .enter()
        .append('g')
        .attr('transform', function (d, i) { return `translate(${x(i)} ,${h - y(d)})` })

      g.append('rect')
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
          return y(d)
        })
        .style('fill', '#5c6e91')
    }
  }
}
</script>

<style>
.column {
  background: #eeeeee;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.column h3 {
  color:#888;
}
.column_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}
</style>
