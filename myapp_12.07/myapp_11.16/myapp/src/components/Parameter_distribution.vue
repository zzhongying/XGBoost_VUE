<template>
  <div class="bottom_1">
    <h4>PARAMETER DISTRIBUTION</h4>
    <div id="scatter_chart">
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import * as echarts from 'echarts'
  import $ from 'jquery'
  import Readcsv from '../ToolJs/Readcsv'
  import Selector from "./selector"

  export default {
    name: "bottom_1",
    // components: {select},
    data() {
      return {
        data_right: [],
      }
    },
    methods: {
      // draw_scatter() {
      //   echarts.dispose(document.getElementById('scatter_chart'))
      //   let myChart = echarts.init(document.getElementById('scatter_chart'));
      //   // 为echarts对象加载数据
      //   let option = {
      //     // title: {
      //     //     text: '频率幅值图'
      //     // },
      //     grid: [  //将视图分成5个区域
      //       {
      //         left: '9%',
      //         width: '16%'
      //       },
      //       {
      //         left: '25%',
      //         width: '16%'
      //       },
      //       {
      //         left: '41%',
      //         width: '16%'
      //       },
      //       {
      //         left: '57%',
      //         width: '16%'
      //       },
      //       {
      //         left: '73%',
      //         width: '16%'
      //       },
      //     ],
      //     tooltip: {},
      //     legend: {
      //       orient: 'horizontal',
      //       //data:["SMS_malware", "Risk_software", "Bank_malware", "Benign_application","Advertising_software"],
      //       data: ["malware", "spam", "benign", "Defacement", "phishing"],
      //       textStyle: {  // 图列内容样式
      //         color: '#000',  // 字体颜色
      //       },
      //       x: 'left',//图例位置，设置right发现图例和文字位置反了，设置一个数值就好了
      //       y: 'top',//延Y轴居中
      //       marginBottom: '5px',
      //     },
      //     xAxis: [
      //       {
      //         type: 'value',
      //         //zlevel: 0,
      //         gridIndex: 0,  //使用第一个区域
      //         interval: 25,
      //         splitLine: {
      //           show: false,  //不显示网格线
      //         },
      //       },
      //       {
      //         type: 'value',
      //         position: 'bottom',
      //         // min: 0,
      //         //zlevel: 1,
      //         gridIndex: 1,  //使用第二个区域
      //         interval: 25,
      //         axisLine: {
      //           show: true,  //显示轴线
      //           color: 'red'
      //         },
      //         show: true,  //显示X轴
      //         splitLine: {
      //           show: false,
      //         },
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 0,
      //         position: 'bottom',
      //         min: 0,
      //         //zlevel: 1,
      //         gridIndex: 2,  //使用第二个区域
      //         interval: 25,
      //         axisLine: {
      //           show: true,  //显示轴线
      //           color: 'red'
      //         },
      //         show: true,  //显示X轴
      //         splitLine: {
      //           show: false,
      //         },
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 0,
      //         position: 'bottom',
      //         min: 0,
      //         //zlevel: 1,
      //         gridIndex: 3,  //使用第二个区域
      //         interval: 25,
      //         axisLine: {
      //           show: true,  //显示轴线
      //           color: 'red'
      //         },
      //         show: true,  //显示X轴
      //         splitLine: {
      //           show: false,
      //         },
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 0,
      //         position: 'bottom',
      //         min: 0,
      //         //zlevel: 1,
      //         gridIndex: 4,  //使用第二个区域
      //         interval: 25,
      //         axisLine: {
      //           show: true,  //显示轴线
      //           color: 'red'
      //         },
      //         show: true,  //显示X轴
      //         splitLine: {
      //           show: false,
      //         },
      //       },
      //     ],
      //     yAxis: [
      //       {
      //         type: 'value',
      //         //zlevel: 0,
      //         max: 1,
      //         gridIndex: 0,
      //         interval: 20,
      //         splitLine: {
      //           show: false
      //         },
      //         show:false
      //       },
      //       {
      //         type: 'value',
      //         zlevel: 1,
      //         gridIndex: 1,
      //         min: 0,
      //         max: 100,
      //         interval: 100,
      //         axisLabel: {
      //           show: true
      //         },
      //         axisLine: {
      //           show: false
      //         },
      //         splitLine: {
      //           show: false
      //         },
      //         show: false  //第二条Y轴不显示
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 1,
      //         gridIndex: 2,
      //         min: 0,
      //         max: 100,
      //         interval: 500,
      //         axisLabel: {
      //           show: false
      //         },
      //         axisLine: {
      //           show: false
      //         },
      //         splitLine: {
      //           show: false
      //         },
      //         show: false  //第二条Y轴不显示
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 1,
      //         gridIndex: 3,
      //         min: 0,
      //         max: 100,
      //         interval: 500,
      //         axisLabel: {
      //           show: false
      //         },
      //         axisLine: {
      //           show: false
      //         },
      //         splitLine: {
      //           show: false
      //         },
      //         show: false  //第二条Y轴不显示
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 1,
      //         gridIndex: 4,
      //         min: 0,
      //         max: 1,
      //         interval: 500,
      //         axisLabel: {
      //           show: false
      //         },
      //         axisLine: {
      //           show: false
      //         },
      //         splitLine: {
      //           show: false
      //         },
      //         show: false  //第二条Y轴不显示
      //       },
      //     ],
      //     series: this.series_Data.data,
      //   };
      //   myChart.setOption(option);
      //
      // },
    },
    mounted() {
      // Readcsv.Read_barData()
    },
    computed: {
      // control2() {
      //   return this.$store.getters.get_control2;
      // },
      // sca_right() {
      //   return this.$store.getters.get_sca_right;
      // },
      // click_num() {
      //   return this.$store.getters.get_click_num;
      // },
      // series_Data(){
      //   return this.$store.getters.get_series_Data;
      // }
    },
    watch: {
      // control2: function () {
      //   // console.log(this.control2.Parameter, 'this')
      //   // console.log(this.series_Data, 'this');
      //   Readcsv.Read_scatter_right();
      //   // console.log(this.click_num, 'ssss')
      // },
      // sca_right: function () {
      //   this.data_right = [];
      //   for (let i = 0; i < this.sca_right.length; i++) {
      //     let right = [];
      //     right.push(parseFloat(this.sca_right[i]) * 100);
      //     right.push(parseFloat(this.control2.Parameter[i]));
      //     right.push(this.click_num)
      //     this.data_right.push(right)
      //   }
      //   // console.log(this.data_right,'this')
      //   this.series_Data.data[0].data.push(this.data_right[0]);
      //   this.series_Data.data[1].data.push(this.data_right[1]);
      //   this.series_Data.data[2].data.push(this.data_right[2]);
      //   this.series_Data.data[3].data.push(this.data_right[3]);
      //   this.series_Data.data[4].data.push(this.data_right[4]);
      //   // console.log(this.series_Data.data,'this')
      //   this.draw_scatter();
      // }
    }
  }
</script>

<style scoped>
  .bottom_1 {
    width: 21.3vw;
    height: 100%;
    /*border: 3px;*/
    border-top: 7px solid rgb(255, 255, 255);
    /*border-bottom: 6px solid rgb(255,255,255);*/
    /*border-right: 3px solid rgb(255,255,255);*/
    border-left: 5px solid rgb(255, 255, 255);
  }

  #scatter_chart {
    width: 100%;
    height: 98%;
    padding-right: 2%;
    /*margin-right: 2%;*/
    /*margin-top: 2%;*/
  }

  h4 {
    font-family: 微软雅黑;
    background-color: rgb(242, 242, 242);
    padding: 3px 3px;
    text-align: center;
    border-bottom: 2px solid rgb(200, 200, 200);
  }

</style>
