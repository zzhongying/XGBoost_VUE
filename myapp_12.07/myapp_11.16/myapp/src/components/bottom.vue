<template>
  <div class="bottom_1">
    <div id="barchart"></div>
  </div>

</template>

<script>
  import * as d3 from 'd3'
  import * as echarts from 'echarts'
  import Readcsv from '../ToolJs/Readcsv'

  export default {
    name: 'bottom_1',
    data () {
      return {
        barData: null,
      }
    },
    methods: {
      draw_bar () {

        let data = this.barData
        if (document.getElementById('barchart') == null) {
          return
        }
        echarts.dispose(document.getElementById('barchart'))
        var myChart = echarts.init(document.getElementById('barchart'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: data.legend_data,
            type: 'scroll',
          },
          grid: {
            left: '0',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },
          // dataZoom: [
          //   {
          //     type: 'slider',
          //     show: true,
          //     xAxisIndex: [0],
          //     start: 5,
          //     end: 20,
          //     height: 10
          //   },
          //   {
          //     type: 'inside',
          //     xAxisIndex: [0],
          //     start: 5,
          //     end: 20,
          //   },
          // ],
          visualMap: {
            type: 'continuous',
            dimension: 1,
            hoverLink: true,
            text: ['High', 'Low'],
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
              colorLightness: [0.7, 0.4]
            },
            outOfRange: {
              color: '#bbb'
            },
            controller: {
              inRange: {
                color: '#7f9eb2'
              }
            },
          },
          xAxis: [
            {
              type: 'category',
              data: data.xAxis_data,
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        }
        let data1 = this.barData.series_data;
        for (let key =0;key<data1.key_data.length;key++){
            option.series.push({
              name: data1.key_data[key],
              type: 'bar',
              stack: 'total',
              emphasis: {
                focus: 'series'
              },
              data: data1.main_data[key]
            })
        }
        myChart.setOption(option)


      },

    },

    mounted () {
      Readcsv.Read_barData()
    },
    computed: {
      control1 () {
        return this.$store.getters.get_control1
      },
      bar_data () {
        return this.$store.getters.get_barData
      },
    },
    watch: {
      bar_data: function () {
        this.barData = this.$store.getters.get_barData
        this.draw_bar()
      },
      control1: function () {
        Readcsv.Read_barData('bar_test2')
      }

    }

  }


</script>

<style scoped>
  .bottom_1 {
    width: 48vw;
    border-top:3px solid rgb(255,255,255);
    border-bottom:6px solid rgb(255,255,255);
    border-right: 3px solid rgb(255,255,255);
    border-left: 6px solid rgb(255,255,255);
  }

  #barchart {
    width: 98%;
    height: 98%;
  }

</style>
