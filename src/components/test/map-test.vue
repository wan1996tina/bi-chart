<template lang="pug">
.mappp
  svg(width='500' height='500' style='border:1px solid #00000060;' ref="content")
    g.counties
    path.county-borders
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson'
export default {
  data: function () {
    return {
      taiwanCountry: []
    }
  },
  mounted () {
    fetch('COUNTY_MOI_10908202.json')
      .then(res => res.json())
      .then(result => {
        this.taiwanCountry = result
        this.draw(this.taiwanCountry)
      })
  },
  methods: {
    draw (mapData) {
      const projection = d3.geoMercator()
        .center([123, 24])
        .scale(5500)
      const path = d3.geoPath(projection)
      d3.select('g.counties')
        .selectAll('path')
        .data(topojson.feature(mapData, mapData.objects.COUNTY_MOI_10908202).features)
        .enter().append('path')
        .attr('d', path)

      d3.select('path.county-borders')
        .attr('d', path(topojson.mesh(mapData, mapData.objects.COUNTY_MOI_10908202, function (a, b) { return a !== b })))
    }

  }
}
</script>

<style>
    .counties {
        fill:#33474e;
    }
    .counties :hover {
        fill: #7f9ca7;
        transition: 0.5s;
    }
    .county-borders {
        fill: none;
        stroke: #fff;
        stroke-width: 0.5px;
    }
</style>
