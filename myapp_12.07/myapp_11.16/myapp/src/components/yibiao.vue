<template>
  <div id="panel" ref="panel"></div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: "yibiao",
    data(){
      return {}
    },
    props:{    //父传子props，子传父$emit自定义事件
      msg:{
        type:Array,
        require: true
      }
    },
    methods: {
      // draw_line() {
      //
      //   let data2 = this.lineData
      //   let data3 = this.lit_bar
      //   let colorlist = ['#CBDCDF', '#B3CBCF', '#E8EDEC', '#CE848F', '#EFBAC0',
      //     '#F9F3E1', '#EDE9BF', '#F7E7E0', '#F7DDC0',
      //     '#F9BCB2', '#EA8991']
      //   if (document.getElementById('div_2') == null) {
      //     return
      //   }
      //   echarts.dispose(document.getElementById('div_1'))
      //   let myChart = echarts.init(document.getElementById('div_1'))
      //   let option = {
      //     tooltip: {
      //       position: 'top',
      //       formatter: function (params) {
      //         let data = params.data;
      //         if (params.seriesType == 'line') {
      //           return 'x:' + data[0] + '<br/>' +
      //             'y:' + data[1]
      //         } else {
      //           return 'name:' + params.name + '<br/>' +
      //             'value:' + params.data
      //         }
      //       },
      //     },
      //     grid: {
      //       left: '10%',
      //       height: '82%',
      //       top: '12%',
      //       containLabel: true
      //     },
      //     xAxis: [{
      //       name: 'Precision',
      //       nameLocation: 'center',
      //       min: 0.8,
      //       max: 1.2,
      //       nameTextStyle: {
      //         padding: [6, 0, 0, 0],
      //         fontWeight: 'bold'
      //       },
      //       axisLine: {
      //         onZero: true
      //       },
      //       type: 'value',
      //     },
      //     ],
      //     yAxis: [{
      //       name: 'Recall',
      //       nameLocation: 'center',
      //       nameTextStyle: {
      //         padding: [0, 0, 12, 0],
      //         fontWeight: 'bold'
      //       },
      //       type: 'value',
      //     },
      //       {
      //         type: 'value',
      //       }],
      //     legend: {
      //       type: 'scroll',
      //       data: [],
      //       icon: 'circle'
      //     },
      //     series: [
      //       // {
      //       //   name: 'Main',
      //       //   type: 'line',
      //       //   emphasis: {
      //       //     focus: 'series'
      //       //   },
      //       //   color: '#eea2a4',
      //       //   smooth: true,
      //       //   data: data1
      //       // },
      //
      //     ]
      //   }
      //   if (this.check2) {
      //     for (let key = 0; key < data2.length; key++) {
      //       let main_data = data2[key]
      //       option.legend.data.push(
      //         main_data.legend_data[0]
      //       );
      //       option.series.push({
      //         name: main_data.legend_data[0],
      //         type: 'line',
      //         // symbol:'none',
      //         color: colorlist[key],
      //         emphasis: {
      //           focus: 'series'
      //         },
      //         smooth: true,
      //         data: main_data.series_data,
      //       })
      //     }
      //   }
      //   if (this.check1) {
      //     option.xAxis.push({
      //         type: 'category',
      //         show: false,
      //         data: data3.xAxis_data
      //       }
      //     )
      //     option.series.push({
      //       name: 'shuxing',
      //       type: 'bar',
      //       emphasis: {
      //         focus: 'self'
      //       },
      //       color: '#B6C9D8',
      //       xAxisIndex: 1,
      //       yAxisIndex: 1,
      //       data: data3.series_data
      //     })
      //   }
      //   myChart.setOption(option)
      //   myChart.on('click', (params) => {
      //     let commit = this.$store.getters.get_recordData;
      //     let key = params.seriesIndex
      //
      //     this.$store.commit('set_control1', commit[key])
      //     // console.log(commit, 'sssssss')
      //
      //   })
      // },
      draw_panel() {
        let myChart = echarts.init(this.$refs.panel)
        var _panelImageURL = 'panel.png';
        var _animationDuration = 1000;
        var _animationDurationUpdate = 1000;
        var _animationEasingUpdate = 'quarticInOut';
        var _valOnRadianMax = 100;
        var _outerRadius = 30;
        var _innerRadius = 25;
        var _pointerInnerRadius = 10;
        var _insidePanelRadius = 20;
        var _currentDataIndex = 0;

        function renderItem(params, api) {
          var valOnRadian = api.value(1);
          var coords = api.coord([api.value(0), valOnRadian]);
          var polarEndRadian = coords[3];
          var imageStyle = {
            image: _panelImageURL,
            x: params.coordSys.cx - _outerRadius,
            y: params.coordSys.cy - _outerRadius,
            width: _outerRadius * 2,
            height: _outerRadius * 2
          };

          return {
            type: 'group',
            children: [{
              type: 'image',
              style: imageStyle,
              clipPath: {
                type: 'sector',
                shape: {
                  cx: params.coordSys.cx,
                  cy: params.coordSys.cy,
                  r: _outerRadius,
                  r0: _innerRadius,
                  startAngle: 0,
                  endAngle: -polarEndRadian,
                  transition: 'endAngle',
                  enterFrom: {endAngle: 0}
                }
              }
            }, {
              type: 'image',
              style: imageStyle,
              clipPath: {
                type: 'polygon',
                shape: {
                  points: makePionterPoints(params, polarEndRadian)
                },
                extra: {
                  polarEndRadian: polarEndRadian,
                  transition: 'polarEndRadian',
                  enterFrom: {polarEndRadian: 0}
                },
                during: function (apiDuring) {
                  apiDuring.setShape(
                    'points',
                    makePionterPoints(params, apiDuring.getExtra('polarEndRadian'))
                  );
                }
              }
            }, {
              type: 'circle',
              shape: {
                cx: params.coordSys.cx,
                cy: params.coordSys.cy,
                r: _insidePanelRadius
              },
              style: {
                fill: '#ffffff',
                shadowBlur: 25,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(76,107,167,0.4)'
              }
            }, {
              type: 'text',
              extra: {
                valOnRadian: valOnRadian,
                transition: 'valOnRadian',
                enterFrom: {valOnRadian: 0}
              },
              style: {
                text: makeText(valOnRadian),
                fontSize: 15,
                fontWeight: 50,
                x: params.coordSys.cx,
                y: params.coordSys.cy,
                fill: '#69b1ba',
                align: 'center',
                verticalAlign: 'middle',
                enterFrom: {opacity: 0}
              },
              during: function (apiDuring) {
                apiDuring.setStyle('text', makeText(apiDuring.getExtra('valOnRadian')));
              }
            }]
          };
        }

        function convertToPolarPoint(renderItemParams, radius, radian) {
          return [
            Math.cos(radian) * radius + renderItemParams.coordSys.cx,
            -Math.sin(radian) * radius + renderItemParams.coordSys.cy
          ];
        }

        function makePionterPoints(renderItemParams, polarEndRadian) {
          return [
            convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
            convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian + Math.PI * 0.03),
            convertToPolarPoint(renderItemParams, _pointerInnerRadius, polarEndRadian)
          ];
        }

        function makeText(valOnRadian) {
          // Validate additive animation calc.
          if (valOnRadian < -10) {
            alert('illegal during val: ' + valOnRadian);
          }
          return (valOnRadian / _valOnRadianMax * 100).toFixed(0) + '%';
        }

        let option = {
          animationEasing: _animationEasingUpdate,
          animationDuration: _animationDuration,
          animationDurationUpdate: _animationDurationUpdate,
          animationEasingUpdate: _animationEasingUpdate,
          dataset: {
            // source: [[1, 15]]
            source:[this.msg],
          },

          tooltip: {
            position:'left'
          },
          angleAxis: {
            type: 'value',
            startAngle: 0,
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false},
            splitLine: {show: false},
            min: 0,
            max: _valOnRadianMax
          },
          radiusAxis: {
            type: 'value',
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false},
            splitLine: {show: false}
          },
          polar: {},
          series: [{
            type: 'custom',
            coordinateSystem: 'polar',
            renderItem: renderItem
          },]
        }
        myChart.setOption(option)

      }

    },
    mounted() {
      this.draw_panel();
      // console.log(this.msg)

    },
    computed:{
    }
  }
</script>

<style scoped>
#panel{
  height: 8vh;
  width: 5vw;
  padding: 0;
  margin: 0;
}
</style>
