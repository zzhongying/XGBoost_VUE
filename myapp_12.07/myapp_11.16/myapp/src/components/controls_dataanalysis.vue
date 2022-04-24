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
            <br/>
            <div class="text">accuracy:</div>
            <div id="accuracy" class="graph" style="text-align: center;">
              {{training_set_accuracy}}|{{test_set_accuracy}}
            </div>
          </div>
          <key_button @sub="submit"></key_button>
        </vue-grid>
      </div>
    </div>
    <div id="sample">
      <h4 id="title_controls">SAMPLE DATA ANALYSIS</h4>
      <div id="data_analysis">
        <select name="trees" id="delete_select" v-model="value">
          <option value="delete" selected="selected">delete</option>
          <option v-for="(tree) in trees" :key='tree' :value="tree">
            {{tree}}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  import * as echarts from "echarts";
  import {VueGrid, VueCell} from "vue-grd";
  import Readcsv from "../ToolJs/Readcsv";
  import * as d3 from "d5";
  import $ from "jquery";
  import key_button from "./key_button";
  import axios from "axios";
  import * as d4 from "../../public/d3";

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
        training_set_accuracy: null,  //训练集正确率
        test_set_accuracy: null, //测试集正确率
        trees: ['tree1', 'tree2'],  // 下拉框要删除数的名字
        value: 'delete',
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
      };
    },
    components: {
      VueGrid,
      VueCell,
      key_button,
    },
    methods: {
      //draw_charts() {},
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
      draw_bar(data) {
        data = [
          {
            name: 'tree1',
            influence: 'positive',
            dataSize: 1024,
            right: [100, 20],
            wrong: [100, 10]
          },
          {
            name: 'tree2',
            influence: 'negative',
            dataSize: 996,
            right: [200, 100],
            wrong: [100, 30]
          },
          {
            name: 'tree3',
            influence: 'positive',
            dataSize: 784,
            right: [200, 100],
            wrong: [100, 30]
          },
          {
            name: 'tree4',
            influence: 'negative',
            dataSize: 1069,
            right: [200, 100],
            wrong: [100, 30]
          },
          {
            name: 'tree5',
            influence: 'positive',
            dataSize: 526,
            right: [200, 100],
            wrong: [100, 30]
          }
        ]
        let packdata = [
          {
            name: "positive", children: [
              {name: 'a', value: 5},
              {name: 'b', value: 8},
              {name: 'c', value: 10},
              {name: 'd', value: 3}
            ]
          },
          {
            name: "negative", children: [
              {name: 'a', value: 6},
              {name: 'b', value: 4},
              {name: 'c', value: 12},
              {name: 'd', value: 7},
              {name: 'e', value: 5}
            ]
          }
        ]
        let width = $('#data_analysis').width();  //338px
        let height = $('#data_analysis').height();  //216px

        let svg = d3.select("#data_analysis")
          .append('svg')
          .attr('width', width + 'px')
          .attr('height', height + 'px')

        let X = d3
          .scaleBand()
          .domain(data.map((d, i) => i))
          .rangeRound([0, width]);

        let mid = parseInt(width / data.length * 0.5)  //每块的中线
        let g = svg.selectAll('g')
          .data(data)
          .enter()
          .append("g")

        // 绘制带颜色的矩形
        let rect = g.append('rect')
          .attr('x', (d, i) => X(i))
          .attr('y', 0)
          .attr('width', mid * 2)
          .attr('height', height - 30 - 16)
          // .attr('fill', 'rgba(177,178,179,0.3)')
          .attr("fill", d => d.influence === "positive" ? 'rgba(227,225,225,0.3)' : 'rgba(177,178,179,0)')

        // 绘制虚线
        let dotted_line = g.append('line')
          .attr('x1', (d, i) => X(i) + mid)
          .attr('y1', 0)
          .attr('x2', (d, i) => X(i) + mid)
          .attr('y2', height - 30 - 16)  //多减16的原因是下拉框高16 将svg向下挤了16 （下拉框的浮动脱标没有作用）
          .attr("width", 3)
          .attr('opacity', 1)
          .attr("stroke-width", 0.5)
          .attr("stroke", "black")
          .style("stroke-dasharray", ("5, 5"))

        // 树的名字
        let text = g.append('text')
          .attr('x', (d, i) => X(i) + mid - 15)
          .attr('y', height - 35)
          .text(d => d.name)
          .attr('font-size', 14)

        // 数据流大小
        let circle_dataSize = g.append('ellipse')
          .attr('cx', (d, i) => X(i) + mid)
          .attr('cy', (height - 30 - 16) / 8)
          .attr('ry', 15)
          .attr('rx', d => d.dataSize ** 0.45)
          .attr('fill', '#e5f5f1')

        // 为画pie做准备
        var pie = d3.pie()
        var outRadius = 20;
        var innerRadius = 0;
        var path0 = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outRadius);
        let pie_rihgt = g
          .append('g')
          .attr("transform", (d, i) => {
            console.log('transform', d, i)
            return `translate(${X(i) + mid},${(height - 30 - 16) / 8 * 3})`
          })
          .classed('pie_right', true)
          .selectAll('path')
          .data(d => pie(d.right))
          .enter()
          .append("path")
          .attr("d", (d) => path0(d))
          .attr("fill", function (d, i) {
            return i == 0 ? '#e5f5f1' : '#fdddd6';
          });
        let pie_wrong = g
          .append('g')
          .attr("transform", (d, i) => {
            console.log('transform', d, i)
            return `translate(${X(i) + mid},${(height - 30 - 16) / 8 * 5})`
          })
          .classed('pie_wrong', true)
          .selectAll('path')
          .data(d => pie(d.wrong))
          .enter()
          .append("path")
          .attr("d", (d) => path0(d))
          .attr("fill", function (d, i) {
            return i == 0 ? '#e5f5f1' : '#fdddd6';
          });


        //打包图
        const pack = (dataset) =>
          d3.pack().size([40, 40]).padding(3)(
            d3.hierarchy(dataset)
              .sum((d) => d.value)
              .sort((a, b) => b.value - a.value)
          );
        let pack_g = svg.selectAll('.pack')
          .data(packdata)
          .enter()
          .append('g')
        let pack_outside = pack_g.append('ellipse')
          .attr('cx', (d, i) => i === 0 ? width / 4 : width / 4 * 3)
          .attr('cy', (height - 30 - 16) / 8 * 7)
          .attr('ry', 20)
          .attr('rx', width / 4 * 0.8)
          .attr('fill', 'rgba(255,255,255,0.5)')
          .classed('pack_outside', true)
        // let pack_outside=pack_g.append('rect')
        //   .attr('x',(d,i)=>X(i)+mid-20)
        //   .attr('y',(height-30-16)/8*6)
        //   .attr('height',40)
        //   .attr('width',40)
        //   .attr('fill','#ababab')
        //   .classed('pack_outside',true)
        pack_g.append("g")
          .attr("transform", (d, i) => {
            // 如果下面的气泡没有在椭圆里，调下这里
            let x = i === 0 ? width / 4 - 20 : width / 4 * 3 - 20
            let y = (height - 30 - 16) / 8 * 7 - 20
            return `translate(${x},${y})`
          })
          .selectAll("circle")
          .data(d => pack(d).descendants().slice(1))
          .enter()
          .append("circle")
          .attr("fill", "pink")
          .attr("fill-opacity", "1")
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          })
          .attr("r", function (d) {
            return d.r;
          });
        // var arcs1 = g
        //   .selectAll(".arc") //生成和dataset对应的g ,class是arc,数据集有多少个，类有多少个
        //   .data(data) //pie(dataset)把数据本身进行改变
        //   .enter()
        //   .append("g")
        //   .attr("class", "arc")
        //   .attr("transform", (d,i)=>"translate(" + (i+1)*25 + "," + 20 + ")")
        // arcs1.selectAll("path")
        //   .data(d=>pie(d.right))
        //   .enter()
        //   .append("path")
        //   .attr("d",(d)=>path0(d))
        //   .attr("fill", function (d, i) {
        //     return i==0?'red':'green';
        //   });

        //#region
        // var chartDom = document.getElementById("data_analysis");
        // var myChart = echarts.init(chartDom);
        // var option;

        // option = {
        //   color: ["#CBDCDF", "#F0BBC1", "#FAF3E2", "#B3CBCF"],
        //   grid: {
        //     height: "50%",
        //     width: "80%",
        //   },
        //   xAxis: {
        //     type: "category",
        //     data: data["xAxis"],
        //   },
        //   yAxis: {
        //     type: "value",
        //   },
        //   dataZoom: [
        //     {
        //       type: "slider",
        //       show: true,
        //       height: 10,
        //       bottom: 30,
        //       borderColor: "transparent",
        //       backgroundColor: "#e2e2e2",
        //       // 拖拽手柄样式 svg 路径
        //       handleIcon:
        //         "M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z",
        //       handleColor: "#aab6c6",
        //       handleSize: 30,
        //       handleStyle: {
        //         borderColor: "#aab6c6",
        //         shadowBlur: 4,
        //         shadowOffsetX: 1,
        //         shadowOffsetY: 1,
        //         shadowColor: "#e5e5e5",
        //       },
        //       start: 0,
        //       end: 100,
        //     },
        //   ],
        //   series: [
        //     {
        //       data: data["yAxis"],
        //       type: "bar",
        //     },
        //   ],
        // };

        // option && myChart.setOption(option);
        //#endregion
      },
      draw_stacked_figure(data) {
        // console.log("d3版本：",d3.version) // 5.x
        // 绘制堆叠图

        // 正确率的数据
        // let accuracys=data.map(d=>{
        //   return {'family':Object.keys(d)[0],'accuracy':d[Object.keys(d)[0]].accuracy}
        // })

        // 先绘制数据类型分布
        let data_distribution_svg_width = parseFloat(getComputedStyle(document.getElementById('data_distribution')).width)
        let data_distribution_svg_height = parseFloat(getComputedStyle(document.getElementById('data_distribution')).height)
        // 数据分布的数据
        let distributions = []
        data.forEach((d, i) => {
          let num = d[Object.keys(d)[0]].num
          let width = parseInt(num ** 0.45)
          let height = data_distribution_svg_height
          let x = i == 0 ? 0 : distributions[i - 1].x + distributions[i - 1].width
          distributions.push({
            'family': Object.keys(d)[0],
            'num': num,
            'x': x,
            'width': width,
            'height': height,
          })
        })
        let data_distribution_svg = d3.select('#data_distribution')
          .append('svg')
          .attr('width', data_distribution_svg_width)
          .attr('height', data_distribution_svg_height)
        data_distribution_svg.selectAll('rect')
          .data(distributions)
          .enter()
          .append('rect')
          .attr('x', d => d.x)
          .attr('y', 0)
          .attr('width', d => d.width)
          .attr('height', d => d.height)
          .attr('fill', '#cbdcdf')
          .attr('stroke', 'black')
      },
    },
    mounted() {
      // Readcsv.Read_dataset_show('1');
      Readcsv.Read_samplebar_data();
      // 获取堆叠图数据
      axios({url: "http://127.0.0.1:5000/getdata/data_info/data1"}).then(
        (res) => {
          // console.log("堆叠图数据：", res.data);
          this.draw_stacked_figure(res.data);
          // 正确率的数据
          let accuracys = res.data.map(d => {
            return d[Object.keys(d)[0]].accuracy
          })
          this.training_set_accuracy = parseFloat((d3.sum(accuracys) / accuracys.length).toFixed(4)) * 100 + '%'
          this.test_set_accuracy = '95.12%'
        }
      );
      // this.button_type_select()
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
      control2: function (newV, oldV) {
        this.draw_bar(this.feature_bar);
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
  };
</script>

<style scoped lang="scss">
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
    float: left;
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
    overflow: auto;
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
    position: center;
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
