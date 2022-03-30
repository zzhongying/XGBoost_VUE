<template>
  <div id="div_bottom_2" class="bottom_2">
    <div id="div_1">
      <h4 style="text-align: center;"> DATA FLOW</h4>
      <div id="draw_sunrain">
        <sankey></sankey>
      </div>
    </div>
    <div id="div_2">
      <h4 style="text-align:center;"> OPERATION RECORD </h4>
      <div id="hotmap_chart"></div>
    </div>
    <!--        <button @click="change">chang</button>-->
  </div>

</template>

<script>
  import * as echarts from 'echarts'
  import * as d3 from 'd5'
  import $ from 'jquery'
  import axios from 'axios'
  import Readcsv from '../ToolJs/Readcsv'
  import sankey from "./sankey";

  export default {
    name: 'bottom_2',
    components: {
      sankey,
    },
    data() {
      return {
        // hotData: null,
        lineData: null,
        lit_bar: null,
        check1: 0,
        check2: 0,
        control_dataset: {},
        performance_dataset: {
          //按照['精确率','假阳性率','特异性','假阴性率','召回率','真阳性率','敏感性','真阴性率','漏报率','F1分数']
          //的顺序分布
          '0': [75, 81, 75, 23, 35, 90, 70, 69],
          // '1': [76, 82, 76, 21, 30, 92, 71, 70],
          // '2': [73, 79, 78, 25, 35, 89, 68, 66],
          // '3': [77, 80, 81, 24, 33, 91, 70, 71],
          // '4': [76, 83, 83, 22, 30, 93, 73, 71],
          // 'Operation2': [53, 74, 85, 47, 56, 84, 100, 198, 63, 75],
          // 'Operation3': [53, 74, 85, 47, 56, 84, 100, 198, 63, 75]
        },
        check: 0
      }
    },

    methods: {
      draw_parallel() {
        let myChart = echarts.init(document.getElementById('draw_sunrain'));
        let dataBJ = [
          [1, 55, 9, 56, 0.46, 18, 6, "良"],
          [2, 25, 11, 21, 0.65, 34, 9, "优"],
          [3, 56, 7, 63, 0.3, 14, 5, "良"],
          [4, 33, 7, 29, 0.33, 16, 6, "优"],
          [5, 42, 24, 44, 0.76, 40, 16, "优"],
          [6, 82, 58, 90, 1.77, 68, 33, "良"],
          [7, 74, 49, 77, 1.46, 48, 27, "良"],
          [8, 78, 55, 80, 1.29, 59, 29, "良"],
          [9, 267, 216, 280, 4.8, 108, 64, "重度污染"],
          [10, 185, 127, 216, 2.52, 61, 27, "中度污染"],
          [11, 39, 19, 38, 0.57, 31, 15, "优"],
          [12, 41, 11, 40, 0.43, 21, 7, "优"],
          [13, 64, 38, 74, 1.04, 46, 22, "良"],
          [14, 108, 79, 120, 1.7, 75, 41, "轻度污染"],
          [15, 108, 63, 116, 1.48, 44, 26, "轻度污染"],
          [16, 33, 6, 29, 0.34, 13, 5, "优"],
          [17, 94, 66, 110, 1.54, 62, 31, "良"],
          [18, 186, 142, 192, 3.88, 93, 79, "中度污染"],
          [19, 57, 31, 54, 0.96, 32, 14, "良"],
          [20, 22, 8, 17, 0.48, 23, 10, "优"],
          [21, 39, 15, 36, 0.61, 29, 13, "优"],
          [22, 94, 69, 114, 2.08, 73, 39, "良"],
          [23, 99, 73, 110, 2.43, 76, 48, "良"],
          [24, 31, 12, 30, 0.5, 32, 16, "优"],
          [25, 42, 27, 43, 1, 53, 22, "优"],
          [26, 154, 117, 157, 3.05, 92, 58, "中度污染"],
          [27, 234, 185, 230, 4.09, 123, 69, "重度污染"],
          [28, 160, 120, 186, 2.77, 91, 50, "中度污染"],
          [29, 134, 96, 165, 2.76, 83, 41, "轻度污染"],
          [30, 52, 24, 60, 1.03, 50, 21, "良"],
          [31, 46, 5, 49, 0.28, 10, 6, "优"]
        ];

        var dataGZ = [
          [1, 26, 37, 27, 1.163, 27, 13, "优"],
          [2, 85, 62, 71, 1.195, 60, 8, "良"],
          [3, 78, 38, 74, 1.363, 37, 7, "良"],
          [4, 21, 21, 36, 0.634, 40, 9, "优"],
          [5, 41, 42, 46, 0.915, 81, 13, "优"],
          [6, 56, 52, 69, 1.067, 92, 16, "良"],
          [7, 64, 30, 28, 0.924, 51, 2, "良"],
          [8, 55, 48, 74, 1.236, 75, 26, "良"],
          [9, 76, 85, 113, 1.237, 114, 27, "良"],
          [10, 91, 81, 104, 1.041, 56, 40, "良"],
          [11, 84, 39, 60, 0.964, 25, 11, "良"],
          [12, 64, 51, 101, 0.862, 58, 23, "良"],
          [13, 70, 69, 120, 1.198, 65, 36, "良"],
          [14, 77, 105, 178, 2.549, 64, 16, "良"],
          [15, 109, 68, 87, 0.996, 74, 29, "轻度污染"],
          [16, 73, 68, 97, 0.905, 51, 34, "良"],
          [17, 54, 27, 47, 0.592, 53, 12, "良"],
          [18, 51, 61, 97, 0.811, 65, 19, "良"],
          [19, 91, 71, 121, 1.374, 43, 18, "良"],
          [20, 73, 102, 182, 2.787, 44, 19, "良"],
          [21, 73, 50, 76, 0.717, 31, 20, "良"],
          [22, 84, 94, 140, 2.238, 68, 18, "良"],
          [23, 93, 77, 104, 1.165, 53, 7, "良"],
          [24, 99, 130, 227, 3.97, 55, 15, "良"],
          [25, 146, 84, 139, 1.094, 40, 17, "轻度污染"],
          [26, 113, 108, 137, 1.481, 48, 15, "轻度污染"],
          [27, 81, 48, 62, 1.619, 26, 3, "良"],
          [28, 56, 48, 68, 1.336, 37, 9, "良"],
          [29, 82, 92, 174, 3.29, 0, 13, "良"],
          [30, 106, 116, 188, 3.628, 101, 16, "轻度污染"],
          [31, 118, 50, 0, 1.383, 76, 11, "轻度污染"]
        ];

        var dataSH = [
          [1, 91, 45, 125, 0.82, 34, 23, "良"],
          [2, 65, 27, 78, 0.86, 45, 29, "良"],
          [3, 83, 60, 84, 1.09, 73, 27, "良"],
          [4, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
          [5, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
          [6, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
          [7, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
          [8, 89, 65, 78, 0.86, 51, 26, "良"],
          [9, 53, 33, 47, 0.64, 50, 17, "良"],
          [10, 80, 55, 80, 1.01, 75, 24, "良"],
          [11, 117, 81, 124, 1.03, 45, 24, "轻度污染"],
          [12, 99, 71, 142, 1.1, 62, 42, "良"],
          [13, 95, 69, 130, 1.28, 74, 50, "良"],
          [14, 116, 87, 131, 1.47, 84, 40, "轻度污染"],
          [15, 108, 80, 121, 1.3, 85, 37, "轻度污染"],
          [16, 134, 83, 167, 1.16, 57, 43, "轻度污染"],
          [17, 79, 43, 107, 1.05, 59, 37, "良"],
          [18, 71, 46, 89, 0.86, 64, 25, "良"],
          [19, 97, 71, 113, 1.17, 88, 31, "良"],
          [20, 84, 57, 91, 0.85, 55, 31, "良"],
          [21, 87, 63, 101, 0.9, 56, 41, "良"],
          [22, 104, 77, 119, 1.09, 73, 48, "轻度污染"],
          [23, 87, 62, 100, 1, 72, 28, "良"],
          [24, 168, 128, 172, 1.49, 97, 56, "中度污染"],
          [25, 65, 45, 51, 0.74, 39, 17, "良"],
          [26, 39, 24, 38, 0.61, 47, 17, "优"],
          [27, 39, 24, 39, 0.59, 50, 19, "优"],
          [28, 93, 68, 96, 1.05, 79, 29, "良"],
          [29, 188, 143, 197, 1.66, 99, 51, "中度污染"],
          [30, 174, 131, 174, 1.55, 108, 50, "中度污染"],
          [31, 187, 143, 201, 1.39, 89, 53, "中度污染"]
        ];

        var schema = [
          {name: 'date', index: 0, text: '日期'},
          {name: 'AQIindex', index: 1, text: 'AQI'},
          {name: 'PM25', index: 2, text: 'PM2.5'},
          {name: 'PM10', index: 3, text: 'PM10'},
          {name: 'CO', index: 4, text: ' CO'},
          {name: 'NO2', index: 5, text: 'NO2'},
          {name: 'SO2', index: 6, text: 'SO2'},
          {name: '等级', index: 7, text: '等级'}
        ];

        var lineStyle = {
          normal: {
            width: 1,
            opacity: 0.5
          }
        };
        let option = {
          // grid: {
          //   left: '0%',
          //   top: '5%',
          //   bottom: '0%',
          //   containLabel: true
          // },
          parallelAxis: [
            {dim: 0, name: schema[0].text, inverse: true, max: 31, nameLocation: 'start'},
            {dim: 1, name: schema[1].text},
            {dim: 2, name: schema[2].text},
            {dim: 3, name: schema[3].text},
            {dim: 4, name: schema[4].text},
            {dim: 5, name: schema[5].text},
            {dim: 6, name: schema[6].text},
            {
              dim: 7, name: schema[7].text,
              type: 'category', data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
            }
          ],
          // visualMap: {
          //   show: true,
          //   min: 0,
          //   max: 250,
          //   right: 0,
          //   bottom: 30,
          //   dimension: 2,
          //   itemHeight: 120,
          //   itemWidth: 10,
          //   calculable: true,
          //   inRange: {
          //     color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
          //   },
          //   text: ['PM 2.5', ''],
          //   textGap: 20,
          //   textStyle: {
          //     color: 'black'
          //   }
          // },
          parallel: {
            top: 50,
            left: '5%',
            right: '10%',
            bottom: 15,
            parallelAxisDefault: {
              type: 'value',
              name: 'AQI指数',
              nameLocation: 'end',
              nameGap: 20,
              nameTextStyle: {
                color: 'black',
                fontSize: 12
              },
              axisLine: {
                lineStyle: {
                  color: '#aaa'
                }
              },
              axisTick: {
                lineStyle: {
                  color: '#777'
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: 'black',
                }
              }
            }
          },
          series: [
            {
              name: '北京',
              type: 'parallel',
              lineStyle: lineStyle,
              data: dataBJ
            },
            {
              name: '上海',
              type: 'parallel',
              lineStyle: lineStyle,
              data: dataSH
            },
            {
              name: '广州',
              type: 'parallel',
              lineStyle: lineStyle,
              data: dataGZ
            }
          ]
        };
        myChart.on('click', (params) => {
          console.log('ss')
        })

        myChart.setOption(option)

      },
      change() {
        let datass = {
          'legend_data': ['Tom'],
          'series_data': [[0, 11], [8, 7], [13, 0]]
        }
        this.$store.commit('set_lineData', datass)
      },

      draw_hot() {
        let data = this.hotData
        if (document.getElementById('hotmap_chart') == null) {
          return
        }
        echarts.dispose(document.getElementById('hotmap_chart'))
        let myChart = echarts.init(document.getElementById('hotmap_chart'));
        let option = {
          tooltip: {
            position: 'top'
          },
          grid: {
            height: '85%',
            top: '7%',
            left: '15%',
          },
          xAxis: {
            type: 'category',
            data: data.xAxis_data,
            axisLabel: {
              interval: 0,
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: data.yAxis_data,
          },
          visualMap: {
            type: 'continuous',
            itemHeight: 120,
            itemWidth: 10,
            min: data.visual_data[1],
            max: data.visual_data[0],
            calculable: true,
            top: 50,
            right: 0,
            inRange: {
              color: ['rgba(250,247,247,0.5)', '#F0BBC1', '#FAF3E2', '#CBDCDF', '#B3CBCF']
            }
          },
          series: [{
            name: 'Punch Card',
            type: 'heatmap',
            data: data.series_data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        myChart.setOption(option)
      },

      draw_sunrain(performance, control) {
        if (!this.check) {
          $("#hotmap_chart").empty();
        }
        console.log(performance, control)
        let utils = {
          parseToInt: function (num) {
            return "" === num ? 0 : parseInt(num)
          }
        }

        let op_record_temp = []
        op_record_temp.push(Object.keys(performance))
        let op_record = op_record_temp[0]       //存储操作记录次数列表
        let mapData = [];//数据
        //let xLabel = ['Accuracy', 'False Positive Rate', 'Specificity', 'False Negative Rate', 'Recall Rate', 'True Positive Rate', 'Sensitivity', 'True Negative Rate', 'False Negative Rate', 'F1 Score']
        let xLabel = ['ACC', 'FPR', 'SPEC', 'FN', 'REC', 'TPR', 'SEN', 'TNR']
        Object.keys(performance).forEach(d => {

          let data = [];
          let preInc = 0;
          let incArr = [];
          let perf = control['Parameter']
          console.log(performance)

          for (let i = 0; i < 8; i++) {   //10为性能分析中的个数
            let min = -50;
            let max = 20;
            let inc =  Math.abs(Math.floor(Math.random() * (max - min + 1)) + min);
// and the formula is:
            let random1 = Math.abs(Math.floor(Math.random() * (max - min + 1)) + min);

            var num = Math.floor(Math.random() * 10) + 1;

            let change = inc - 20;
            incArr.push(inc)
            preInc = inc
            data.push({
              // random1,
              inc,
              change,   //同一行之间数值与前一个的差值
              perf
            })
          }
          mapData.push({
            data,
            max: d3.max(incArr)    //矩形下方数字最大的
          });
          // console.log(mapData)               //最终数据
        })

        //边距
        const margin = ({
          top: $('#hotmap_chart').height() * 0.15,
          right: 0,
          bottom: 30,
          left: $('#hotmap_chart').width() * 0.015
        })

        //矩形边长
        const rectHeight = 40;//大矩形一个单位长
        const padding = 10;//内置矩形边长
        const width = rectHeight * 9;//大矩形长
        const height = (rectHeight + padding) * mapData.length;

        const incColor = '#EFBAC0';
        const decColor = '#a5bbbf';
        const color = '#a5bbbf';

        //规模，标签
        const x = d3.scaleBand()
          .domain(xLabel)
          .range([margin.left, width - margin.right])
          .paddingInner(0.1)
          .paddingOuter(0.2)

        const x1 = d3.scaleBand()
          .domain(xLabel)
          .range([margin.left, width - margin.right])
          .padding(0.05)


        const y = d3.scaleBand()
          .domain(op_record)
          .range([margin.top, height - margin.bottom])
          .paddingInner(0.2)

        //标刻线
        const r = d3.scaleLinear()
          .domain([1, d3.max(mapData.map(d => d.max))])
          //.domain([1, 178])
          .rangeRound([5 * 5, Math.pow(x.bandwidth(), 2)])
        //添加画布
        const svg = d3.select('#hotmap_chart')
          .append('svg')
          .attr("width", $('#hotmap_chart').width() - 10)
          .attr("height", height * 1)
        console.log(d3, 'dddd')
        if (!this.check) {
          svg.append('g')
            .attr("class", "x")
            .attr("transform", `translate(${margin.left * 2.5 * 1.2},${margin.top - 10})`)
            .call(d3.axisTop(x))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll("text")
              .style("font-size", "10")
              .attr('x', (t, n) => x(xLabel[n]) / 30 - 30
              )
              .attr('y', -15)
            )
          this.check = 1;
        }
        $(".x line").remove()
        let opt = this.click_num;

        function sunrain() {


          svg.append('g')
            .attr("class", "y")
            .attr("transform", `translate(${margin.left * 3.5},0)`)
            .call(d3.axisLeft(y)
              .tickSize(0))
            .call(g => g.select(".domain").remove())
            // .call(g => g.selectAll("text")
            //   .style("font-size", "11")
            //   .style("font-weight", 'bold')
            //   .attr('dx', x.bandwidth() - 30)
            //   .attr('dy', y.bandwidth() + 10)
            //
            // )
            .call(g => g.selectAll("text")
              .style("font-size", "11")
              .style("font-weight", 'bold')
              .attr('dx', x.bandwidth() - 30)
              .attr('dy', y.bandwidth() + 10)
              .text("")
            )
          // $('.x').remove()
          console.log(mapData, 'mmmmm');

          let prov = svg.append('g')
            .selectAll('g')
            .data(mapData)
            .join('g')
            .attr('class', 'prov')
            .attr("transform", `translate(${margin.left * 2.5 - 10},-${margin.top - 5})`)

          prov.each(function (d, i) {

            d3.select(this)
              .append('g')
              .selectAll('rect')     //外置矩形
              .data(d => d.data)
              .join('rect')
              .attr('width', x.bandwidth() * 0.85)
              .attr('height', x.bandwidth())
              .attr('x', (t, n) => x(xLabel[n]) * 0.85)
              .attr('y', y(op_record[i]) * 2)
              .attr('fill', '#eee')

            d3.select(this)
              .append('g')
              .selectAll('rect')  //内置矩形
              .data(d => d.data)
              .join('rect')
              .attr('width', t => {
                return (t.inc === 0 ? 0 : Math.sqrt(r(t.inc))) * 0.85
              })
              .attr('height', t => {
                return t.inc === 0 ? 0 : Math.sqrt(r(t.inc))
              })
              .attr('x', (t, n) => x(xLabel[n]) * 0.85)
              .attr('y', y(op_record[i]) * 2)
              .attr('fill', t => t.change > 0 ? incColor : t.change < 0 ? decColor : color)
              .attr("transform", t => {
                let innerR = Math.sqrt(r(t.inc))
                let outerR = x.bandwidth()
                return t.inc === 0 ? '' : `translate(${(outerR - innerR) / 2},${(outerR - innerR) / 2})`
              })

            // d3.select(this)
            //   .append('g')
            //   .selectAll('text')
            //   .data(d => d.data)
            //   .join('text')
            //   .attr('x', (t, n) => (x1(xLabel[n]) * 1.3) +250)
            //   .attr('y', y(op_record[i]) * 1.3 + padding / 1.5)
            //   .attr('dx', x.bandwidth() / 2)
            //   .attr('dy', y.bandwidth() + 12)
            //   .text((t, i) => {
            //     return t.perf[i]
            //     // return '123'
            //   })
            //   .attr('text-anchor', 'middle')
            //   .style("font-size", "10")


            // d3.select(this)
            //   .append('g')
            //   .attr("transform", `translate(${-x.bandwidth() / 2},${y.bandwidth() * 3 -5 })`)
            //   .selectAll('text')
            //   .data(d => d.data)
            //   .join('text')
            //   .attr('x', (t, n) => (x(xLabel[n]) * 1 + rectHeight * 10) -200 )
            //   .attr('y', y(op_record[i]) * 1.15-5)
            //   .attr('dx', 0)
            //   .attr('dy', 0)
            //   .text((t, i) => {
            //     // return t.perf[i]
            //     return '123'
            //   })
            //   .attr('text-anchor', 'left')
            //   .style("font-size", "10")
            //   .style('z-index',9999)

          })
        }

        sunrain()

      }

    },
    mounted() {
      // this.draw_parallel();

    },
    computed: {
      control1() {
        return this.$store.getters.get_control1;
      },
      // hot_data() {
      //   return this.$store.getters.get_hotData;
      // },
      line_data() {
        return this.$store.getters.get_lineData;
      },
      lit_bar_data() {
        return this.$store.getters.get_lit_bar;
      },
      control2() {
        return this.$store.getters.get_control2;
      },
      click_num() {
        return this.$store.getters.get_click_num;
      }
    }
    ,
    watch: {

      // hot_data: function () {
      //   this.hotData = this.$store.getters.get_hotData;
      //   this.draw_hot();
      // },
      control1: function () {

      },
      line_data: function () {
        this.check2 = 1;
        this.lineData = this.$store.getters.get_lineData;
        //this.draw_line();
      },
      lit_bar_data: function () {
        this.check1 = 1;
        this.lit_bar = this.$store.getters.get_lit_bar;
        //this.draw_line();
      },
      control2: function () {
        this.control_dataset = this.$store.getters.get_control2
        this.draw_sunrain(this.performance_dataset, this.control2)
        // console.log(this.control2, 'this')
      }
    },
  }
</script>

<style scoped>
  .bottom_2 {
    display: flex;
    width: 79vw;
    /*margin: 0 0 0 0.2%;*/
    border-top: 6px solid rgb(255, 255, 255);
    border-bottom: 6px solid rgb(255, 255, 255);
    /*border-left: 10px solid rgb(255,255,255);*/
  }

  #div_1 {
    height: 100%;
    width: 72.5%;
    border-left: 10px solid rgb(255, 255, 255);

    /*background-color: #5e5e5f;*/
  }

  #div_2 {
    height: 100%;
    width: 27.5%;
    border-left: 10px solid rgb(255, 255, 255);
    margin-top: 0;
    /*background-color: #00416A;*/
  }

  #draw_sunrain {
    height: 100%;
    width: 100%;
    margin-top: 0;
    overflow-y: scroll;
  }

  #hotmap_chart {
    height: 100%;
    width: 100%;
    overflow: auto
  }

  h4 {
    font-family: 微软雅黑;
    background-color: rgb(242, 242, 242);
    padding: 3px 3px;
    border-bottom: 2px solid rgb(200, 200, 200);
    display: block;
    margin:0
  }

</style>
