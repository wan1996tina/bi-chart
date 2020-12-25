<template lang="pug">
.home
  helloworld(msg='圖表s')
  fileChoose(@show="updateTable")
  .button.dropdown
    select(@change="onChange($event)")
      option(value='運動' selected) 本月運動統計表
      option(value='早餐') 本月早餐統計表
      option(value='休閒娛樂') 本月休閒娛樂統計表
  .table
    table(border="1" cellspacing="0")
      tr
        td(v-for="(i,index) in data") {{index}}
      tr
        td(v-for="(i,index) in data") {{i}}
  bar(v-if="this.data" :chartData='this.data')
  pie
  lineChart
  //- updateTest
  //- axisTest
  areaChart
  stackedBar
  //- csvFormat
  stack
  bubble
  scatter
  gaugesTest
  waterMark
  acmepoint
  column(v-if="this.data" :chartData='this.data')
  donut(v-if="this.data" :chartData='this.data')
  radialProgress
  groupColumn
  groupBar
  heatmap

</template>

<script>
import helloworld from '@/components/HelloWorld.vue'
import fileChoose from '@/components/choose-file'
import waterMark from '@/components/watermark'
import acmepoint from '@/components/acmepoint'

import bar from '@/components/bar'
import pie from '@/components/pie'
import lineChart from '@/components/line'
import areaChart from '@/components/area'
import stackedBar from '@/components/stackedBar'
import bubble from '@/components/bubble'
import scatter from '@/components/scatter'
import column from '@/components/column'
import donut from '@/components/donut'
import radialProgress from '@/components/radialProgress'
import groupColumn from '@/components/group-column'
import groupBar from '@/components/group-bar'
import heatmap from '@/components/heatmap'

import updateTest from '@/components/test/update-test'
import axisTest from '@/components/test/axis-test'
import csvFormat from '@/components/test/csv-format'
import stack from '@/components/test/stack'
import square from '@/components/test/refs-test'
import gaugesTest from '@/components/test/gauges-test'

export default {
  name: 'Home',
  components: {
    helloworld,
    bar,
    pie,
    lineChart,
    updateTest,
    axisTest,
    areaChart,
    stackedBar,
    csvFormat,
    stack,
    bubble,
    scatter,
    fileChoose,
    square,
    gaugesTest,
    waterMark,
    acmepoint,
    column,
    donut,
    radialProgress,
    groupColumn,
    groupBar,
    heatmap
  },
  data () {
    return {
      data: {}
    }
  },
  computed: {
  },
  created () {
    this.data = this.$store.getters.getSports
    console.log('home created', this.data)
    console.log('parents refs', this.$refs)
  },
  methods: {
    onChange (e) {
      const selector = event.target.value
      const sports = this.$store.getters.getSports
      const entertainment = this.$store.getters.getEnt
      const breakfast = this.$store.getters.getBreakfast
      this.data = (selector === '運動') ? sports
        : (selector === '早餐') ? breakfast
          : (selector === '休閒娛樂') ? entertainment
            : { i: 1, o: 2, s: 3 }
    },
    updateTable (data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>
table {
  margin: 20px auto;
  text-align: center;
}
td {
  min-width: 60px;
}
</style>
