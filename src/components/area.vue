<template lang="pug">
.area
  h3 area chart title
  .svg-wraper
    svg.area_content
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
    this.renderChart()
  },
  methods: {
    renderChart () {
      // const data = this.$store.getters.getChartData
      const margin = { top: 50, right: 40, bottom: 50, left: 60 }
      const w = this.width
      const h = this.height
      // const lineData = [
      //   { x: 0, y: 18 },
      //   { x: 20, y: 27 },
      //   { x: 40, y: 56 },
      //   { x: 60, y: 34 },
      //   { x: 80, y: 41 },
      //   { x: 100, y: 35 },
      //   { x: 120, y: 100 },
      //   { x: 140, y: 37 },
      //   { x: 160, y: 26 },
      //   { x: 180, y: 21 }
      // ]

      const svg = d3.select('.area_content')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('class', 'chart')

      svg.append('rect')
        .attr('width', w)
        .attr('height', h)
        .attr('fill', '#fff')

      const grp = svg
        .append('g')
        .attr('class', 'grp')

      const dataset = []
      let Num = 20
      for (let i = 0; i < 80; i++) {
        const newNum = Num + (5 - Math.floor(Math.random() * 10))
        dataset.push(newNum)
        Num = newNum
      }

      console.log(dataset)

      const Ymax = d3.max(dataset)
      const Ymin = d3.min(dataset)

      const xScale = d3.scaleLinear()
        .domain([0, dataset.length])
        .range([0, w])

      const yScale = d3.scaleLinear()
        .domain([Ymin, Ymax])
        .range([h, 0])

      // line func，來把資料轉為 x, y
      const line = d3.line()
        .x(function (d, i) {
          return xScale(i + 1)
        })
        .y(function (d) {
          return yScale(d)
        })

      const path = grp
        .append('path')
        .attr('transform', 'translate(0,0)')
        .datum(dataset)
        .attr('fill', 'none')
        .attr('stroke', 'gray')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 2)
        .attr('d', line)

      const area = d3.area()
        .x(function (d, i) { return xScale(i + 1) })
        .y0(h)
        .y1(function (d) {
          return yScale(d)
        })
      grp.append('path')
        .attr('d', area(dataset))
        .attr('stroke', 'none')
        .attr('fill', 'rgba(200,200,200,.5)')

      // 設置畫線動畫
      const pathLength = path.node().getTotalLength()
      const transitionPath = d3
        .transition()
        .duration(2500)
        .ease(d3.easeSin)

      path
        .attr('stroke-dashoffset', pathLength)
        .attr('stroke-dasharray', pathLength)
        .transition(transitionPath)
        .attr('stroke-dashoffset', 0)

      // x 軸
      const xAxis = d3
        .axisBottom(xScale)
        .ticks(15)

      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)

      // y 軸
      const yAxisLeft = d3
        .axisLeft(yScale)
        .ticks(8)

      svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', 'translate(0,0)')
        .call(yAxisLeft)

      // 資料點 (填色透明)
      grp.selectAll('g')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('fill', 'none')
        .attr('stroke', 'none')
        .attr('cx', function (d, i) { return xScale(i + 1) })
        .attr('cy', function (d) { return yScale(d) })
        .attr('r', 2)
    }
  }

}
</script>

<style>
.area {
  background: #e9d2d2;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.area h3 {
  color:#888;
}
.area_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}

</style>
