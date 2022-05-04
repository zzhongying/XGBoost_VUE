<template>
  <div id="div_left">
    <div id="controls">
      <h4 id="test2">CONTROLS</h4>
      <div id="control">
        <vue-grid
          style="
            width: 21vw;
            border-top: 3px solid rgb(255, 255, 255);
            border-bottom: 3px solid rgb(255, 255, 255);
            border-right: 6px solid rgb(255, 255, 255);
            border-left: 6px solid rgb(255, 255, 255);
            height: 99%;
          "
        >
          <!--            <vue-cell width="12of12" style="background-color: #fdfdfd;margin-top: 0.2%;font-size:  15px"> ☀ Parameter:-->
          <!--            </vue-cell>-->

          <vue-cell width="5of12"
          ><label style="font-size: smaller">Eta:</label></vue-cell
          >
          <vue-cell width="7of12"
          ><input
            type="range"
            min="0"
            max="1.0"
            step="0.1"
            class="input"
            v-model.number="eta_"
          /><label>{{ eta_ }}</label>
          </vue-cell>
          <vue-cell width="5of12"
          ><label style="font-size: smaller">Max depth:</label></vue-cell
          >
          <vue-cell width="7of12"
          ><input
            type="range"
            min="0"
            max="100"
            class="input"
            v-model.number="maxdepth"
          /><label>{{ maxdepth }}</label></vue-cell
          >
          <vue-cell width="5of12"
          ><label style="font-size: smaller"
          >Min child weight:</label
          ></vue-cell
          >
          <vue-cell width="7of12"
          ><input
            type="range"
            min="0"
            max="100"
            class="input"
            v-model.number="minchildweight"
          /><label>{{ minchildweight }}</label></vue-cell
          >
          <vue-cell width="5of12"
          ><label style="font-size: smaller">Gamma:</label></vue-cell
          >
          <vue-cell width="7of12"
          ><input
            type="range"
            min="0"
            max="100"
            class="input"
            v-model.number="gamma_"
          /><label>{{ gamma_ }}</label></vue-cell
          >
          <vue-cell width="5of12"
          ><label style="font-size: smaller">Subsample:</label></vue-cell
          >
          <vue-cell width="7of12"
          ><input
            type="range"
            min="0"
            max="1"
            class="input"
            step="0.1"
            v-model.number="subsample_"
          /><label>{{ subsample_ }}</label></vue-cell
          >
          <vue-cell width="5of12"
          ><label style="font-size: smaller">Num_rank:</label></vue-cell
          >
          <vue-cell width="7of12"
          ><input
            type="range"
            min="0"
            max="4"
            class="input"
            step="1"
            v-model.number="num_rank"
          /><label>{{ num_rank }}</label></vue-cell
          >
          <div style="font-size: smaller; width: 100%">
            <div class="text">data_distribution:</div>
            <div id="data_distribution" class="graph"></div>
            <br />
            <div class="text">accuracy:</div>
            <div id="accuracy" class="graph" style="text-align: center">
              {{ training_set_accuracy }}|{{ test_set_accuracy }}
            </div>
          </div>
          <key_button @sub="submit"></key_button>
        </vue-grid>
      </div>
    </div>
    <div id="sample">
      <h4 id="title_controls">SAMPLE DATA ANALYSIS</h4>
      <div id="data_analysis">
        <select
          name="trees"
          @change="remove"
          id="delete_select"
          v-model="value"
        >
          <option value="delete" id="remove" selected="selected">delete</option>
          <option v-for="tree in trees" :key="tree" :value="tree">
            {{ tree }}
          </option>
        </select>
        <div id="bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as echarts from "echarts";
  import { VueGrid, VueCell } from "vue-grd";
  import Readcsv from "../ToolJs/Readcsv";
  import * as d3 from "d5";
  import $ from "jquery";
  import key_button from "./key_button";
  import axios from "axios";
  import * as d4 from "../../public/d3";
  import cloud from '../../node_modules/d3-cloud/build/d3.layout.cloud'
  export default {
    name: "div_left",
    data() {
      return {
        //显示默认值
        eta_: "0.3",
        maxdepth: "6",
        minchildweight: "1",
        gamma_: "0",
        subsample_: "1",
        num_rank: "2",
        training_set_accuracy: null, //训练集正确率
        test_set_accuracy: null, //测试集正确率
        trees: ["tree1", "tree2", "tree3", "tree4", "tree5"], // 下拉框要删除数的名字
        value: "delete",
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
        feature_bar: {
          xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], //特征名
          yAxis: [120, 200, 150, 80, 70, 110, 130], //特征对应的出现频次
        },
        tree_datas: [
          {
            name: "tree1",
            influence: "positive",
            dataSize: 14,
            ratio: [100, 20],
          },
          {
            name: "tree2",
            influence: "negative",
            dataSize: 18,
            ratio: [100, 30],
          },
          {
            name: "tree3",
            influence: "positive",
            dataSize: 10,
            ratio: [100, 10],
          },
          {
            name: "tree4",
            influence: "negative",
            dataSize: 15,
            ratio: [100, 50],
          },
          {
            name: "tree5",
            influence: "positive",
            dataSize: 20,
            ratio: [100, 20],
          },
        ],
        wordCloudDatas: [
          { text: "get", size: 8 },
          { text: "display", size: 4 },
          { text: "info", size: 5 },
          { text: "open", size: 1 },
          { text: "write", size: 1 },
          { text: "vfu", size: 1 },
          { text: "tex", size: 1 },
          { text: "mun", size: 1 },
          { text: "map", size: 1 },
          { text: "uid32", size: 1 },
          { text: "pidgcnecti", size: 1 },
          { text: "starts", size: 1 },
          { text: "can", size: 1 },
          { text: "read", size: 1 },
          { text: "brk", size: 1 },
          { text: "pipe", size: 1 },
          { text: "gcnecti", size: 1 },
          { text: "terminate", size: 1 },
          { text: "thread", size: 2 },
          { text: "dupe", size: 1 },
          { text: "poll", size: 1 },
          { text: "ctlm", size: 1 },
          { text: "protect", size: 1 },
          { text: "device", size: 2 },
          { text: "id", size: 2 },
          { text: "create", size: 3 },
          { text: "perform", size: 1 },
          { text: "deferred", size: 1 },
          { text: "destroy", size: 1 },
          { text: "access", size: 2 },
          { text: "send", size: 1 },
          { text: "msggicc", size: 1 },
          { text: "serial", size: 1 },
          { text: "number", size: 1 },
          { text: "unlink", size: 1 },
          { text: "folder", size: 2 },
          { text: "in", size: 1 },
          { text: "fog", size: 1 },
          { text: "installer", size: 1 },
          { text: "package", size: 1 },
          { text: "name", size: 1 },
          { text: "mk", size: 1 },
          { text: "dir", size: 1 },
          { text: "personal", size: 1 },
          { text: "inf", size: 1 },
          { text: "on", size: 1 },
          { text: "a", size: 1 },
          { text: "no", size: 1 },
          { text: "sleep", size: 1 },
          { text: "g", size: 1 },
          { text: "last", size: 1 },
          { text: "location", size: 1 },
          { text: "interact", size: 1 },
          { text: "icnecti", size: 1 },
        ],
      };
    },
    components: {
      VueGrid,
      VueCell,
      key_button,
    },
    methods: {
      add() {
        let ran = Math.random() > 0.5 ? 1 : 0; //0为积极 1为消极
        this.tree_datas.push({
          name: "tree" + (parseInt(this.tree_datas[this.tree_datas.length-1].name.slice(4)) + 1),
          influence: ran ? "negative" : "positive",
          dataSize: parseInt(Math.random() * 19+1),
          ratio: [200, parseInt(Math.max(Math.random() * 100, 10))],
        });
        this.trees.push("tree" + (parseInt(this.tree_datas[this.tree_datas.length-1].name.slice(4))));
        // this.packdatas[ran].children.push(
        //   {name:'s',value:parseInt(Math.max(Math.random()*10,1))}
        // )
      },
      remove() {
        // console.log(this.value);
        if (this.value !== "delete") {
          // 删除打包图里部分数据
          // 积极还是消极树
          // let state = this.tree_datas.filter((d) => d.name === this.value)[0].influence;
          // this.packdatas.forEach((d) => {
          //   if (d.name === state) {
          //     let ind = parseInt(Math.random() * d.children.length);
          //     d.children = d.children.filter((d, i) => {
          //       return ind !== i;
          //     });
          //   }
          // });

          this.tree_datas = this.tree_datas.filter((d) => d.name !== this.value);
          this.trees = this.trees.filter((d) => d !== this.value);
          this.value = "delete";
        }
      },
      submit() {
        let num = this.$store.getters.get_click_num + 1;
        this.$store.commit("set_click_num", num);
        let deliver = {
          Parameter: [
            this.eta_,
            this.maxdepth,
            this.minchildweight,
            this.gamma_,
            this.subsample_,
          ],
          master_node: [
            this.fnode_tree_size,
            this.fnode_attr_size,
            this.fnode_opacity,
            this.root_node_color,
            this.Leaf_node_color,
          ],
          secondary_node: [
            this.node_size,
            this.node_opacity,
            this.node_stroke,
            this.node_color,
          ],
          edge: [this.edge_width, this.edge_opacity, this.edge_color],
          count: this.count++,
        };
        this.$store.commit("set_control2", deliver);
        this.$store.commit("set_recordData", deliver);
        Readcsv.Read_sca_data();
        Readcsv.Read_hotData();
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
          $(".data").css("background-color", "rgb(255,254,255)");
          //点击后变色
          $("#" + event.currentTarget.id).css(
            "background-color",
            "rgb(242,242,242)"
          );
        }
      },
      button_type_select: function (event) {
        if (event) {
          // console.log(event.currentTarget.id)
          $(".type").css("background-color", "rgb(255,254,255)");
          //点击后变色
          $("#" + event.currentTarget.id).css(
            "background-color",
            "rgb(242,242,242)"
          );
        }
      },
      //词云图和饼图
      draw_bar(tree_datas, wordCloudDatas) {
        // console.log(tree_datas, wordCloudDatas);
        wordCloudDatas=JSON.parse(JSON.stringify(wordCloudDatas)) //深拷贝一下，后面会修改该对象
        let tree_num = tree_datas.length; //树的数量
        // let width = $('#data_analysis').width();  //338px
        let width = tree_num * 66;
        let height = $("#bar").height()/4+10;
        // 超出的滚动
        d3.select("#bar")
          .style("overflow-x", "auto")
          .style("overflow-y", "hidden")


        d3.select("#bar_svg").remove();
        d3.select("#cloud_svg").remove();
        let svg = d3
          .select("#bar")
          .append("svg")
          .attr("id", "bar_svg")
          .attr("width", width + "px")
          .attr("height", height + "px");
        // .style('display','inline')
        let X = d3
          .scaleBand()
          .domain(tree_datas.map((d, i) => i))
          .rangeRound([0, width]);

        let mid = parseInt((width / tree_num) * 0.5); //每块的中线
        let g = svg.selectAll("g").data(tree_datas).enter().append("g");
        // 绘制带颜色的矩形
        let rect = g
          .append("rect")
          .attr("x", (d, i) => X(i))
          .attr("y", 10)
          .attr("width", mid * 2)
          .attr("height", height-10) //共四个模块 一个模块在上面
          .attr("fill", "rgb(193,193,193)")
          .attr("fill-opacity", (d) =>
            d.influence === "positive" ? "0.4" : "0.2"
          );

        // 树的名字
        let text = g
          .append("text")
          .attr("x", (d, i) => X(i) + mid - 15)
          .attr("y", 10)
          .text((d) => d.name)
          .attr("font-size", 12);

        // 为画pie做准备
        var pie = d3.pie();
        var outRadius = 20;
        var innerRadius = 0;
        var path0 = d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius((d) => {
            return tree_datas.filter((dd) => dd.name === d.name)[0].dataSize; //控制圆的半径
          });
        let pie_g = g
          .append("g")
          .attr("transform", (d, i) => {
            return `translate(${X(i) + mid},${height / 2+5})`;
          })
          .classed("pie_right", true)
          .selectAll("path")
          .data((d) => {
            // console.log('pie->',pie(d.ratio))
            let res = pie(d.ratio);
            res[0].name = d.name;
            res[1].name = d.name;
            return res;
          })
          .enter()
          .append("path")
          .attr("d", (d) => path0(d))
          .attr("fill", function (d, i) {
            return i == 0 ? "rgb(203,220,223)" : "rgb(242,198,200)";
          });

        // 绘制词云
        let cloud_width = $("#bar").width();
        let cloud_height = $("#bar").height()/4*3-10;
        let cloud_svg=d3
          .select("#bar")
          .append("svg")
          .attr("id", "cloud_svg")
          .attr("width", cloud_width + "px")
          .attr("height", cloud_height + "px")
          .attr("transform",`translate(${0},${height / 4 -10})`)
        let cloud_g=cloud_svg.append('g')
        // .attr("transform",`translate(${0},${height / 4 + 10})`)

        let layout = cloud()
          //词云显示的大小 目前宽度为盒子宽度，不随树的增多变大(改为width,则随树多变大)
          .size([cloud_width, cloud_height])
          .words(wordCloudDatas)
          .padding(1)
          .rotate(function () { return ~~(Math.random() * 2) * 30; })
          .font("Impact")
          .fontSize(function (d) { return d.size*7 })
          .on("end", drawCloud);
        layout.start();
        function drawCloud(words){
          console.log('word',words)
          cloud_g.append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function (d, i) {
              if(d.size>20)
                return '#cbdcdf'; //积极消极都有
              else{
                return Math.random()>0.5?'#EFBAC0':'rgb(247,221,192)' //大于0.5积极，小于消极
              }
            })
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
              return "translate(" + [d.x - 2, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) { return d.text; });
        }
      },

      //画控制台的堆叠图
      draw_stacked_figure(data) {
        // console.log("d3版本：",d3.version) // 5.x
        // 绘制堆叠图

        // 正确率的数据
        // let accuracys=data.map(d=>{
        //   return {'family':Object.keys(d)[0],'accuracy':d[Object.keys(d)[0]].accuracy}
        // })

        // 先绘制数据类型分布
        let data_distribution_svg_width = parseFloat(
          getComputedStyle(document.getElementById("data_distribution")).width
        );
        let data_distribution_svg_height = parseFloat(
          getComputedStyle(document.getElementById("data_distribution")).height
        );
        let tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "stacked_tooltip")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("width", "200px")
          .style("height", "auto")
          .style("font-size", "14px")
          .style("text-align", "center")
          .style("background-color", "rgb(214, 205, 205)")
        // 数据分布的数据
        let distributions = [];
        data.forEach((d, i) => {
          let num = d[Object.keys(d)[0]].num;
          let width = parseInt(num ** 0.45);
          let height = data_distribution_svg_height;
          let x =
            i == 0 ? 0 : distributions[i - 1].x + distributions[i - 1].width;
          distributions.push({
            family: Object.keys(d)[0],
            num: num,
            x: x,
            width: width,
            height: height,
          });
        });
        let data_distribution_svg = d3
          .select("#data_distribution")
          .append("svg")
          .attr("width", data_distribution_svg_width)
          .attr("height", data_distribution_svg_height);
        data_distribution_svg
          .selectAll("rect")
          .data(distributions)
          .enter()
          .append("rect")
          .attr("x", (d) => d.x)
          .attr("y", 0)
          .attr("width", (d) => d.width)
          .attr("height", (d) => {
            // console.log("dddd->", d);
            return d.height;
          })
          .attr("fill", "#cbdcdf")
          .attr("stroke", "black")
          .on("mouseenter", (d) => {
            tooltip.html(`软件类型:${d.family}</br> 样本数量：${d.num} `)
              .style("opacity", 1)
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY + 20 + "px")
          })
          .on("mouseleave", (d) => {
            tooltip.style("opacity", 0)
          });
      },
    },
    mounted() {
      // Readcsv.Read_dataset_show('1');
      Readcsv.Read_samplebar_data();
      // 获取堆叠图数据
      axios({ url: "http://127.0.0.1:5000/getdata/data_info/data1" }).then(
        (res) => {
          // console.log("堆叠图数据：", res.data);
          this.draw_stacked_figure(res.data);
          // 正确率的数据
          let accuracys = res.data.map((d) => {
            return d[Object.keys(d)[0]].accuracy;
          });
          this.training_set_accuracy =
            parseFloat((d3.sum(accuracys) / accuracys.length).toFixed(4)) * 100 +
            "%";
          this.test_set_accuracy = "95.12%";
        }
      );
      // this.button_type_select()
      this.$bus.$on("add", this.add);
    },
    computed: {
      sample_bar() {
        return this.$store.getters.get_sample_bar;
      },
      control2() {
        return this.$store.getters.get_control2;
      },
      control1() {
        return this.$store.getters.get_control1;
      },

      dataShow() {
        return this.$store.getters.get_dataShow;
      },
    },
    watch: {
      tree_datas: function () {
        this.draw_bar(this.tree_datas, this.wordCloudDatas);
      },
      control2: function (newV, oldV) {
        this.draw_bar(this.tree_datas, this.wordCloudDatas);
      },
      dataShow: function () {
        this.dataset_show = this.dataShow.tags;
        console.log(this.dataset_show, "shoiw");
        this.draw_charts();
      },
      control1: function () {
        let now_data = this.control1;
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
      deep: true, //对象内部属性的监听，关键
    },
    beforeDestroy() {
      this.$bus.$off("add");
    },
  };
