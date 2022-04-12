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
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: data.yAxis_data,
            show:true,
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

        let utils = {
          parseToInt: function (num) {
            return "" === num ? 0 : parseInt(num)
          }
        }

        let op_record_temp = []
        op_record_temp.push(Object.keys(performance))
        let op_record = op_record_temp[0]       //存储操作记录次数列表
        let mapData = [];//数据
        //let xLabel = ['Accuracy', 'False Positive Rate', 'Specificity',
        // 'False Negative Rate', 'Recall Rate', 'True Positive Rate',
        // 'Sensitivity', 'True Negative Rate', 'False Negative Rate', 'F1 Score']
        let xLabel = ['ACC', 'FPR', 'SPEC', 'FN', 'REC', 'TPR', 'SEN', 'TNR']
        Object.keys(performance).forEach(d => {

          let data = [];
          let preInc = 0;
          let incArr = [];
          let perf = control['Parameter']


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
          top: $('#hotmap_chart').height() * 0.05,
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
          .range([margin.left, width ])
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
          .attr("height",  function(){
              if($('#hotmap_chart').html() == null || $('#hotmap_chart').html().length == 0){
                return rectHeight + 50
              }
              else {
                return rectHeight + 50
              }
          })
        .attr('class','rect_class')


        if (!this.check) {
          svg.append('g')
            .attr("class", "x")
            .attr("transform", `translate(${margin.left *5}, 50 )`)
            .call(d3.axisTop(x))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll("text")
              .style("font-size", "25")
              .attr('x', (t, n) => x(xLabel[n])/10
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


          let prov = svg.append('g')
            .selectAll('g')
            .data(mapData)
            .join('g')
            .attr('class', 'prov')
            .attr("transform", `translate(${margin.left * 2.5 + 20}, ${margin.top })`)

          prov.each(function (d, i) {

            d3.select(this)
              .append('g')
              .selectAll('rect')     //外置矩形
              .data(d => d.data)
              .join('rect')
              .attr('width', x.bandwidth())
              .attr('height', x.bandwidth())
              .attr('x', (t, n) => x(xLabel[n])*1.1 )
              .attr('y', y(op_record[i]) * 2)
              .attr('fill', '#eee')

            d3.select(this)
              .append('g')
              .selectAll('rect')  //内置矩形
              .data(d => d.data)
              .join('rect')
              .attr('width', t => {
                return (t.inc === 0 ? 0 : Math.sqrt(r(t.inc)))
              })
              .attr('height', t => {
                return t.inc === 0 ? 0 : Math.sqrt(r(t.inc))
              })
              .attr('x', (t, n) => x(xLabel[n])*1.1 )
              .attr('y', y(op_record[i]) * 2)
              .attr('fill', t => t.change > 0 ? incColor : t.change < 0 ? decColor : color)
              .attr("transform", t => {
                let innerR = Math.sqrt(r(t.inc))
                let outerR = x.bandwidth()
                return t.inc === 0 ? '' : `translate(${(outerR - innerR) / 2},${(outerR - innerR) / 2})`
              })

            d3.select(this)
              .append('g')
              .selectAll('text')
              .data((d,i) => {

                return d.data[i]
              })
              .join('text')
              .style("font-size", "25")
              .attr('x', (t, n) => x(xLabel[n]) )
              .attr('y', y(op_record[i]) * 2)

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
    overflow-x: hidden;
  }

  #hotmap_chart {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
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
