<template lang="pug">
.line
  h3 line chart title
  .svg-wraper
    svg.line_content
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
      // const width = this.width
      // const height = this.height
      const margin = { top: 50, right: 40, bottom: 50, left: 60 }
      const w = this.width // 寬
      const h = this.height // 高

      // const svg = d3.select('.line_content')
      //   .attr('width', width)
      //   .attr('height', height)
      //   .attr('fill', '#fff')

      // 增加一個SVG元素
      const svg = d3.select('.line_content')
        .attr('width', w + margin.left + margin.right) // 將左右補滿
        .attr('height', h + margin.top + margin.bottom) // 上下補滿
        .append('g') // 增加一個群組g
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('class', 'chart')
      svg.append('rect')
        .attr('width', w)
        .attr('height', h)
        .attr('fill', '#fff')
      const grp = svg
        .append('g')
        .attr('class', 'grp')
        // .attr('transform', `translate(-${margin.left},-${margin.top})`)

      // svg.selectAll('g')
      //   .data(data)
      //   .enter()

      const dataset = [] // 建立空的資料陣列
      let Num = 20
      for (let i = 0; i < 50; i++) {
        const newNum = Num + (5 - Math.floor(Math.random() * 10))
        dataset.push(newNum)
        Num = newNum
      }
      // 隨機產生一組隨機的數字陣列，數字的值，每次加減不超過5
      // X是資料的數量，Y則是資料的值

      console.log(dataset)

      const Ymax = d3.max(dataset)
      const Ymin = d3.min(dataset)

      const xScale = d3.scaleLinear()
        .domain([0, dataset.length])
        .range([0, w])

      const yScale = d3.scaleLinear()
        .domain([Ymin, Ymax])
        .range([h, 0])

      // 增加一個line function，用來把資料轉為x, y
      const line = d3.line()
        .x(function (d, i) {
          return xScale(i + 1) // 利用尺度運算資料索引，傳回x的位置
        })
        .y(function (d) {
          return yScale(d) // 利用尺度運算資料的值，傳回y的位置
        })

      const path = grp
        .append('path')
        .attr('transform', 'translate(0,0)')
        .datum(dataset)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line)

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

      // 增加x軸線，tickSize是軸線的垂直高度，-h會往上拉高
      // tickSubdivide不清楚是什麼用處
      const xAxis = d3
        .axisBottom(xScale)
        .ticks(15)

      // SVG加入x軸線
      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)

      // 建立y軸線，4個刻度，數字在左
      const yAxisLeft = d3
        .axisLeft(yScale)
        .ticks(8)

      // SVG加入y軸線
      svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', 'translate(0,0)')
        .call(yAxisLeft)

      grp.selectAll('g')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('fill', '#8db596')
        .attr('stroke', 'none')
        .attr('cx', function (d, i) { return xScale(i + 1) })
        .attr('cy', function (d) { return yScale(d) })
        .attr('r', 2)
    }
  }

}
</script>

<style>
.line {
  background: #dff3e3;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.line h3 {
  color:#888;
}
.line_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}

.line_content .grp path {
  stroke: #a8d274;
  stroke-width: 3.5;
  fill: none;
}
.axis {
  font-size: 11px;
  fill: gray;
}

.x.axis line {
  stroke: lightgrey;
}

.x.axis .minor {
  stroke-opacity: .5;
}

.x.axis path {
  stroke: #fafafa;
}

.y.axis line, .y.axis path {
  fill: none;
  stroke: lightgrey;
}
</style>
