<template lang="pug">
.map
  .svg-wrapper
    svg(ref="content")
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      width: 900,
      height: 900,
      taiwanCountry: []
    }
  },
  mounted () {
    // const self = this
    // fetch('/COUNTY_MOI_1090820.json')
    //   .then(res => res.json())
    //   .then(result => {
    //     self.taiwanCountry = result
    //     // self.draw(self.taiwanCountry)
    //   })
    this.draw()
  },
  methods: {
    draw () {
      const w = this.width
      const h = this.height
      const map = d3
        .select(this.$refs.content)
        .attr('width', w)
        .attr('height', h)

      const projection = d3
        .geoMercator()
        .center([0, 50])
        .scale(100)

      const path = d3.geoPath().projection(projection)

      d3.json('/COUNTY_MOI_1090820.json').then(function (mapData) {
        console.log('1111', mapData)
        map
          .selectAll('path')
          .data(mapData.geometries)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('stroke', 'black')
          .attr('stroke-width', '0.7')
          .attr('fill', 'steelblue')
          .on('mouseover', function () {
            d3.select(this).attr('fill', '#eee')
          })
          .on('mouseleave', function () {
            d3.select(this).attr('fill', 'steelblue')
          })
      })
    }

  }
}
</script>

<style>
.map {
  width: 1000px;
  height: 750px;
  background: #999;
  margin: 0 auto;
}
</style>
