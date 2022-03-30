<template>
  <div id="sca_location"></div>
</template>

<script>
  import * as echarts from "echarts";
  import Readcsv from "../ToolJs/Readcsv";

  export default {
    name: "pie_location",
    data() {
      return {
        data: null
      }
    },
    methods: {
      draw_sca_location() {
        let myChart = echarts.init(document.getElementById('sca_location'));
        let option = {
          xAxis: {
            // show: true
            show: false
          },
          yAxis: {
            // show: true
            show: false
          },
          grid: {
            bottom: '20%',
            top: '20%',
            left: '25%',
            right: '15%'
          },
          series: [
            {
              name: 'out',
              symbolSize: function (val) {
                return val[2] * 5;
              },

              data: this.data.data,
              itemStyle: {
                color: (params) => {
                  if (params.data[3] == 'malware') {
                    return 'rgb(238,155,166)'
                  } else if (params.data[3] == 'phishing') {
                    return 'rgb(182,148,180)'
                  } else if (params.data[3] == 'Defacement') {
                    return 'rgb(92,91,129)'
                  } else if (params.data[3] == 'spam') {
                    return 'rgb(98,167,175)'
                  } else if (params.data[3] == 'test') {
                    return 'black'
                  } else {
                    return 'rgb(209,213,159)'
                  }

                }
              },
              type: 'scatter',
              emphasis: {
                scale: false,
              }
            },
            {
              name: 'main',
              symbolSize: function (val) {
                return val[2] * 10;
              },
              tooltip: {
                trigger: 'item',
                show: false,
              },
              data: [
                [0, 0, 14, 'spam'],
                [0, 50, 13, 'benign'],
                [50, 0, 9, 'Defacement'],
                [50, 50, 11, 'phishing'],

              ],
              symbol: 'emptyCircle',
              type: 'scatter',
              itemStyle: {
                color: (p) => {
                  if (p.data[3] == 'spam') {
                    return 'rgb(98,167,175)'
                  } else if (p.data[3] == 'benign') {
                    return 'rgb(209,213,159)'
                  } else if (p.data[3] == 'Defacement') {
                    return 'rgb(92,91,129)'
                  } else {
                    return 'rgb(182,148,180)'
                  }
                },
                opacity: .5,

              },
              emphasis: {
                scale: false,
              }
            },
            {
              name: 'malware',
              type: 'scatter',
              symbolSize: 160,
              data: [
                [25, 25, 16, 'malware'],
              ],
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: 'transparent',
                  borderColor: 'rgb(238,155,166)',
                  // opacity: .5,
                  borderWidth: 6,
                },
              },
              emphasis: {
                scale: false,
              }
            },
          ]
        };

        myChart.setOption(option)
        let size = [];
        let orign_size = option.series[2].symbolSize;
        let orign_size1 = option.series[1].data[0][2];
        let orign_size2 = option.series[1].data[1][2];
        let orign_size3 = option.series[1].data[2][2];
        let orign_size4 = option.series[1].data[3][2];
        let datas = [
          [34.24, 28.83, 1, 'center'],
          [25, 25,]
        ];
        let x, y = 0;
        let check = 0;
        myChart.on('mousemove', (p) => {
          // if (p.seriesName == "center") {
          //   size.push('1');
          //   let size_add = Math.round(Math.log(size.length), 2);
          //   console.log(size_add, 'size')
          //
          //   option.series[2].symbolSize = orign_size + size_add * 20;
          //   myChart.setOption(option)
          // }

          let e = event;
          let x1 = e.offsetX;
          let y1 = e.offsetY;
          let a = x1 - x;
          let b = y1 - y;
          let c = Math.sqrt(a * a + b * b);
          let main_size = parseFloat(c.toFixed(2));
          if (p.seriesName == "malware" && check) {
            option.series[2].symbolSize = orign_size + main_size * 10;
            console.log(option.series[2].symbolSize)
          }
          if (p.data[3] == "spam" && check) {
            option.series[1].data[0][2] = orign_size1 + main_size * 0.5;
            console.log(option.series[1].data[0][2])
          }
          if (p.data[3] == "benign" && check) {
            option.series[1].data[1][2] = orign_size2 + main_size * 0.5;
            console.log(option.series[1].data[1][2])
          }
          if (p.data[3] == "Defacement" && check) {
            option.series[1].data[2][2] = orign_size3 + main_size * 0.5;
            console.log(option.series[1].data[2][2])
          }
          if (p.data[3] == "phishing" && check) {
            option.series[1].data[3][2] = orign_size4 + main_size * 0.5;
            console.log(option.series[1].data[3][2])
          }
          myChart.setOption(option);
        })
        myChart.on('click', (p) => {

          console.log(p.seriesName)
          if (p.seriesName == "malware") {
            console.log(123123)
            option.series[2].symbolSize = orign_size;
          }
          if (p.data[3] == "spam") {

            option.series[1].data[0][2] = orign_size1;
          }
          if (p.data[3] == "benign") {
            option.series[1].data[1][2] = orign_size2;
          }
          if (p.data[3] == "Defacement") {
            option.series[1].data[2][2] = orign_size3;
          }
          if (p.data[3] == "phishing") {
            option.series[1].data[3][2] = orign_size4;
          }
          myChart.setOption(option);
        })
        // myChart.on('mouseout', (p) => {
        //   orign_size = option.series[2].symbolSize;
        //   // option.series[2].symbolSize = 160;
        //   size = []
        //   // option.series[0].data = datas;
        //   myChart.setOption(option)
        //
        //   // console.log(size.length)
        // })
        myChart.on('mousedown', (p) => {
          let e = event;
          let x1 = e.offsetX;
          let y1 = e.offsetY;
          x = x1;
          y = y1;
          check = 1;
          // console.log(x, y)
        })
        myChart.on('mouseup', (p) => {
          check = 0;
        })
      }
    },
    mounted() {
      // this.draw_sca_location();
      Readcsv.Read_sca_location();

    },
    watch: {
      sca_location_data: function () {
        this.data = this.sca_location_data;
        this.draw_sca_location();
      }
    },
    computed: {
      sca_location_data() {
        return this.$store.getters.get_sca_location_data;
      }
    }
  }
</script>

<style scoped>
  #sca_location {
    height: 560px;
    width: 660px;
    /*border: 3px solid grey;*/
    position: relative;
    top: 13px;
    left: 5%;
  }
</style>
