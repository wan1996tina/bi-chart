<template lang="pug">
#my_dataviz
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      data: {
        0: { group: 'banana', Nitrogen: '12', normal: '1', stress: '13' },
        1: { group: 'poacee', Nitrogen: '6', normal: '6', stress: '33' },
        2: { group: 'sorgho', Nitrogen: '11', normal: '28', stress: '12' },
        3: { group: 'triticum', Nitrogen: '19', normal: '6', stress: '1' },
        columns: ['group', 'Nitrogen', 'normal', 'stress']
      }
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      const margin = { top: 10, right: 30, bottom: 20, left: 50 }
      const width = 460 - margin.left - margin.right
      const height = 400 - margin.top - margin.bottom

      // append the svg object to the body of the page
      const svg = d3.select('#my_dataviz')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')')

      // Parse the Data
      d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv')
        .then(function (data) {
          console.log(data)
          // List of subgroups = header of the csv files = soil condition here
          const subgroups = data.columns.slice(1)
          // console.log(subgroups)

          // List of groups = species here = value of the first column called group -> I show them on the X axis
          const groups = d3.map(data, function (d) { return (d.group) })

          // Add X axis
          const x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
          svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x).tickSizeOuter(0))

          // Add Y axis
          const y = d3.scaleLinear()
            .domain([0, 60])
            .range([height, 0])
          svg.append('g')
            .call(d3.axisLeft(y))

          // color palette = one color per subgroup
          const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#ec524b', '#f5b461', '#f3eac2'])

          // stack the data? --> stack per subgroup
          const stack = d3.stack()
            .keys(subgroups)
          const stackedData = stack(data)
          // console.log('test', stackedData)

          // Show the bars
          svg.append('g')
            .selectAll('g')
          // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append('g')
            .attr('fill', function (d) { return color(d.key) })
            .selectAll('rect')
          // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function (d) { return d })
            .enter().append('rect')
            .attr('x', function (d) { return x(d.data.group) })
            .attr('y', function (d) { return y(d[1]) })
            .attr('height', function (d) { return y(d[0]) - y(d[1]) })
            .attr('width', x.bandwidth())
        })
    }
  }
}
</script>
