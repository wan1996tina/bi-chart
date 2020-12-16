<template lang="pug">
.scatter
  h3 scatter chart title
  .svg-wraper
    svg.scatter_content
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      data: [
        { country: 'USA', gold: 10, silver: 20 },
        { country: 'China', gold: 20, silver: 100 },
        { country: 'India', gold: 200, silver: 50 },
        { country: 'Russia', gold: 25, silver: 80 },
        { country: 'Germany', gold: 10, silver: 200 },
        { country: 'UK', gold: 150, silver: 75 },
        { country: 'France', gold: 10, silver: 70 },
        { country: 'UAE', gold: 30, silver: 150 },
        { country: 'Canada', gold: 100, silver: 15 }
      ],
      width: 650,
      height: 400
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      const margin = { top: 50, left: 100, right: 30, bottom: 50 }
      const w = this.width
      const h = this.height

      d3.csv('/2_TwoNum.csv').then(function (data) {
        const svg = d3.select('.scatter_content')
          .attr('width', w + margin.left + margin.right)
          .attr('height', h + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`)
        svg.append('rect')
          .attr('width', w)
          .attr('height', h)
          .attr('fill', '#fff')
        console.log('scatter', data)

        const x = d3.scaleLinear()
          .domain([0, 2700])
          .range([0, w])
        svg.append('g')
          .attr('transform', 'translate(0,' + h + ')')
          .call(d3.axisBottom(x))

        // Add Y axis
        const y = d3.scaleLinear()
          .domain([0, 380000])
          .range([h, 0])
        svg.append('g')
          .call(d3.axisLeft(y).ticks(15))

        // Add dots
        svg.append('g')
          .selectAll('dot')
          .data(data)
          .enter()
          .append('circle')
          .attr('cx', function (d) { return x(d.GrLivArea) })
          .attr('cy', function (d) { return y(d.SalePrice) })
          .attr('r', 6)
          .style('fill', '#64c4ed')
          .style('opacity', '0.4')
      })
    }
  }
}
</script>

<style>
.scatter {
  background: #e1f2fb;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.scatter h3 {
  color:#888;
}
.scatter_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}

</style>