</script>

<style scoped lang="scss">
  #bar {
    width: 100%;
    height: 85%;
  }
  // 文字和堆叠图布局
  .graph {
    display: inline-block;
    width: calc(100% * 7 / 12);
    height: 20px;
  }
  .text {
    display: inline-block;
    width: calc(100% * 5 / 12);
    height: 20px;
  }
  // 下拉框
  #delete_select {
    // float:left;
    // position: absolute;
    display: inline;
    position: relative;
    left: 0;
    top: 0;
  }
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

  #controls {
    height: 50%;
    width: 100%;
    /*overflow: auto;*/
  }

  #control {
    height: 95%;
    width: 95%;
    margin-left: 5%;
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
    // position: center;
    position: relative;
    /*margin-top: 2%;*/
  }

  input[type="range"] {
    -webkit-appearance: none;
    /*width: 5vw;*/
    height: 5px;
    background-color: rgb(217, 217, 217);
    /*background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;*/
    border-radius: 10px;
  }

  input[type="range"]::-webkit-slider-thumb {
    //拖动块的样式
    -webkit-appearance: none;
    border: 3px solid rgb(165, 187, 191);
    height: 14px;
    width: 14px;
    border-radius: 8px;
    background: #ffffff;
    cursor: pointer;
  }

  input[type="range"]::-moz-range-thumb {
    border: 3px solid #fff;
    height: 7px;
    width: 7px;
    border-radius: 8px;
    background: rgb(165, 187, 191);
    cursor: pointer;
  }

  input[type="color"] {
    width: 5vw;
    height: 2vh;
    /*border-radius: 5px;*/
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  input[type="color"]::-webkit-color-swatch {
    border: 0;
  }

  input[type="text"] {
    width: 9vw;
    height: 2vh;
    border: 0;
    /*background:linear-gradient(to right,#fff ,#00416A);*/
    /*border-block-color:#baccd9;*/
    background-color: #ccdddf;
  }

  #test2 {
    margin: 0;
    font-family: 微软雅黑;
    background-color: rgb(242, 242, 242);
    padding: 3px 3px;
    text-align: center;
    border-bottom: 2px solid rgb(200, 200, 200);
  }

  #title_controls {
    font-family: 微软雅黑;
    background-color: rgb(242, 242, 242);
    padding: 3px 3px;
    text-align: center;
    border-bottom: 2px solid rgb(200, 200, 200);
    margin: 0;
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
