<template lang="pug">
.axis
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      data: {
        pen: 66,
        pencil: 77
      },
      barheight: 20,
      width: 600,
      height: 400
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      let data = this.data
      const x = []
      const y = []
      for (const i in data) {
        x.push(data[i])
        y.push(i)
      }
      data = { x, y }

      const barheight = this.barheight
      const width = this.width
      const height = this.height

      const svg = d3.select('.axis').append('svg')
        .attr('width', width)
        .attr('height', height)

      const scaleX = d3.scaleLinear()
        .domain([0, d3.max(data.x)])
        .range([0, width * 0.85])

      const scaleY = d3.scaleLinear()
        .domain([0, 5])
        .range([height * 0.85, 0])

      const axisX = d3
        .axisBottom(scaleX)
        .ticks(10)

      const axisY = d3
        .axisLeft(scaleY)
        .ticks(5)

      svg.selectAll('svg')
        .data(data.x)
        .enter()
        .append('rect')
        .attr('width', scaleX)
        .attr('height', barheight)
        .attr('fill', 'black')

      svg.append('g')
        .attr('transform', `translate(20, ${height * 0.85 + 20})`)
        .call(axisX) // call axisX

      svg.append('g')
        .attr('transform', 'translate(20, 20)')
        .call(axisY) // call axisY
    }
  }
}
</script>
