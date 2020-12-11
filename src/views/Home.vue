<template lang="pug">
.home
  helloworld(msg='一堆圖表')

  .button.dropdown
    select(@change="onChange($event)")
      option(value='運動') 本月運動統計表
      option(value='早餐') 本月早餐統計表
      option(value='休閒娛樂') 本月休閒娛樂統計表
  .table
    table(border="1" cellspacing="0")
      tr
        td(v-for="(i,index) in data") {{index}}
      tr
        td(v-for="(i,index) in data") {{i}}
  column
  pie
  lineChart
  updateTest
  axisTest
</template>

<script>
import helloworld from '@/components/HelloWorld.vue'
import column from '@/components/column'
import pie from '@/components/pie'
import lineChart from '@/components/line'
import updateTest from '@/components/update-test'
import axisTest from '@/components/axis-test'

export default {
  name: 'Home',
  components: {
    helloworld,
    column,
    pie,
    lineChart,
    updateTest,
    axisTest
  },
  data () {
    return {
      data: { i: 1, o: 2, s: 3 }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    onChange (e) {
      const selector = event.target.value
      const sports = this.$store.getters.getChartData
      const ent = this.$store.getters.get2
      const bf = this.$store.getters.getBreakfast
      this.data = (selector === '運動') ? sports
        : (selector === '早餐') ? bf
          : (selector === '休閒娛樂') ? ent
            : { i: 1, o: 2, s: 3 }
    }
  }
}
</script>

<style scoped>
table {
  margin: 20px auto;
  text-align: center;
  /* border: 1px solid #000; */
}
td {
  min-width: 60px;
}
</style>
