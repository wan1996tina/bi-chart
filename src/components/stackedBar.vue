<template lang="pug">
.stackedBar
  h3 Stacked Bar chart title
  .svg-wraper
    svg.stackedBar_content
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      barData: [
        {
          季度: '第一季',
          酪梨: 40,
          橘子: 30,
          香蕉: 50
        },
        {
          季度: '第二季',
          酪梨: 50,
          橘子: 60,
          香蕉: 100
        },
        {
          季度: '第三季',
          酪梨: 30,
          橘子: 30,
          香蕉: 50
        },
        {
          季度: '第四季',
          酪梨: 20,
          橘子: 90,
          香蕉: 80
        }
      ],
      width: 650,
      height: 400,
      exData: [
        { group: 'banana', Nitrogen: '12', normal: '1', stress: '13' },
        { group: 'poacee', Nitrogen: '6', normal: '6', stress: '33' },
        { group: 'sorgho', Nitrogen: '11', normal: '28', stress: '12' },
        { group: 'triticum', Nitrogen: '19', normal: '6', stress: '1' },
        ['group', 'Nitrogen', 'normal', 'stress']
      ]
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      const width = this.width
      const height = this.height
      d3.csv('/d3-test-fruit.csv').then(function (data) {
        console.log('data is ready!')
        console.log('csv', data)

        // const x = []
        // const y = []
        // let z = []
        // for (const i of data) {
        //   for (const j in i) {
        //     z.push(i[j])
        //   }
        //   x.push(z[0])
        //   z.splice(0, 1)
        //   y.push(z)
        //   z = []
        // }
        // const newData = []
        // console.log('stacked', { x, y })

        const subgroups = data.columns.slice(1)
        // console.log(subgroups)

        const groups = d3.map(data, function (d) { return (d[data.columns[0]]) })
        // console.log(groups)

        const margin = { top: 10, right: 30, bottom: 20, left: 50 }

        const svg = d3.select('.stackedBar_content')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        svg.append('rect')
          .attr('width', width)
          .attr('height', height)
          .attr('fill', '#fff')

        // x 軸
        const xScale = d3.scaleBand()
          .domain(groups)
          .range([0, width])
          .padding(0.2)
        svg.append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(xScale).ticks(10))

        // 每筆資料總和
        // const dataSum = []
        // for (const i in newData.y) {
        //   dataSum.push(d3.sum(newData.y[i]))
        // }
        // console.log('dataSum', dataSum)

        // y 軸
        const yScale = d3.scaleLinear()
          .domain([0, 280])
          .range([height, 0])
        svg.append('g')
          .call(d3.axisLeft(yScale))

        const color = d3.scaleOrdinal()
          .domain(subgroups)
          .range(['#fcf8ec', '#d0e8f2', '#79a3b1', '#456268'])

        const stacked = d3.stack()
          .keys(subgroups)

        const stackedData = stacked(data)
        console.log(stackedData)

        // console.log('color', color)
        // console.log('stackedData', stackedData)

        svg.append('g')
          .selectAll('g')
          .data(stackedData)
          .enter()
          .append('g')
          .attr('fill', function (d) { return color(d.key) })
          .selectAll('rect')
          .data(function (d) { return d })
          .enter()
          .append('rect')
          .attr('x', function (d) { return xScale(d.data['水果']) })
          .attr('y', function (d) { return yScale(d[1]) })
          .attr('height', function (d) { return yScale(d[0]) - yScale(d[1]) })
          .attr('width', xScale.bandwidth())
      })
    }
  }
}
</script>

<style>
.stackedBar {
  background: #f3eac2;  /* fallback for old browsers */
  margin: 15px auto;
  padding: 10px 0;
  width: 100%;
  width: 1000px;
  text-align: center;
}
.stackedBar h3 {
  color:#888;
}
.stackedBar_content {
  height: 100%;
}
.svg-wraper {
  width: 100%;
  height: 100%;
}
</style>
