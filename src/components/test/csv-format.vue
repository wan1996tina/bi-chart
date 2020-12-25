<template lang="pug">
.csv-format
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      csvData: 'group,Nitrogen,normal,stress,banana,12,1,13,poacee,6,6,33,sorgho,11,28,12,triticum,19,6,1'
    }
  },
  mounted () {
    this.format()
  },
  methods: {
    format () {
      d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv', function (data) {
        console.log(data)
      })
    }
  }
}
</script>
