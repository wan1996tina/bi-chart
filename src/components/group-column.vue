<template lang="pug">
.group-column
  h3 group column title
  .svg-wrapper
    svg(ref="content")
</template>

<script>
import * as d3 from 'd3'
export default {
  props: {

  },
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
      const margin = { top: 50, left: 30, right: 30, bottom: 50 }
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

      d3.csv('/d3-test-fruit.csv').then(function (data) {
        console.log('data is ready!')
        console.log('csv fruit', data)
        const subgroup = data.columns.slice(1)
        const group = d3.map(data, function (d) { return d[data.columns[0]] })
        const maxValue = d3.max(d3.map(data, function (d) {
          const x = Object.values(d).slice(1).map(k => parseInt(k))
          return d3.max(x)
        }))

        const xscale = d3.scaleBand()
          .domain(group)
          .range([0, w])
          .padding(0.3)
          .align(0.5)
        svg.append('g')
          .attr('transform', `translate(0,${h})`)
          .call(d3.axisBottom(xscale))

        const yscale = d3.scaleLinear()
          .domain([0, maxValue])
          .range([h, 0])
        svg.append('g')
          .call(d3.axisLeft(yscale))

        const xSubgroup = d3.scaleBand()
          .domain(subgroup)
          .range([0, xscale.bandwidth()])
          .padding(0.1)
          .align(0.5)

        var color = d3.scaleOrdinal()
          .domain(subgroup)
          .range(['#ffd5cd', '#efbbcf', '#c3aed6', '#8675a9'])

        const g = svg.append('g')
          .selectAll('g')
          .data(data)
          .enter()
          .append('g')
          .attr('transform', function (d, i) { return `translate(${xscale(d[data.columns[0]])},${0})` })

        g.selectAll('rect')
          .data(function (d) { return subgroup.map(function (key) { return { key: key, value: d[key] } }) })
          .enter()
          .append('rect')
          .attr('width', xSubgroup.bandwidth())
          .attr('height', function (d) { return h - yscale(d.value) })
          .attr('x', function (d) { return xSubgroup(d.key) })
          .attr('y', function (d) { return yscale(d.value) })
          .style('fill', function (d) { return color(d.key) })
      })
    }
  }
}
</script>

<style>
.group-column {
  background: #31112c;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.group-column h3 {
  color:#888;
}
.group-column_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}
</style>
