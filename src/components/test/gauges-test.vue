<template lang="pug">
.guages
  h3 gauges chart title
  button(@click="changeNum()") 轉轉轉
  p 資料數值 : {{ data }} / max 9000
  p 對應角度 : {{ deg }} 度
  p 花費時間 : {{ sec }} s
  p 轉動度數 : 轉 {{ rotateDeg }} 度
  .svg-wrapper
    svg.gauges_content(ref='content')
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      width: 650,
      height: 400,
      deg: 0,
      data: 0,
      sec: 0,
      rotateDeg: 0,
      origin: 0
    }
  },
  mounted () {
    this.chart()
  },
  methods: {
    chart () {
      const margin = { top: 20, right: 20, bottom: 30, left: 20 }
      const w = this.width
      const h = this.height

      const svg = d3.select(this.$refs.content)
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${w / 2 - 160},${h / 2 - margin.top})`)

      const gradient = svg
        .append('defs')
        .append('linearGradient')
        .attr('id', 'gauges-gradient')

      const arc = d3.arc()

      gradient
        .append('stop')
        .attr('offset', '0%')
        .attr('class', 'c-chart-gauge__gradient-stop1')
      gradient
        .append('stop')
        .attr('offset', '33%')
        .attr('class', 'c-chart-gauge__gradient-stop2')
      gradient
        .append('stop')
        .attr('offset', '66%')
        .attr('class', 'c-chart-gauge__gradient-stop3')
      gradient
        .append('stop')
        .attr('offset', '100%')
        .attr('class', 'c-chart-gauge__gradient-stop4')

      const outerRadius = 240
      const innerRadius = 160

      arc
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)

      svg
        .append('path')
        .attr('d', arc)
        .attr('fill', 'url(#gauges-gradient)')
        .attr('transform', `translate(${outerRadius},${innerRadius})`)

      // -------- needle -------------------------------------------- //
      const length = outerRadius * 0.7
      const r = innerRadius * 0.15
      const y = innerRadius
      const x = outerRadius

      const percentToDegree = function (p) {
        return p * 360
      }

      const degreeToRadian = d => d * Math.PI / 180

      const percentToRadian = p => degreeToRadian(percentToDegree(p))

      const getNeedlePath = function (p) {
        const goalRadian = percentToRadian(p / 2)
        const centerX = 0
        const centerY = 0
        const topX = centerX - length * Math.cos(goalRadian)
        const topY = centerY - length * Math.sin(goalRadian)
        const leftX = centerX - r * Math.cos(goalRadian - Math.PI / 2)
        const leftY = centerY - r * Math.sin(goalRadian - Math.PI / 2)
        const rightX = centerX - r * Math.cos(goalRadian + Math.PI / 2)
        const rightY = centerY - r * Math.sin(goalRadian + Math.PI / 2)

        return `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}`
      }

      const chart = svg.append('g')
        .attr('transform', `translate(${x},${y})`)
        .attr('class', 'needle')

      chart
        .append('circle')
        .attr('class', 'c-chart-gauge__needle-base')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', r)

      chart
        .append('path')
        .attr('class', 'c-chart-gauge__needle needle-direction')
        .attr('d', getNeedlePath(0))
    },
    moveNeedle (goal) {
      const origin = this.origin
      let deg = goal - origin
      this.rotateDeg = deg.toFixed(2)
      const needle = d3.select(this.$refs.content).select('.needle')

      const timeScale = d3.scaleLinear()
        .domain([0, 180])
        .range([0, 1500])
      if (deg < 0) {
        deg = deg * -1
      }

      let duration = timeScale(deg)
      if (deg < 50) {
        duration = 800
      }
      this.sec = (duration / 1000).toFixed(2)

      needle
        .select('path')
        .transition()
        .duration(duration)
        .attr('transform', `rotate(${goal} 0,0)`)
      this.origin = goal
    },
    changeNum () {
      const scale = d3.scaleLinear()
        .domain([0, 9000])
        .range([0, 180])

      const data = Math.floor(Math.random() * 9001)
      this.data = data
      this.deg = scale(data).toFixed(2)

      console.log(data)
      this.moveNeedle(this.deg)
    }
  }
}
</script>

<style>
.c-chart-gauge__needle-base, .c-chart-gauge__needle {
  fill: #555555;
}

.c-chart-gauge__gradient-stop1 {
  stop-color: red;
}

.c-chart-gauge__gradient-stop2 {
  stop-color: orange;
}

.c-chart-gauge__gradient-stop3 {
  stop-color: orange;
}

.c-chart-gauge__gradient-stop4 {
  stop-color: green;
}
</style>
