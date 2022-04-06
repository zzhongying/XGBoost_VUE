<template>
  <div id="div_left">
    <div id="controls">
      <h4 id="test2">CONTROLS</h4>
      <div id="control">
        <vue-grid
          style="width: 21vw;border-top:3px solid rgb(255,255,255);border-bottom:3px solid rgb(255,255,255);border-right: 6px solid rgb(255,255,255);border-left: 6px solid rgb(255,255,255);height:99%;">
          <!--            <vue-cell width="12of12" style="background-color: #fdfdfd;margin-top: 0.2%;font-size:  15px"> ☀ Parameter:-->
          <!--            </vue-cell>-->
          <vue-cell width="5of12"><label style="font-size: smaller">Eta</label></vue-cell>
          <vue-cell width="7of12"><input type="range" min="0" max="1.0" step="0.1" class="input" v-model.number="eta_"/><label>{{eta_}}</label>
          </vue-cell>
          <vue-cell width="5of12"><label style="font-size: smaller">Max depth:</label></vue-cell>
          <vue-cell width="7of12"><input type="range" min="0" max="100" class="input" v-model.number="maxdepth"/><label>{{
            maxdepth }}</label></vue-cell>
          <vue-cell width="5of12"><label style="font-size: smaller">Min child weight:</label></vue-cell>
          <vue-cell width="7of12"><input type="range" min="0" max="100" class="input"
                                         v-model.number="minchildweight"/><label>{{ minchildweight }}</label></vue-cell>
          <vue-cell width="5of12"><label style="font-size: smaller">Gamma:</label></vue-cell>
          <vue-cell width="7of12"><input type="range" min="0" max="100" class="input" v-model.number="gamma_"/><label>{{
            gamma_ }}</label></vue-cell>
          <vue-cell width="5of12"><label style="font-size: smaller">Subsample:</label></vue-cell>
          <vue-cell width="7of12"><input type="range" min="0" max="1" class="input" step="0.1"
                                         v-model.number="subsample_"/><label>{{
            subsample_ }}</label></vue-cell>
          <vue-cell width="5of12"><label style="font-size: smaller">Num_rank:</label></vue-cell>
          <vue-cell width="7of12"><input type="range" min="0" max="4" class="input" step="1" v-model.number="num_rank"/><label>{{
            num_rank}}</label></vue-cell>
          <key_button @sub="submit"></key_button>
        </vue-grid>
      </div>
    </div>
    <div id="sample">
      <h4 id="title_controls"> SAMPLE DATA ANALYSIS</h4>
      <div id="data_analysis">

      </div>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import {VueGrid, VueCell} from 'vue-grd';
  import Readcsv from '../ToolJs/Readcsv'
  import * as d3 from 'd3'
  import $ from 'jquery';
  import key_button from "./key_button";
  import axios from "axios";
  import * as d4 from "../../public/d3";

  export default {
    name: "div_left",
    data() {
      return {
        //显示默认值
        eta_: '0.3',
        maxdepth: '6',
        minchildweight: '1',
        gamma_: '0',
        subsample_: '1',
        num_rank: '2',
        timer: null,
        barData: null,
        dataset1: null,
        dataset2: null,
        dataset3: null,
        Data_size: null,
        Data_rows: null,
        Attr_num: null,
        Type_distribution: null,
        Correct_identification: null,
        samplebar: null,
        dataset_show: [],

      }
    },
    components: {
      VueGrid,
      VueCell,
      key_button
    },
    methods: {
      //draw_charts() {},
      submit() {
        let num = this.$store.getters.get_click_num + 1;
        this.$store.commit('set_click_num', num)
        let deliver = {
          "Parameter": [this.eta_, this.maxdepth, this.minchildweight, this.gamma_, this.subsample_],
          "master_node": [this.fnode_tree_size, this.fnode_attr_size, this.fnode_opacity, this.root_node_color, this.Leaf_node_color],
          "secondary_node": [this.node_size, this.node_opacity, this.node_stroke, this.node_color],
          "edge": [this.edge_width, this.edge_opacity, this.edge_color],
          "count": this.count++
        }
        this.$store.commit('set_control2', deliver);
        this.$store.commit('set_recordData', deliver);
        Readcsv.Read_sca_data();
        Readcsv.Read_hotData()
        // console.log(this.$store.state.control2)
      },
      goToPay: function (param1, param2) {
        this.$nextTick(function () {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(() => {
            this.$refs.getFocus.focus();

          }, 100);
        });
      },
      button_data_select: function (event) {

        if (event) {
          Readcsv.Read_dataset_show(event.currentTarget.id);
          $('.data').css("background-color", "rgb(255,254,255)")
          //点击后变色
          $('#' + event.currentTarget.id).css("background-color", "rgb(242,242,242)");
        }
      },
      button_type_select: function (event) {
        if (event) {
          // console.log(event.currentTarget.id)
          $('.type').css("background-color", "rgb(255,254,255)")
          //点击后变色
          $('#' + event.currentTarget.id).css("background-color", "rgb(242,242,242)");
        }
      },

      draw_data_analysis(){



      }

    },
    mounted() {
      // Readcsv.Read_dataset_show('1');
      Readcsv.Read_samplebar_data()

      // this.button_type_select()
    },
    computed: {
      sample_bar() {
        return this.$store.getters.get_sample_bar
      },
      control2() {
        return this.$store.getters.get_control2;
      },
      control1() {
        return this.$store.getters.get_control1
      },

      // dataShow() {
      //   return this.$store.getters.get_dataShow;
      // }
    },
    watch: {
      control2: function (newV, oldV) {
        axios({
          url: "http://127.0.0.1:5000/get_data/bubble_chart",
        }).then(() => {
          this.draw_data_analysis(this.bubble_data);

        });
      },
      // dataShow: function () {
      //   this.dataset_show = this.dataShow.tags;
      //   console.log(this.dataset_show,'shoiw')
      //   this.draw_charts()
      //
      // },
      control1: function () {
        let now_data = this.control1
        this.eta_ = now_data[0];
        this.maxdepth = now_data[1];
        this.minchildweight = now_data[2];
        this.gamma_ = now_data[3];
        this.subsample_ = now_data[4];
        // console.log(now_data)
        // console.log(this.eta_)
      },
      // sample_bar: function () {
      //   this.samplebar = this.$store.getters.get_sample_bar;
      //   // console.log(this.samplebar, 'ssss')
      //   // console.log(this.samplebar.tags, 'liter')
      // },

    },
  }
