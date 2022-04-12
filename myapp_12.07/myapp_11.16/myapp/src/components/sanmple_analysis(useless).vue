<template>
  <div class="bottom_1">
    <h4 >SAMPLE ANALYSIS</h4>
    <div id="barchart">
      <ul class="list-group">
        <li class="list-group-item">
          DateSet:
          <button class="button data" id="dataset1" @click="button_data_select($event)"> train</button>
          <button class="button data" id="dataset2" @click="button_data_select($event)"> test1 </button>
          <button class="button data" id="dataset3" @click="button_data_select($event)"> test2</button>
          <!--          <button class="button data" id="dataset4" @click="button_data_select($event)"> dataset4 </button>-->
          <!--        </li>-->
          <!--        <li class="list-group-item">-->
          <!--          <button class="button type" id="Train" @click="button_type_select($event)">train </button>-->
          <!--          <button class="button type" id="Test" @click="button_type_select($event)"> test   </button>-->
          <!--          <button class="button type" id="Sample_train" @click="button_type_select($event)"> sample_train   </button>-->
          <!--          <button class="button type" id="Sample_Test" @click="button_type_select($event)"> sample_test   </button>-->
          <!--        </li>-->
        <li class="list-group-item"> Data Size:  {{ $store.state.data_size }}</li>
        <li class="list-group-item">Data Rows:  {{ $store.state.data_rows }} </li>
        <li class="list-group-item">Attributes Number:  {{ $store.state.number_attributes }} </li>
        <li class="list-group-item">Type Distribution: </li>
        <li class="list-group-item">Correct Identification:  {{ $store.state.correct_identification}}/{{ $store.state.data_rows }}</li>
        <!--        <li class="list-group-item">Porta ac consectetur ac</li>-->
      </ul>

      <!--            <h2> {{ $store.state.selector }} </h2>   从vuex中引用-->

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
    data(){
      return {
        barData: null,
        dataset1:null,
        dataset2:null,
        dataset3:null,
        Data_size:null,
        Data_rows:null,
        Attr_num:null,
        Type_distribution:null,
        Correct_identification: null
      }
    },
    methods:{
      draw_charts(){

      },
      button_data_select: function(event){
        if(event){
          //console.log(event.currentTarget.id)
          $('.data').css("background-color","rgb(255,254,255)")
          //点击后变色
          $('#' + event.currentTarget.id).css("background-color", "rgb(242,242,242)");
        }
      },
      button_type_select: function (event) {
        if(event){
          // console.log(event.currentTarget.id)
          $('.type').css("background-color","rgb(255,254,255)")
          //点击后变色
          $('#' + event.currentTarget.id).css("background-color", "rgb(242,242,242)");
        }
      }
    },
    mounted() {
      // Readcsv.Read_barData()
      this.draw_charts()
      this.button_type_select()
    },
    computed: {
      // control1() {
      //   return this.$store.getters.get_control1
      // },
      // bar_data() {
      //   return this.$store.getters.get_barData
      // },
    },
    watch: {
      // bar_data: function () {
      //   this.barData = this.$store.getters.get_barData
      //   this.draw_charts()
      // },
      // control1: function () {
      //
      // }
    }
  }
</script>

<style scoped>
  .bottom_1 {
    width: 21.3vw;
    /*border: 3px;*/
    border-top: 7px solid rgb(255,255,255);
    /*border-bottom: 6px solid rgb(255,255,255);*/
    /*border-right: 3px solid rgb(255,255,255);*/
    border-left: 6px solid rgb(255,255,255);
  }

  #barchart {
    width: 100%;
    height: 98%;
    /*margin-top: 2%;*/
  }
  h3{
    background-color: rgb(242,242,242);
  }

  .button {
    background-color: rgb(255, 255, 255);
    /*border: 1px solid rgb(170, 170, 170);*/
    /*border-radius: 5px;*/
    color: #000000;
    padding: 1px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;
    margin-left: 2%;
  }

  .button:hover{
    color: #3a8ee6;
    background-color: rgb(242,242,242);
  }

  #Train{
    margin-left: 19%;
    /*border-top-left-radius: 5px;*/
    /*border-bottom-left-radius: 5px;*/
  }

  button{
    background-color: rgb(255, 255, 255);
    border: none;
    padding: 10px 10px;
    font-size: 15px;
    text-align: center;
    font-family: 微软雅黑;
  }

  .list-group {
    margin-bottom: 20px;
  }
  .list-group-item {
    position: relative;
    display: block;
    padding: 10px 15px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .list-group-item:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .list-group-item:last-child {
    margin-bottom: 0;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  li{
    font-size: 15px;
  }

  h4{
    font-family: 微软雅黑;
    background-color: rgb(242,242,242);
    padding: 3px 3px;
    text-align: center;
    border-bottom: 2px solid rgb(200,200,200);
  }

</style>
