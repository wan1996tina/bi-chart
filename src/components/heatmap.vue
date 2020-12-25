<template lang="pug">
.heatmap
  h3 heatmap title
  .svg-wrapper
    svg(ref="content")
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
    this.chart()
  },
  methods: {
    chart () {
      const margin = { top: 50, left: 60, right: 60, bottom: 50 }
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

      d3.csv('/heatmap_data.csv').then(function (data) {
        console.log(data)
        const x = []
        const y = []
        for (const d of data) {
          if (!x.includes(d.group)) {
            x.push(d.group)
          }
          if (!y.includes(d.variable)) {
            y.push(d.variable)
          }
        }

        const xScale = d3.scaleBand()
          .domain(x)
          .range([0, w])
          .padding(0.05)
          .align(0.5)
        svg.append('g')
          .attr('transform', `translate(0,${h})`)
          .call(d3.axisBottom(xScale))

        const yScale = d3.scaleBand()
          .domain(y)
          .range([h, 0])
          .padding(0.05)
          .align(0.5)
        svg.append('g')
          .call(d3.axisLeft(yScale))

        const color = d3.scaleLinear()
          .domain([0, 10])
          .range(['#d9eeec', '#64b2cd'])

        svg.append('g')
          .selectAll('g')
          .data(data, function (d) { return d.group + ':' + d.variable })
          .enter()
          .append('rect')
          .attr('width', xScale.bandwidth())
          .attr('height', yScale.bandwidth())
          .attr('y', function (d) { return yScale(d.variable) })
          .attr('x', function (d) { return xScale(d.group) })
          .style('fill', function (d) { return color(Math.floor(d.value / 10)) })
      })
    }
  }
}
</script>

<style>
.heatmap {
  background: #00334e;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.heatmap h3 {
  color:#888;
}

.heatmap text {
  color:white;
}

.heatmap line,path {
  stroke:  white;
}

.heatmap_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}
</style>