</script>

<style scoped lang="scss">
  #div_left {
    width: 22.5vw;
    /*margin: 0;*/
    /*padding: 0.4%;*/
    border-top: 3px solid rgb(255, 255, 255);
    border-bottom: 3px solid rgb(255, 255, 255);
    /*border-right: 10px solid rgb(255,255,255);*/
    border-right: 8px solid rgb(255, 255, 255);
    border-left: 5px solid rgb(255, 255, 255);
    position: relative;
    /*overflow-x: hidden;*/
    /*overflow-y: scroll;*/
  }

  #controls{
    height:50%;
    width: 100%;
  }

  #control{
    height: 95%;
    width: 95%;
    margin-left:5% ;
  }

  #sample {
    width: 100%;
    height: 50%;
    /*border: 3px;*/
    border-top: 7px solid rgb(255, 255, 255);
    /*border-bottom: 6px solid rgb(255,255,255);*/
    /*border-right: 3px solid rgb(255,255,255);*/
    /*border-right: 8px solid rgb(255, 255, 255);*/
    border-left: 2px solid rgb(255, 255, 255);
  }

  #data_analysis {
    width: 98%;
    height: 95%;
    position: center;
    /*margin-top: 2%;*/
  }


  input[type=range] {
    -webkit-appearance: none;
    /*width: 5vw;*/
    height: 5px;
    background-color: rgb(217, 217, 217);
    /*background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;*/
    border-radius: 10px;
  }

  input[type='range']::-webkit-slider-thumb { //拖动块的样式
    -webkit-appearance: none;
    border: 3px solid rgb(165, 187, 191);
    height: 14px;
    width: 14px;
    border-radius: 8px;
    background: #ffffff;
    cursor: pointer;
  }

  input[type='range']::-moz-range-thumb {
    border: 3px solid #fff;
    height: 7px;
    width: 7px;
    border-radius: 8px;
    background: rgb(165, 187, 191);
    cursor: pointer;
  }

  input[type='color'] {
    width: 5vw;
    height: 2vh;
    /*border-radius: 5px;*/
  }

  input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  input[type='color']::-webkit-color-swatch {
    border: 0;
  }

  input[type='text'] {
    width: 9vw;
    height: 2vh;
    border: 0;
    /*background:linear-gradient(to right,#fff ,#00416A);*/
    /*border-block-color:#baccd9;*/
    background-color: #CCDDDF;
  }

  #test2 {
    margin: 0;
    font-family: 微软雅黑;
    background-color: rgb(242, 242, 242);
    padding: 3px 3px;
    text-align: center;
    border-bottom: 2px solid rgb(200, 200, 200);
  }

#title_controls{
  font-family: 微软雅黑;
    background-color: rgb(242, 242, 242);
    padding: 3px 3px;
    text-align: center;
    border-bottom: 2px solid rgb(200, 200, 200);
    margin: 0
}
  h3 {
    background-color: rgb(242, 242, 242);
  }

  .button {
    background-color: rgb(255, 255, 255);
    /*border: 1px solid rgb(170, 170, 170);*/
    /*border-radius: 5px;*/
    color: #000000;
    padding: 1px 2px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;
    margin-left: 2%;
  }

  .button:hover {
    color: #3a8ee6;
    background-color: rgb(242, 242, 242);
  }

  #Train {
    margin-left: 19%;
    /*border-top-left-radius: 5px;*/
    /*border-bottom-left-radius: 5px;*/
  }

  button {
    background-color: rgb(255, 255, 255);
    border: none;
    padding: 10px 10px;
    font-size: 15px;
    text-align: center;
    font-family: 微软雅黑;
  }

  #sample_bar {
    /*position: absolute;*/
    /*height: 5px;*/
    /*width: 40px;*/
    height: 5vh;
    width: 8vw;
    position: absolute;
    left: 45%;
    top: 0px;
    /*border: 3px solid rgb(43, 43, 43);*/
    /*background-color: crimson;*/

  }

</style>
