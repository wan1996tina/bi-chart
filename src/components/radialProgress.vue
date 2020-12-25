<template lang='pug'>
.radialProgress
  h3 radial progress title
    .radial-btn(@click="goProgress()") Go
  .svg-wrapper
    svg(ref="content")
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
      height: 400,
      progressPercent: 0,
      value: 0,
      mainArc: {},
      mainArcPath: {},
      end: {},
      progressLabel: {}

    }
  },
  mounted () {
    this.chart(this.chartData)
  },
  methods: {
    chart (data) {
      const w = this.width
      const h = this.height
      const r = Math.min(w, h) / 2.5
      const thickness = 12

      const svg = d3.select(this.$refs.content)
        .attr('width', w)
        .attr('height', h)
        .append('g')

      this.mainArc = d3.arc()
        .startAngle(0)
        .endAngle(Math.PI * 2)
        .innerRadius(r - thickness)
        .outerRadius(r)

      // 底圈
      svg.append('path')
        .attr('transform', `translate(${w / 2},${h / 2})`)
        .style('fill', '#d1cebd')
        .attr('d', this.mainArc)

      // 原點
      svg.append('circle')
        .style('fill', '#ff7c7c')
        .attr('cx', thickness)
        .attr('cy', thickness)
        .attr('r', thickness / 2)
        .attr('transform', `translate(${w / 2 - thickness},${h / 2 - r - thickness / 2})`)

      // 進度條
      this.mainArcPath = svg.append('path')
        .attr('transform', `translate(${w / 2},${h / 2})`)
        .style('fill', '#ff7c7c')

      // 進度條尾端
      this.end = svg.append('circle')
        .style('fill', 'red')
        .attr('cx', thickness)
        .attr('cy', thickness)
        .attr('r', thickness / 2)
        .attr('transform', `translate(${w / 2 - thickness},${h / 2 - r - thickness / 2})`)

      // 進度文字顯示
      this.progressLabel = svg.append('text')
        .attr('class', 'progress-label')
        .attr('transform', `translate(${w / 2},${h / 2})`)
        .text('0')

      // move progress
      // const progressPercent = 60
    },
    update (value, progressPercent) {
      const w = this.width
      const h = this.height
      const r = Math.min(w, h) / 2.5
      const thickness = 12

      const startValue = value
      const startAngle = Math.PI * startValue / 50
      const angleDiff = Math.PI * progressPercent / 50 - startAngle
      const startAngleDeg = startAngle / Math.PI * 180
      const angleDiffDeg = angleDiff / Math.PI * 180
      const duration = 2000

      const mainArc = this.mainArc
      const mainArcPath = this.mainArcPath
      const end = this.end
      const progressLabel = this.progressLabel

      // 進度條
      mainArcPath
        .transition()
        .duration(duration)
        .attrTween('d', function () {
          return function (t) {
            mainArc.endAngle(startAngle + angleDiff * t)
            return mainArc()
          }
        })

      end
        .transition()
        .duration(duration)
        .attrTween('transform', function () {
          return function (t) {
            return `translate(${w / 2 - thickness},${h / 2 - thickness})` +
            `rotate(${(startAngleDeg + angleDiffDeg * t)} 12,12)` +
            `translate(0,-${r - 6})`
          }
        })
      progressLabel
        .transition()
        .duration(duration)
        .text('')
        .tween('bla', function () {
          return function (t) {
            progressLabel.text(Math.round(startValue + (progressPercent - startValue) * t))
          }
        })
      this.value = progressPercent
      console.log('progressPercent', progressPercent)
    },
    goProgress () {
      const progressNum = Math.floor(Math.random() * 101)
      console.log('num', progressNum)
      this.progressPercent = progressNum
      this.update(this.value, this.progressPercent)
    }
  }
}

</script>

<style>
.radialProgress {
  background: #21243d;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.radialProgress h3 {
  color:#ccc;
}
.radialProgress_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}
.progress-label {
  fill: #aaa;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  text-anchor: middle;
  /* dominant-baseline: central; */
}
.radial-btn {
  cursor: pointer;
  width: 120px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  background: white;
  margin: 20px auto;
  color: black;
}
</style>
