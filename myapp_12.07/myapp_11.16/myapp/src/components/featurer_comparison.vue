<template>
  <div class="top_right">
    <div id="bar" ref="chart1">
      <h4 id="test3">FEATURE COMPARISON</h4>
      <div id="draw_bar" style="  height: 94%; width: 100%;"></div>
    </div>
    <div id="scatter" ref="chart2">
      <h4 id="test4">CONFUSION MATRIX</h4>
      <div id="draw_scatter"></div>
    </div>
    <!--    <div id="tooltips" v-if="show">-->
    <!--      中位数:<strong>{{this.data[0]}}</strong><br/>-->
    <!--      平均值:<strong>{{this.data[1]}}</strong><br/>-->
    <!--      方差:<strong>{{this.data[2]}}</strong><br/>-->
    <!--      标准差:<strong>{{this.data[3]}}</strong><br/>-->
    <!--      调和平均:<strong>{{this.data[4]}}</strong>-->
    <!--    </div>-->
  </div>
</template>

<script>
import * as echarts from "echarts";
import * as d3 from "d3";
import $ from 'jquery'
import Readcsv from "../ToolJs/Readcsv";
import selector from "./selector";
import * as d4 from "../../public/d3";

export default {
  name: "top_right",
  components: {},
  data() {
    return {
      show: 0,
      data: null,
      sca_data: null,
      hotData: null,
    };
  },
  methods: {

    draw_hot() {
      let data = this.hotData;
      if (document.getElementById("draw_scatter") == null) {
        return;
      }
      echarts.dispose(document.getElementById("draw_scatter"));
      let myChart = echarts.init(document.getElementById("draw_scatter"));
      let option = {
        tooltip: {
          position: "top",
        },
        grid: {
          height: "83%",
          top: "0%",
          left: "15%",
        },
        xAxis: {
          type: "category",
          data: data.xAxis_data,

        },
        yAxis: {
          type: "category",
          data: data.yAxis_data,
        },
        visualMap: {
          type: "continuous",
          itemHeight: 120,
          itemWidth: 10,
          min: data.visual_data[1],
          max: data.visual_data[0],
          calculable: true,
          top: 50,
          right: 0,
          inRange: {
            color: [
              "rgba(250,247,247,0.5)",
              "#F0BBC1",
              "#FAF3E2",
              "#CBDCDF",
              "#B3CBCF",
            ],
          },
        },
        series: [
          {
            name: "Punch Card",
            type: "heatmap",
            data: data.series_data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },

    draw_kuntu() {
      var cities = {
        children: [
          {
            name: "test_decode",
            value: [2.41, -1.52],
            type: "test",
            advice: [2.75],
          },
          {
            name: "test_getLine",
            value: [0.73, -0.4],
            type: "test",
            advice: [0.2],
          },
          {
            name: "test_Setting",
            value: [5.3, -1.63],
            type: "test",
            advice: [0.79],
          },
          {
            name: "test_getMac",
            value: [1.61, -3.49],
            type: "test",
            advice: [2.53],
          },
          {
            name: "test_pile",
            value: [2.16, -0.89],
            type: "test",
            advice: [-0.9],
          },
          {
            name: "test_Receiver",
            value: [0.53, -0.62],
            type: "test",
            advice: [0.98],
          },
          {
            name: "test_digest",
            value: [0.48, -0.64],
            type: "test",
            advice: [-0.15],
          },
          {
            name: "test_getSubId",
            value: [1.57, -4.81],
            type: "test",
            advice: [-2.33],
          },
          {
            name: "test_Resources",
            value: [1.05, -2.13],
            type: "test",
            advice: [-1.81],
          },
          {
            name: "test_Library",
            value: [2.3, -0.74],
            type: "test",
            advice: [1.33],
          },
          {
            name: "test_init",
            value: [3.63, -1.33],
            type: "test",
            advice: [-0.91],
          },
          {
            name: "test_open",
            value: [1.39, -1.02],
            type: "test",
            advice: [1.36],
          },
          {
            name: "test_TextMessage",
            value: [2.54, -2.95],
            type: "test",
            advice: [-2.41],
          },
          {
            name: "test_register",
            value: [0.6, -0.52],
            type: "test",
            advice: [-1.13],
          },
          {
            name: "test_start",
            value: [1.04, -3.22],
            type: "test",
            advice: [-0.87],
          },
          {
            name: "test_TotalBytes",
            value: [0.84, -0.49],
            type: "test",
            advice: [-1.8],
          },
          {
            name: "train_pile",
            value: [3.16, -0.89],
            type: "train",
            advice: [],
          },
          {
            name: "train_Receiver",
            value: [2.53, -0.62],
            type: "train",
            advice: [],
          },
          {
            name: "train_digest",
            value: [2.47, -0.64],
            type: "train",
            advice: [],
          },
          {
            name: "train_getSubId",
            value: [0.57, -0.81],
            type: "train",
            advice: [],
          },
          {
            name: "train_getMac",
            value: [0.61, -0.49],
            type: "train",
            advice: [],
          },
          {
            name: "train_open",
            value: [4.39, -1.03],
            type: "train",
            advice: [],
          },
          {
            name: "train_start",
            value: [1.03, -0.21],
            type: "train",
            advice: [],
          },
          {
            name: "train_Resources",
            value: [3.97, -0.14],
            type: "train",
            advice: [],
          },
          {
            name: "train_Library",
            value: [4.31, -0.74],
            type: "train",
            advice: [],
          },
          {
            name: "train_init",
            value: [2.65, -1.32],
            type: "train",
            advice: [],
          },
          {
            name: "train_TextMessage",
            value: [1.56, -2.96],
            type: "train",
            advice: [],
          },
          {
            name: "train_register",
            value: [2.61, -0.53],
            type: "train",
            advice: [],
          },
          {
            name: "train_TotalBytes",
            value: [1.83, -0.49],
            type: "train",
            advice: [],
          },
          {
            name: "train_getLine",
            value: [2.73, -0.39],
            type: "train",
            advice: [],
          },
          {
            name: "train_Setting",
            value: [2.3, -1.65],
            type: "train",
            advice: [],
          },
          {
            name: "train_decode",
            value: [2.42, -1.51],
            type: "train",
            advice: [],
          },
        ],
      };

      var railway = [
        { source: "train_init", target: "test_init" },
        { source: "train_digest", target: "test_digest" },
        { source: "train_TotalBytes", target: "test_TotalBytes" },
        { source: "train_pile", target: "test_pile" },
        { source: "train_register", target: "test_register" },
        { source: "train_getLine", target: "test_getLine" },
        { source: "train_getSubId", target: "test_getSubId" },
        { source: "train_getMac", target: "test_getMac" },
        { source: "train_Library", target: "test_Library" },
        { source: "train_decode", target: "test_decode" },
        { source: "train_open", target: "test_open" },
        { source: "train_Receiver", target: "test_Receiver" },
        { source: "train_Resources", target: "test_Resources" },
        { source: "train_TextMessage", target: "test_TextMessage" },
        { source: "train_start", target: "test_start" },
        { source: "train_Setting", target: "test_Setting" },
      ];

      var width = $('#draw_bar').width();
      var height = $('#draw_bar').height()

      var map = function (nodes, links) {
        //console.log(nodes,'mapnodes')
        //console.log(links,'maplink')
        var hash = [];
        for (var i = 0; i < nodes.length; i++) {
          hash[nodes[i].name] = nodes[i];
        }
        //console.log(hash,'maphash')
        var resultLinks = [];
        //console.log(links[1].source,'linkssource')
        //console.log(hash[links[1].source],'hash[links1]')
        for (var i = 0; i < links.length; i++) {
          //console.log(hash[links[i]["source"]],'hash[links[i].source]')
          resultLinks.push({
            source: hash[links[i].source],
            target: hash[links[i].target],
          });
        }
        //console.log(resultLinks,'mapresS')
        return resultLinks;
      };

      // 分别创建一个集群图布局和一个捆图布局，360表示角度，width/2 - 50 表示捆图圆半径
      var cluster = d3.layout.cluster().size([360, width /3.5 ]);
      var bundle = d3.layout.bundle();

      var nodes = cluster.nodes(cities);
      //console.log(nodes, 'nodes')
      //console.log(railway, 'railway')
      var oLinks = map(nodes, railway);
      // console.log(oLinks, 'olinks')
      var links = bundle(oLinks);
      // console.log(links, 'links')
      let tooltip = d3
        .select("#draw_bar")
        .append("div")
        .attr("id", "feature_compar_tooltip")
        .style("position",'absolute')
        .style("opacity", 0)
        .style("width",200+'px')
        .style('height','auto')
        .style('font-size',14+'px')
        .style('border',`${1}px solid rgb(214, 205, 205)`)
        .style('background-color','rgb(214, 205, 205)')

      //缩放功能
      var zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

      function zoomed() {
        svg.attr("transform",
          "translate(" + zoom.translate() + ")" +
          "scale(" + zoom.scale() + ")"
        );
      }

      var svg = d3
        .select("#draw_bar")
        .append("svg")
        .attr('width', width)
        .attr('height', height*0.96)
        .append("g")
        .attr("id", "kuntu_g")
        // .attr("preserveAspectRatio", "xMidYMid meet")
        // .attr("viewBox", "0 0 400 400")
        .call(zoom)

      var line = d3.svg.line
        .radial()
        .interpolate("bundle") //在line.interpolate()所预定义的插值模式中，有一种就叫做bundle，正是为捆图准备的。
        .radius(function (d) {
          //console.log(d, 'liter')
          return d.y;
        })
        .angle(function (d) {
          return (d.x / 360) * 3 * Math.PI;
        });

      var gBundle = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .attr("id", "all_g");

      var color = [
        "#cce8e2",
        "#EFBAC0",
        "#F9F3E1",
        "#EDE9BF",
        "#F7E7E0",
        "#F7DDC0",
        "#F9BCB2",
        "#ea8991",
        "#cbdcdf",
        "#a5bbbf",
        "#cce8e2",
        "#ce848f",
        "#EFBAC0",
        "#F9F3E1",
        "#EDE9BF",
        "#F7E7E0",
        "#F7DDC0",
      ];

      // var tooltip = d3
      //   .select("#all_g")
      //   .append("div")
      //   .attr("class", "tooltip") //用于css设置类样式
      //   .attr("opacity", 0.0);

      var link = gBundle
        .selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .classed("link", true)
        .style({
          fill: "none",
          stroke: "rgba(0,0,0,0.5)",
          "stroke-width": 2,
          opacity: 0.2,
        })
        .attr("d", line);

      var node = gBundle
        .selectAll(".node")
        .data(
          nodes.filter(function (d) {
            return !d.children;
          })
        ) //排除数据中最顶层的空数据
        .enter()
        .append("g")
        .attr("class", "node")
        .classed("node", true)
        .attr("id", function (d) {
          return d.name;
        })
        .attr("transform", function (d) {
          drwapie(d);
          return "rotate(" + (d.x - 90) + ") translate(" + d.y + ")"; //这里为什么是d.x- 90，我也还不明白，暂先用着，后续再深入了解
        })
        .on('mouseenter',(d,i)=>{
          // console.log(d,i)
          var x = event.offsetX;
          var y = event.offsetY;
          tooltip
            .html(()=>{
              let res=` feature:${d.name} </br>
                        正影响：${d.value[0]}</br>
                        负影响：${d.value[1]}</br>`
              if(d.advice[0]){
                if (d.advice[0] < 0 && d.advice[0] - (d.advice[0] % 1) == 0) {
                  //建议下调权重 整数为0的负小数
                  return res+"建议下调权重:" + d.advice[0];
                } else if (d.advice[0] > 0 && d.advice[0] - (d.advice[0]% 1) == 0) {
                  //建议上调权重 整数为0的正小数
                  return res+"建议上调权重:" + d.advice[0];
                } else if (d.advice[0] - (d.advice[0] % 1) != 0) {
                  //建议删除该特征 整数不为0
                  return res+`建议删除该特征:${d.name}`;
                }
              }
              return res
            })
            .style("left", x + "px")
            .style("top", y + 20 + "px")
            .style("opacity", 1);


        })
        .on("mouseleave", function (d, i) {
          tooltip.style('opacity',0);
        });
      //饼图上的文字
      // node.append('text')
      //   .attr('dy',function (d) {
      //     return d.dy
      //   })
      //   .attr('dx',function (d) {
      //     return d.dx
      //   })
      //   .style("text-anchor", "middle")
      //   .text(function(d,i){
      //     return d.name;
      //   })

      //向node中添加饼图
      function drwapie(data) {
        // console.log("drawpie", data);
        var g = svg.selectAll("#" + data.name).append("g");

        var pie = d3.layout.pie();

        var outRadius = 7;  //设置饼图的半径
        var innerRadius = 10;

        var path0 = d3.svg
          .arc()
          // .innerRadius(innerRadius)
          .outerRadius(outRadius);

        var path1 = d3.svg.arc().outerRadius(outRadius * 1.2);
         var arcs1 = g
          .selectAll(".arc") //生成和dataset对应的g ,class是arc,数据集有多少个，类有多少个
          .data([data.value]) //pie(dataset)把数据本身进行改变
          .enter()
          .append("g")
          .attr("class", "arc")
           .on('mouseenter',(d,i)=>{
             // console.log(d,i)
             var x = event.offsetX;
             var y = event.offsetY;
             tooltip
               .html(()=>{
                 let res=`feature:${d.name} </br>
                          正影响：${d.value[0]}</br>
                          负影响：${d.value[1]}</br>`
                 if(d.advice[0]){
                   if (d.advice[0] < 0 && d.advice[0] - (d.advice[0] % 1) == 0) {
                     //建议下调权重 整数为0的负小数
                     return res+"建议下调权重:" + d.advice[0];
                   } else if (d.advice[0] > 0 && d.advice[0] - (d.advice[0]% 1) == 0) {
                     //建议上调权重 整数为0的正小数
                     return res+"建议上调权重:" + d.advice[0];
                   } else if (d.advice[0] - (d.advice[0] % 1) != 0) {
                     //建议删除该特征 整数不为0
                     return res+`建议删除该特征:${d.name}`;
                   }
                 }
                 return res
               })
               .style("left", x + "px")
               .style("top", y + 20 + "px")
               .style("opacity", 1);


           })
           .on("mouseleave", function (d, i) {
             tooltip.style('opacity',0);
           });

        arcs1.selectAll("path")
          .data(pie(data.value))
          .enter()
          .append("path")
          .attr("d", path0)
          .attr("fill", function (d, i) {
            return color[i];
          });
        //#region
        //----------------------内侧特征影响饼图----------------------
        // var arcs1 = g
        //   .selectAll(".arc") //生成和dataset对应的g ,class是arc,数据集有多少个，类有多少个
        //   .data(pie(data.value)) //pie(dataset)把数据本身进行改变
        //   .enter()
        //   .append("g")
        //   .attr("class", "arc")
        //   .on("mouseover", function (d, i) {
        //     // d3.select(this).select("path")
        //     //     .attr("d",path0);
        //     console.log(this, "ddddddd");
        //     console.log(d,i,"---")
        //     // d4.select(this).select("path").attr("fill", "#ad4646")
        //     var x = event.offsetX;
        //     var y = event.offsetY;
        //     console.log(`x=${x},y=${y}`);
        //     tooltip
        //       .html(
        //         `数据：${d.value}`
        //       )
        //       .style("left", x + "px")
        //       .style("top", y + 20 + "px")
        //       .style("opacity", 1);
        //     // svg
        //     //   .append("text")
        //     //   .attr("id", "tooltip")
        //     //   .attr("x", x + 20)
        //     //   .attr("y", y + 20)
        //     //   .attr("text-anchor", "middle")
        //     //   .attr("font-family", "sans-setif")
        //     //   .attr("font-size", "15px")
        //     //   .attr("font-weight", "bold")
        //     //   .attr("fill", "black")
        //     //   .text(d.value);
        //   })
        //   .on("mouseout", function (d, i) {
        //     tooltip.style('opacity',0);
        //   });
        // // .attr("transform","translate("+outRadius+","+innerRadius+")"); //圆心位置

        // arcs1
        //   .append("path")
        //   .attr("d", path0)
        //   .attr("fill", function (d, i) {
        //     return color[i];
        //   });

        // arcs1.on("mouseover",function (d,i) {
        //   // d3.select(this).select("path").attr("d",path1)
        //
        //   var x=event.pageX;
        //   var y=event.pageY;
        //
        //   svg.append("text")
        //     .attr("id", "tooltip")
        //     .attr("x", x)
        //     .attr("y", y)
        //     .attr("text-anchor", "middle")
        //     .attr("font-family", "sans-setif")
        //     .attr("font-size", "15px")
        //     .attr("font-weight", "normal")
        //     .attr("fill", "black")
        //     .text( '%')
        // })

        // arcs1.on("mouseout",function (d,i) {
        //   d3.select("#tooltip").remove();
        //   d3.select(this).select("path").attr("d",path0)
        // })
        //#endregion
        //----------------------外侧建议值----------------------

        var path2 = d3.svg
          .arc()
          .innerRadius(outRadius * 1.3)
          .outerRadius(outRadius * 1.3 + Math.abs(data.advice[0] * 2));

        var arcs2 = g
          .selectAll(".out_arc")
          .data(()=>{
            return pie(data.advice)})
          .enter()
          .append("g")
          .attr("class", "out_arc");

        arcs2
          .append("path")
          .attr("d", path2)
          .attr("fill", function (d, i) {
            // console.log('ddaata',d)
            if (d.data < 0 && d.data - (d.data % 1) == 0) {
              //建议下调权重 蓝色
              return "#83b4ce";
            } else if (d.data > 0 && d.data - (d.data % 1) == 0) {
              //建议上调权重 红色
              return "#efaf79";
            } else if (d.data - (d.data % 1) != 0) {
              //建议删除该特征 橙色
              return "#d27777";
            }
          })

        // arcs2.on("mouseover", function (d, i) {
        //   var x = event.offsetX;
        //   var y = event.offsety;
        //   tooltip
        //       .html(()=>{
        //         console.log("on",d)
        //         if (d.data < 0 && d.data - (d.data % 1) == 0) {
        //         //建议下调权重 整数为0的负小数
        //         return "建议下调权重:" + d.data;
        //       } else if (d.data > 0 && d.data - (d.data % 1) == 0) {
        //         //建议上调权重 整数为0的正小数
        //         return "建议上调权重:" + d.data;
        //       } else if (d.data - (d.data % 1) != 0) {
        //         //建议删除该特征 整数不为0
        //         return `建议删除该特征:${d.data}`;
        //       }
        //       })
        //       .style("left", x + "px")
        //       .style("top", y+20 +"px")
        //       .style("opacity", 1);
        // });

        // arcs2.on("mouseout", function (d, i) {
        //   tooltip.style('opacity',0);
        // });
      }
    },
    draw_scatter() {
      echarts.dispose(document.getElementById("draw_scatter"));
      let myChart3 = echarts.init(document.getElementById("draw_scatter"));
      let color_list = [
        "#cbdcdf",
        "#a5bbbf",
        "#cce8e2",
        "#ce848f",
        "#EFBAC0",
        "#F7E7E0",
        "#F9F3E1",
        "#EDE9BF",
      ];
      // var data = [
      //   [[28604, 77, 17096869, 'Australia', 1990], [31163, 77.4, 27662440, 'Canada', 1990], [1516, 68, 1154605773, 'China', 1990], [13670, 74.7, 10582082, 'Cuba', 1990], [28599, 75, 4986705, 'Finland', 1990], [29476, 77.1, 56943299, 'France', 1990], [31476, 75.4, 78958237, 'Germany', 1990], [28666, 78.1, 254830, 'Iceland', 1990], [1777, 57.7, 870601776, 'India', 1990], [29550, 79.1, 122249285, 'Japan', 1990], [2076, 67.9, 20194354, 'North Korea', 1990], [12087, 72, 42972254, 'South Korea', 1990], [24021, 75.4, 3397534, 'New Zealand', 1990], [43296, 76.8, 4240375, 'Norway', 1990], [10088, 70.8, 38195258, 'Poland', 1990], [19349, 69.6, 147568552, 'Russia', 1990], [10670, 67.3, 53994605, 'Turkey', 1990], [26424, 75.7, 57110117, 'United Kingdom', 1990], [37062, 75.4, 252847810, 'United States', 1990]],
      //   [[44056, 81.8, 23968973, 'Australia', 2015], [43294, 81.7, 35939927, 'Canada', 2015], [13334, 76.9, 1376048943, 'China', 2015], [21291, 78.5, 11389562, 'Cuba', 2015], [38923, 80.8, 5503457, 'Finland', 2015], [37599, 81.9, 64395345, 'France', 2015], [44053, 81.1, 80688545, 'Germany', 2015], [42182, 82.8, 329425, 'Iceland', 2015], [5903, 66.8, 1311050527, 'India', 2015], [36162, 83.5, 126573481, 'Japan', 2015], [1390, 71.4, 25155317, 'North Korea', 2015], [34644, 80.7, 50293439, 'South Korea', 2015], [34186, 80.6, 4528526, 'New Zealand', 2015], [64304, 81.6, 5210967, 'Norway', 2015], [24787, 77.3, 38611794, 'Poland', 2015], [23038, 73.13, 143456918, 'Russia', 2015], [19360, 76.5, 78665830, 'Turkey', 2015], [38225, 81.4, 64715810, 'United Kingdom', 2015], [53354, 79.1, 321773631, 'United States', 2015]]
      // ];
      let xLabel = ["ACC", "FPR", "SPEC", "FN", "REC", "TPR", "SEN", "TNR"];
      // let data = [
      //   [
      //     [71.0, 57.0,2,'ACC','eta'],
      //     [67.15770152869895, 59.06505071668484,2,'FPR','eta'],
      //     [71.86230582535532, 51.268412020118355,2,'SPEC','eta'],
      //     [72.6389502408455, 65.12185371167489,2,'FN','eta'],
      //     [61.05785709792063, 50.50315289013807,2,'REC','eta'],
      //     [83.56637061435917, 56.99999999999999,2,'TPR','eta'],
      //     [56.99129414406843, 66.45137803864667,2,'SEN','eta'],
      //     [75.74552790280624, 39.31708336115213,2,'TNR','eta'],
      //   ],
      //   [[109.0, 70.0,2,'ACC'],
      //     [105.15770152869895, 72.06505071668484,2,'FPR'],
      //     [109.86230582535532, 64.26841202011836,2,'SPEC'],
      //     [110.6389502408455, 78.12185371167489,2,'FN'],
      //     [99.05785709792063, 63.50315289013807,2,'REC'],
      //     [121.56637061435917, 70.0,2,'TPR'],
      //     [94.99129414406843, 79.45137803864667,2,'SEN'],
      //     [113.74552790280624, 52.31708336115213,2,'TNR'],
      //   ],
      //   [
      //     [-66.0, 101.0,2,'ACC'],
      //     [-69.84229847130105, 103.06505071668484,2,'FPR'],
      //     [-65.13769417464468, 95.26841202011836,2,'SPEC'],
      //     [-64.3610497591545, 109.12185371167489,2,'FN'],
      //     [-75.94214290207937, 94.50315289013807,2,'REC'],
      //     [-53.43362938564083, 101.0,2,'TPR'],
      //     [-80.00870585593157, 110.45137803864667,2,'SEN'],
      //     [-61.254472097193755, 83.31708336115213,2,'TNR'],
      //
      //   ]
      // ]
      let data = this.sca_data;
      let option3 = {
        grid: {
          left: "5%",
          top: "5%",
          bottom: "8%",
          containLabel: true,
        },
        brush: {},

        // legend: {
        //   right: '10%',
        //   top: '0%',
        //    type: 'scroll',
        //   data: ['Eta', 'Mdp','Mcw']
        // },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
          show: false,
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
          axisTick: {
            show: false,
          },
          scale: true,
        },
        series: [],
      };
      for (let i = 0; i < 8; i++) {
        option3.series.push({
          name: data[i][0][3],
          data: data[i],
          type: "scatter",
          symbolSize: 15,
          //   function (data) {
          //   return Math.sqrt(data[2]) / 5e2;
          // },
          emphasis: {
            focus: "series",
            label: {
              show: true,
              formatter: function (param) {
                return param.data[3];
              },
              position: "top",
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetY: 5,
            shadowColor: "rgba(237,233,191,0.7)",
            color: function (params) {
              return color_list[params.dataIndex];
            },
          },
        });
      }
      var brushed = [];
      myChart3.setOption(option3);

      myChart3.on("brushSelected", renderBrushed);

      function distinct(a) {
        return Array.from(new Set(a));
      }

      function renderBrushed(params) {
        brushed = [];
        var brushComponent = params.batch[0];
        for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
          var dataIndices = brushComponent.selected[sIdx].dataIndex;

          for (var i = 0; i < dataIndices.length; i++) {
            var dataIndex = dataIndices[i];
            brushed.push(data[sIdx][dataIndex]);
          }
        }
        brushed = distinct(brushed);
      }

      myChart3.on("brushEnd", (params) => {
        console.log(brushed, "ssssssssss");
        Readcsv.Read_tooltip(brushed);
        this.show = 1;
      });
      myChart3.on("click", (params) => {
        this.show = 0;
        console.log(params, "ssss");
      });
    },
  },
  mounted() {
    // this.draw_bar();
    Readcsv.Read_hotData();
    this.draw_kuntu();
    // this.draw_scatter()
    // this.draw_scatter_dataAnalysis();
    // this.dragDisable
  },
  computed: {
    // sca_datas() {
    //   return this.$store.getters.get_sca_data;
    // },
    // tooltip_data() {
    //   return this.$store.getters.get_tooltip_data;
    // }
    hot_data() {
      return this.$store.getters.get_hotData;
    },
  },
  watch: {
    // sca_datas: function () {
    //   this.sca_data = this.sca_datas;
    //   this.draw_scatter();
    // },
    // tooltip_data: function () {
    //   this.data = this.tooltip_data;
    // }
    hot_data: function () {
      this.hotData = this.$store.getters.get_hotData;
      this.draw_hot();
    },
  },
};
</script>

<style scoped>
.top_right {
  width: 22.5vw;
  /*margin: 0;*/
  /*padding: 0.4%;*/
  border-top: 3px solid rgb(255, 255, 255);
  border-bottom: 3px solid rgb(255, 255, 255);
  /*border-right: 10px solid rgb(255,255,255);*/
  border-left: 10px solid rgb(255, 255, 255);
  position: relative;
}

#bar,
#scatter {
  height: 49%;
  width: 100%;
}

/* #tooltips {
  position: absolute;
  width: 110px;
  height: 110px;
  bottom: 30px;
  right: 50px;
  z-index: 100 !important;
  background-color: whitesmoke;
  border: 3px solid #c0c4c3;
  border-radius: 5px;
  font-family: 微软雅黑;
} */
#feature_compar_tooltip{
  position: absolute;
  width: 200px;
  height: auto;
  font-size: 14px;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  background-color: rgb(214, 205, 205);
  border-radius: 5px;
}
#draw_scatter,
#draw_bar {
  height: 95%;
  width: 100%;
}

#one_five,
#six_ten {
  padding: 0% 2% 0% 2%;
  width: 45%;
  height: 97%;
  float: left;
}

#test3 {
  font-family: 微软雅黑;
  background-color: rgb(242, 242, 242);
  padding: 3px 3px;
  text-align: center;
  border-bottom: 2px solid rgb(200, 200, 200);
  margin: 0px 0px 0px 0px;
}
#test4 {
  font-family: 微软雅黑;
  background-color: rgb(242, 242, 242);
  padding: 3px 3px;
  text-align: center;
  border-bottom: 2px solid rgb(200, 200, 200);
  margin: 0px 0px 20px 0px;
}
</style>
