<template lang="pug">
div
  button(@click="update()") test
  .test
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      data: [
        {
          width: 500,
          height: 500,
          color: '#acf'
        },
        {
          width: 200,
          height: 200,
          color: '#fff'
        }
      ],
      data2: [
        {
          width: 600,
          height: 600,
          color: 'red'
        },
        {
          width: 300,
          height: 300,
          color: 'blue'
        },
        {
          width: 200,
          height: 200,
          color: 'yellow'
        }
      ],
      data3: [
        {
          width: 400,
          height: 400,
          color: 'green'
        }
      ]

    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      const svg = d3.select('.test')
        .append('svg')
        .attr('width', 1000)
        .attr('height', 600)
      svg.selectAll('svg')
        .data(this.data)
        .enter()
        .append('rect')
        .attr('width', function (d) { return d.width })
        .attr('height', function (d) { return d.height })
        .attr('fill', function (d) { return d.color })
    },
    update () {
      var dataUpdate = d3.select('.test').select('svg').selectAll('rect').data(this.data2)
      // 鎖定新綁定基本物件的成員
      var dataEnter = dataUpdate.enter()
      // 鎖定未被新資料集綁定之多餘基本物件成員
      var dataExit = dataUpdate.exit()

      dataUpdate
        .transition()
        .duration(1000)
        .attr('width', function (d) { return d.width })
        .attr('height', function (d) { return d.height })
        .attr('fill', function (d) { return d.color })

      dataEnter
        .append('rect')
        .transition()
        .duration(1000)
        .attr('width', function (d) { return d.width })
        .attr('height', function (d) { return d.height })
        .attr('fill', function (d) { return d.color })

      dataExit
        .transition()
        .duration(1000)
        .remove()
    }
  }
}
</script>
