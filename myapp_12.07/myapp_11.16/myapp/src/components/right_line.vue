<template>
  <div class="div_right">
    <div id="div1" ref="chart1">
      <!--      <button @click="change">change</button>-->
      <div id="others"></div>
      <div id="panels">
        <selector></selector>
      </div>
    </div>
    <div id="div2" ref="chart2">
      <!--      <button @click="change">change</button>-->
      <!--      <button @click="change1">Back</button>-->
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import * as d3 from 'd3'
  import Readcsv from '../ToolJs/Readcsv'
  import selector from "./selector";

  export default {
    name: 'div_right',
    components: {    //注册引入的组件
      selector
    },
    data() {
      return {
        // data:[[1, 12]],
        arcData1: null,
        barData1: null,
      }
    },
    methods: {
      change() {
        Readcsv.Read_selector('learning2');
      },
      change1() {
        this.$store.commit('set_control1', ['1234', '341', 'chris'])
      },
      draw_arc(index) {
        if (document.getElementById('others') == null) {
          return
        }
        echarts.dispose(document.getElementById('others'))
        let myChart = echarts.init(document.getElementById('others'))
        let option = {
          tooltip: {
            position: 'top',
            formatter: function (params) {
              return 'x:' + params.data[0] + '<br/>' +
                'y:' + params.data[1]
            },
          },
          grid: {
            right: '3%',
            height: '80%',
            left: '8%',
            top: '12%',
            containLabel: true
          },
          xAxis: [{
            name: 'Model Complexity',
            nameLocation: 'center',
            nameTextStyle: {
              padding: [6, 0, 0, 0],
              fontWeight: 'bold'
            },
            axisLine: {
              onZero: true
            },
            type: 'value',
          },
          ],
          yAxis: [{
            name: 'Error',
            nameLocation: 'center',
            nameTextStyle: {
              padding: [0, 0, 12, 0],
              fontWeight: 'bold'
            },
            type: 'value',
          }],
          legend: {
            type: 'scroll',
            data: ['Training', 'Validation'],
            icon: 'circle'
          },
          series: [
            {
              name: 'Training',
              type: 'line',
              symbol: 'none',
              emphasis: {
                focus: 'series'
              },
              color: '#CCDDDF',
              smooth: true,
              data: this.arcData1[index].series_data.Training
            },
            {
              name: 'Validation',
              type: 'line',
              symbol: 'none',
              emphasis: {
                focus: 'series'
              },
              color: '#F0BBC1',
              smooth: true,

              data: this.arcData1[index].series_data.Validation
            },
          ]
        }
        myChart.setOption(option)
      },
      draw_control2() {
        let data = this.barData1
        if (document.getElementById('div2') == null) {
          return
        }
        echarts.dispose(document.getElementById('div2'))
        var barchart = echarts.init((this.$refs.chart2))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['推荐参数', '实际参数'],
            // data: data.legend_data,
          },
          grid: {
            top: '14%',
            left: '2%',
            right: '4%',
            bottom: '0.1%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'value',
              // formatter(params){
              //   if(params<0){
              //     return -params
              //   }
              //   else{
              //     return params
              //   }
              // }
            },
          ],
          yAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              data: ['Eta_', 'maxdepth', 'minchildweight', 'gamma_', 'subsample_']
              // data: data.yAxis_data,
            }
          ],
          series: [
            {
              name: '推荐参数',
              type: 'bar',
              color: '#CCDDDF',
              label: {
                show: true,
                position: 'inside'
              },
              emphasis: {
                focus: 'series'
              },
              data: [0.3, 6, 1, 0.8, 0.7, 0.1, 0.5, 0.2],
            },
          ]
        }
        option.series.push({
          name: '实际参数',
          type: 'bar',
          color: '#F0BBC1',
          label: {
            show: true,
            position: 'inside'
          },
          emphasis: {
            focus: 'series'
          },
          data: this.barData1,
          // data: data.series_data[1],
        })
        barchart.setOption(option)
      },
    },
    mounted() {
      Readcsv.Read_selector()
      this.draw_control2()

    },
    watch: {
      control2: function () {
        this.barData1 = this.$store.getters.get_control2
        this.draw_control2()
      },
      selector: function () {
        this.arcData1 = this.selector
        let index = this.arcData1.length - 1;
        this.draw_arc(index)
      }

    },
    computed: {
      control1() {
        return this.$store.getters.get_control1
      },
      control2() {
        return this.$store.getters.get_control2
      },
      selector() {
        return this.$store.getters.get_selector
      }
    }
  }
</script>

<style scoped>
  .div_right {
    width: 22.5vw;
    /*margin: 0;*/
    /*padding: 0.4%;*/
    border-top: 3px solid rgb(255,255,255);
    border-bottom: 3px solid rgb(255,255,255);
    border-right: 6px solid rgb(255,255,255);
    border-left: 6px solid rgb(255,255,255);
  }

  #div1, #div2 {
    height: 49%;
    width: 100%;
  }

  #div1 {
    border-bottom: 6px solid rgb(255,255,255);
    position: relative;
  }

  #div2 {
    /*background-color: aqua;*/
    z-index: -100 !important;
  }

  #panels {
    position: absolute;
    top: 0;
    right: 0;
    height: 2vh;
    width: 5vw;
  }

  #others {
    width: 17.5vw;
    height: 100%;
  }
</style>
