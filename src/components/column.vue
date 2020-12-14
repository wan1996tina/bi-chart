<template lang="pug">
.column
  h3 This is the column chart title
  button(@click="change()") change data
  .svg-wraper
    svg.column_content
</template>

<script>
import * as d3 from 'd3'

export default {
  props: {
    chartData: Object
  },
  data () {
    return {
      columnData: {
        爬山: 1,
        慢跑: 5,
        游泳: 3,
        羽球: 7,
        快走: 9,
        排球: 6,
        健身: 15
      },
      columnData2: {
        看書: 5,
        滑手機: 15,
        聚餐: 6,
        購物: 3,
        聽音樂: 22,
        逛夜市: 2,
        遛狗: 28
      },
      bindData: {},
      width: 650,
      height: 400,
      barHeight: 20,
      bgColor: '#ffd'
    }
  },
  created () {
    // alert(this.chartData)
  },
  watch: {
    chartData: {
      hanlder: {
        function () {
          this.getprops()
        }
      }
    }
  },
  mounted () {
    // const data = this.$store.getters.getEnt
    const data = this.chartData
    // console.log(this.chartData + '11111111111111111')
    const x = []
    const y = []
    for (const d in data) {
      x.push(data[d])
      y.push(d)
    }
    // console.log(x, y)

    this.bindData = { x, y }
    // *虛擬外部資料，要改成用 props 帶進來 o
    // 存進 vuex
    // this.$store.commit('addData', this.chartData)
    // 呼叫畫圖表 func，帶入取來的資料
    this.renderData(this.bindData)
  },
  computed: {
    // 取資料
    storeChartData () {
      // 處理資料，變成有 2 個陣列的物件
      const data = this.$store.getters.getSports
      const x = []
      const y = []
      for (const d in data) {
        x.push(data[d])
        y.push(d)
      }
      return { x, y }
    }
  },
  methods: {
    getprops () {
      console.log(123)
    },
    change () {
      const data = this.$store.getters.getSports
      const x = []
      const y = []
      for (const d in data) {
        x.push(data[d])
        y.push(d)
      }

      // 更換、新增、刪除 圖表色塊
      const newData = { x, y }
      const dataUpdate = d3.select('.column_content')
        .selectAll('.xAxis')
        .select('rect')
        .data(newData.x)
      const dataEnter = dataUpdate.enter()
      const dataExit = dataUpdate.exit()

      const width = this.width
      const barHeight = this.barHeight
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(newData.x)])
        .range([0, width * 0.8])

      dataUpdate
        .transition()
        .duration(1000)
        .attr('width', xScale)
        .attr('height', barHeight - 2)
        .attr('fill', 'white')

      dataEnter
        .append('rect')
        .transition()
        .duration(1000)
        .attr('width', xScale)
        .attr('height', barHeight - 2)
        .attr('fill', 'white')

      dataExit
        .transition()
        .duration(1000)
        .remove()

      // 更換、新增、刪除 圖表文字
      const textUpdate = d3.select('.column_content')
        .selectAll('.xAxis')
        .select('text')
        .data(newData.x)
      const textEnter = dataUpdate.enter()
      const textExit = dataUpdate.exit()

      textUpdate
        .transition()
        .duration(1000)
        .attr('x', function (d) { return xScale(d) + 6 })
        .text(function (d) { return d + '天' })

      textEnter
        .append('text')
        .attr('x', function (d) { return xScale(d) + 6 })
        .attr('y', barHeight - 10)
        .attr('dy', '0.3em')
        .attr('fill', '#666')
        .style('font-size', '14px')
        .text(function (d) { return d + '天' })

      textExit
        .transition()
        .duration(1000)
        .remove()
    },
    renderData (data) {
      const chartData = data.x
      const width = this.width
      const height = this.height
      const barHeight = this.barHeight

      // 整個圖表區域
      const chartSvg = d3.select('.column_content')
        .attr('width', width + 30)
        .attr('height', height)

      // 計算比例尺
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(chartData)])
        .range([0, width * 0.8])

      // 背景色塊
      d3.select('.column_content').append('rect')
        .attr('width', width + 30)
        .attr('height', height)
        .attr('fill', '#efefef')

      // XY軸線
      d3.select('.column_content').append('polyline')
        .style('stroke', 'black')
        .style('fill', 'none')
        .attr('points', `80, 70, 80, ${height - 80}, ${90 + width * 0.8}, ${height - 80}`)

      // 資料內容 > 矩形和 label 文字組合的容器
      const g = chartSvg.selectAll('g')
        .data(chartData)
        .enter()
        .append('g')
        .attr('transform', function (d, i) { return 'translate(81,' + (i * (barHeight + 15) + 80) + ')' })
        .attr('class', 'xAxis')

      // - 新增矩形 (視覺化資料)
      g.append('rect')
        .attr('width', xScale)
        .attr('height', barHeight - 2)
        .attr('fill', 'white')
      // - 新增 label 文字
      g.append('text')
        .attr('x', function (d) { return xScale(d) + 6 })
        .attr('y', barHeight - 10)
        .attr('dy', '0.3em')
        .attr('fill', '#666')
        .style('font-size', '14px')
        .text(function (d) { return d + '天' })

      // 資料間隔線
      const lines = chartSvg.append('g')
        .attr('transform', 'translate(80, 70)')

      let j = 0
      for (let i = 0; i < 7; i++) {
        lines.append('line')
          .attr('x1', 0)
          .attr('y1', j)
          .attr('x2', width * 0.8 + 10)
          .attr('y2', j)
          .style('stroke', '#ccc')
        j += 35
      }

      // X軸 對照參考線、數值
      const refe = chartSvg.append('g')
        .attr('transform', `translate(80, ${height - 80})`)
      const unit = (width - 130) / d3.max(chartData)
      for (let i = 1; i <= d3.max(chartData); i++) {
        refe.append('line')
          .attr('x1', i * unit)
          .attr('y1', 1)
          .attr('x2', i * unit)
          .attr('y2', 12)
          .style('stroke', '#999')
        refe.append('text')
          .attr('x', i * unit - 4)
          .attr('y', 25)
          .attr('dy', '0.3em')
          .attr('fill', '#666')
          .style('font-size', '14px')
          .text(i)
      }

      // Y軸 項目名稱
      const yAxis = chartSvg.append('g')
        .attr('transform', 'translate(40, 88)')

      for (let i = 0; i < data.y.length; i++) {
        yAxis.append('text')
          .attr('x', 0)
          .attr('y', i * 35)
          .attr('dy', '0.3em')
          .attr('fill', '#666')
          .style('font-size', '14px')
          .text(data.y[i])
      }
    }
  }
}
</script>

<style>
.column {
  background: lightblue;
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.column h3 {
  color:#888;
}
.column_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}
</style>
