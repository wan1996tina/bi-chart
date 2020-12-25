<template lang="pug">
.guages
  h3 gauges chart title
  .svg-wrapper
    svg.gauges_content(ref='content')
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
    this.draw()
  },
  methods: {
    draw () {
      const margin = { top: 20, right: 20, bottom: 30, left: 20 }
      const w = this.width
      const h = this.height

      const radius = Math.min(w, h) / 2
      const barwidth = 40 * w / 300

      const percToDeg = function (perc) {
        return perc * 360
      }

      const percToRad = function (perc) {
        return degToRad(percToDeg(perc))
      }

      const degToRad = function (deg) {
        return deg * Math.PI / 180
      }

      const svg = d3.select(this.$refs.content)
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)

      const chart = svg.append()
    }
  }
}
</script>
