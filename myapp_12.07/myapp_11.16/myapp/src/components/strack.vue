<template>
  <div class="bottom_1">
    <div id="barchart">
<!--      <h2> {{ $store.state.selector }} </h2>   从vuex中引用-->
    </div>
  </div>

</template>

<script>
  import * as d3 from 'd3'
  import * as echarts from 'echarts'
  import Readcsv from '../ToolJs/Readcsv'

  export default {
    name: 'bottom_1',
    data() {
      return {
        barData: null,
      }
    },
    methods: {
      randoms(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      },
      draw_bar() {
        let colorlist = ['#CBDCDF', '#B3CBCF','#E8EDEC','#CE848F', '#EFBAC0',
          '#F9F3E1','#EDE9BF' ,'#F7E7E0', '#F7DDC0',
          '#F9BCB2','#EA8991']
        let data = this.barData;
        if (document.getElementById('barchart') == null) {
          return
        }
        echarts.dispose(document.getElementById('barchart'))
        var myChart = echarts.init(document.getElementById('barchart'))
        let option = {
          tooltip: {
            position: 'right',
            trigger: 'item',
            axisPointer: {            // Use axis to trigger tooltip
              type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {
            orient: 'horizontal',
            type: 'scroll',
            data: data.legend_data,
          },
          visualMap: {
            type: 'continuous',
            dimension: 1,
            hoverLink: true,
            course: 'none',
            itemHeight: 120,
            itemWidth: 10,
            calculable: true,
            min: data.visual_data[1],
            max: data.visual_data[0],
            top: 50,
            right: 0,
            align: 'top',
            inRange: {
              // colorLightness: [0.7, 0.4]
              // color: ['#bbb','#7f9eb2']
            },
            outOfRange: {
              color: '#bbb'
            },
            controller: {
              inRange: {
                color: ['#F0BBC1','#FAF3E2', '#CBDCDF']
              }
            }
          },
          grid: {
            left: '0%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',

            data: data.yAxis_data,
          },
          series: []
        }
        let data1 = data.series_data;
        for (let key = 0; key < data1.key_data.length; key++) {
          let num = this.randoms(1,10)
          option.series.push({
            name: data1.key_data[key],
            type: 'bar',
            stack: 'total',
            color: colorlist[key],
            // label:{
            //   show:true
            // },
            emphasis: {
              focus: 'series'
            },
            data: data1.main_data[key]
          })
        }
        myChart.setOption(option)
      },
    },

    mounted() {
      Readcsv.Read_barData()
    },
    computed: {
      control1() {
        return this.$store.getters.get_control1
      },
      bar_data() {
        return this.$store.getters.get_barData
      },
    },
    watch: {
      bar_data: function () {
        this.barData = this.$store.getters.get_barData
        this.draw_bar()
      },
      control1: function () {

      }

    }

  }

</script>

<style scoped>
  .bottom_1 {
    width: 21.3vw;
    border-top: 3px solid rgb(255,255,255);
    border-bottom: 6px solid rgb(255,255,255);
    border-right: 3px solid rgb(255,255,255);
    border-left: 6px solid rgb(255,255,255);
  }

  #barchart {
    width: 98%;
    height: 98%;
  }

</style>
