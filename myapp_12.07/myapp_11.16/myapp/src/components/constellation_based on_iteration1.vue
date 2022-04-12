<template>
  <div class="div_center" id="div_centers">
    <h4> CONSTELLATION BASED ON ITERATION </h4>
    <div id="div_center"></div>
    <div class="demo1">
      <tree_menu></tree_menu>
    </div>
    <div class="demo2" id="treeview"></div>
  </div>

</template>

<script>
  import * as d3 from 'd3'
  // import * as d4 from 'd4'
  import $ from 'jquery'
  import * as echarts from 'echarts'
  import tree_menu from "./tree_menu";
  import controls from "./controls(useless)";
  import key_button from "./key_button";
  import Readcsv from "../ToolJs/Readcsv";

  export default {
    name: 'div_center',
    data() {
      return {
        control_set: {},
        color_treeData: null
      }
    },
    components: {
      tree_menu
    },
    methods: {
      node_view(type_name, style) {
        //console.log(style["secondary_node"])
        $("#div_center").empty();
        d3.select('#div_center').selectAll('svg').remove();

        var width = $('#div_center').width(),
          height = $('#div_center').height() * 0.96,
          root;

        var svg = d3.select("#div_center").append('svg')
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("id", "all_g")

        const len = Object.keys(type_name).length

        function draw_charts(name, type_name, x_transform, y_transform, radius) {

          var data_inner = [
            [radius * 0.9, radius * 0.16],
            [-radius * 0.9, radius * 0.16],
            [radius * 0.9, -radius * 0.16],
            [-radius * 0.9, -radius * 0.16],

            [-radius / 1.9, radius / 3.15],

            [radius / 1.9, -radius / 3.15],
            [0, radius * 0.375],
            [0, -radius * 0.375]
          ]

          var data_outer = [
            [-radius * 1.2, 0],
            [radius * 1.2, 0],
            [radius * 0.9, radius * 0.3],
            [-radius * 0.9, -radius * 0.3],
            [radius * 0.9, -radius * 0.3],
            [radius * 0.35, -radius * 0.43],
            [radius * 0.35, radius * 0.43],
            [-radius * 0.9, radius * 0.3],
            [-radius * 0.35, radius * 0.43],
            [-radius * 0.35, -radius * 0.43],
          ]

          for (var obj in type_name) {

            for (var i = 0; i < data_inner.length; i++) {
              data_inner[i].push(Object.values(type_name[obj][1])[i], Object.keys(type_name[obj][0])[i])

            }
            for (var i = 0; i < data_outer.length; i++) {
              data_outer[i].push(Object.values(type_name[obj][0])[i], Object.keys(type_name[obj][1])[i])
            }
          }

          //绘制极坐标轴
          function polar_plot() {
            //比例尺
            var r_inner = d3.scale.linear()
              .domain([0, radius * 0.9])
              .range([0, radius]);

            var r_outer = d3.scale.linear()
              .domain([0, radius * 0.9])
              .range([0, radius]);

            var line = d3.svg.line.radial()
              .radius(function (d) {
                return r(d[1]);
              })
              .angle(function (d) {
                return -d[0] + Math.PI / 2;
              });

            //内半径坐标轴
            var gr_inner = svg.append("g")
              .attr("class", "r axis inner")
              .attr("transform", "translate(" + x_transform / 2 + "," + y_transform / 2 + ")");

            gr_inner.append("circle")
              .attr("r", radius)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-dasharray", "4")
              .style("opacity", style["secondary_node"][1])
              .attr("transform", "translate(" + x_transform / 2 + "," + y_transform / 2 + ")");

            //外半径坐标轴
            var gr_outer = svg.append("g")
              .attr("class", "r axis outer")
              .attr("transform", "translate(" + x_transform / 2 + "," + y_transform / 2 + ")");

            gr_outer.append("circle")
              .attr("r", radius * 1.2)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-dasharray", "4")
              .style("opacity", style["secondary_node"][1])
              .attr("transform", "translate(" + x_transform / 2 + "," + y_transform / 2 + ")");

            var temp1 = x_transform - radius / 2
            var temp2 = y_transform + radius * 1.4

            svg.append("text")
              .text(name)
              .style("font-size", 18)
              .style("fill", '#000000')
              .attr("text-align", "center")
              .attr("transform", "translate(" + temp1 + "," + temp2 + ")");


            //角度坐标轴
            // var ga = svg.append("g")
            //     .attr("class", "a axis")
            //     .selectAll("g")
            //     .data(d3.range(0, 360, 36))  //0-360度中间隔360度画一条线
            //     .enter()
            //     .append("g")
            //     .attr("transform", "translate(" + width / 4 + "," + height / 4 + ")");
            // .attr("transform", function(d) {
            //    // console.log("rotate(" + -d + ")")
            //     return "rotate(" + -d + ")";
            // });
            //
            // ga.append("line")
            //     .attr("x2", radius);

            var color = ['#cbdcdf', '#a5bbbf', '#cce8e2', '#ce848f', '#EFBAC0',
              '#F9F3E1', '#EDE9BF', '#F7E7E0', '#F7DDC0',
              '#F9BCB2', '#ea8991', '#cbdcdf', '#a5bbbf',
              '#cce8e2', '#ce848f', '#EFBAC0', '#F9F3E1',
              '#EDE9BF', '#F7E7E0', '#F7DDC0'];

            svg.selectAll("point")
              .data(data_inner)
              .enter()
              .append("circle")
              .attr("class", "point")

              .attr("id", function (d) {
                return d[3]
              })
              .attr("transform", function (d) {
                var an = d[0],
                  ra = r_inner(d[1]),
                  x = ra + x_transform + d[1] * 1.55,
                  y = an + y_transform;
                return "translate(" + [x, y] + ")";
              })
              .attr("r", function (d) {
                // console.log(d)
                return d[2] * (style["secondary_node"][0] / 2)
              })
              .attr("fill", function (d, i) {
                return color[i];
              })
              .style("opacity", style["secondary_node"][1])

            svg.selectAll("point")
              .data(data_outer)
              .enter()
              .append("circle")
              .attr("class", "point")
              .attr("id", function (d) {
                return d[3]
              })
              .attr("transform", function (d) {
                //console.log(d[1])
                // console.log( r(d[1]))
                var an = d[0],
                  ra = r_outer(d[1]),
                  x = ra + x_transform + d[1] * 1.55,
                  y = an + y_transform;
                return "translate(" + [x, y] + ")";
              })
              .attr("r", function (d) {
                return d[2] * (style["secondary_node"][0] / 2)
              })
              .attr("fill", function (d, i) {
                return color[i];
              })
              .style("opacity", style["secondary_node"][1])


          }

          //绘制中心径向树图
          function center_tree() {
            //外圈圆形
            var forces = svg.append("circle")
              .attr("id", "circle")
              .attr("cx", x_transform)
              .attr("cy", y_transform)
              .attr("r", radius * 0.8)
              .style("fill", 'rgba(203, 220, 223,0.2)')
              .style("stroke", "rgba(123,172,186,0.7)")
              .style("stroke-width", "10px")
            //.attr("transform", "translate(" -10  + "," -10  + ")");

            var tooltip = d3.select("#all_g").append("div")
              .attr("class", "tooltip") //用于css设置类样式
              .attr("opacity", 0.0);

            //圆中树图
            var force = d3.layout.force()
              .size([$('#circle').width(), $('#circle').height()])
              .on("tick", tick)

            var link = svg.append("g")
              .attr("id", "tree_link")
              .selectAll(".link")

            var node = svg.append("g")
              .attr("id", "tree_node")
              .attr("width", x_transform)
              .attr("height", y_transform)
              .selectAll(".node")


            d3.json("../data/center_layout_json/" + name + ".json", function (error, json) {
              if (error) throw error;
              root = json;
              update();
            });

            function update() {

              var nodes = flatten(root),
                links = d3.layout.tree().links(nodes);

              // Restart the force layout.
              force
                .nodes(nodes)
                .links(links)
                .start()

              // Update the links…
              link = link.data(links, function (d) {
                return d.target.id;
              });

              // Exit any old links.
              link.exit().remove();

              // Enter any new links.
              link.enter().insert("line", ".node")
                .attr("class", "link")
                .attr("x1", function (d) {
                  return d.source.x * radius * 0.1;
                })
                .attr("y1", function (d) {
                  return d.source.y * radius * 0.1;
                })
                .attr("x2", function (d) {
                  return d.target.x * radius * 0.1;
                })
                .attr("y2", function (d) {
                  return d.target.y * radius * 0.1;
                })
                .style("stroke", style["edge"][2])
                .style("stroke-width", style["edge"][0])
                .style("opacity", style["edge"][1])
                .attr("transform", "translate(" + x_transform + "," + y_transform + ")");

              // Update the nodes…
              node = node.data(nodes, function (d) {
                return d.id;
              }).style("fill", color);

              // Exit any old nodes.
              node.exit().remove();

              // Enter any new nodes.
              node.enter()
                .append("circle")
                .attr("class", "node")
                .attr("id", function (d) {
                  return d.name;
                })
                .attr("cx", function (d) {
                  return d.x * radius * 0.1;
                })
                .attr("cy", function (d) {
                  return d.y * radius * 0.1;
                })
                .attr("r", function (d) {
                  if (d.name.substr(0, 4) == 'tree') {
                    return style["master_node"][0];
                  } else if (d.name == 'flare') {
                    return 13;
                  } else {
                    return style["master_node"][1];
                  }
                })
                .style("fill", function (d) {
                  if ((d.name.substr(0, 4) == 'tree') || (d.name == 'flare')) {
                    return style["master_node"][3];
                  } else {
                    return style["master_node"][4];
                  }
                })
                .style("opacity", style["master_node"][2])
                .style("stroke", "rgba(125,125,125,0.5)")
                .style("stroke-width", "0.5px")
                // .on("click", click)   //单击操作冲突，暂时取消节点的收起功能
                .on('click', function (d) {
                  if (d.name.substr(0, 4) == 'tree') {
                    treeview(name, this.id)
                  }
                })
                .on("mousedown", function () {
                  d3.select(this).style('stroke-width', 4)//被选中的圆圈边框
                })
                .on("mouseup", function () {
                  d3.select(this).style('stroke-width', 1.5)//被选中的圆圈边框
                })
                .attr("transform", "translate(" + x_transform + "," + y_transform + ")")
                .on("mouseover", function (d) {
                  var x = d3.event.pageX;
                  var y = d3.event.pageY + 20;
                  // console.log(x, y)
                  // 添加标签
                  svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", x - 400)
                    .attr("y", y - 200)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-setif")
                    .attr("font-size", "15px")
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .text(d.name);

                })
                .on("mouseout", function (d) {
                  d3.select("#tooltip").remove();
                });

            }

            function tick() {
              if (force.alpha() <= 0.02) {    //渲染全部数据完成后再绘图，足够稳定时，才渲染一次
                link.attr("x1", function (d) {
                  return d.source.x * radius * 0.0035;  //力道向图的缩放问题
                })
                  .attr("y1", function (d) {
                    return d.source.y * radius * 0.0035;
                  })
                  .attr("x2", function (d) {
                    return d.target.x * radius * 0.0035;
                  })
                  .attr("y2", function (d) {
                    return d.target.y * radius * 0.0035;
                  })
                node.attr("cx", function (d) {
                  return d.x * radius * 0.0035;
                })
                  .attr("cy", function (d) {
                    return d.y * radius * 0.0035;
                  })
                //force.stop(); // 渲染完成后立即停止刷新
              }
            }

            // Color leaf nodes orange, and packages white or blue.
            function color(d) {
              return d._children ? "#CF8590" : d.children ? "#f1d5d8" : "#CCDDDF";
            }

            // Toggle children on click.
            function click(d) {
              if (!d3.event.defaultPrevented) {
                if (d.children) {
                  d._children = d.children;
                  d.children = null;
                } else {
                  d.children = d._children;
                  d._children = null;
                }
                update();
              }
            }

            // Returns a list of all nodes under the root.
            function flatten(root) {
              var nodes = [], i = 0;

              function recurse(node) {
                if (node.children) node.children.forEach(recurse);
                if (!node.id) node.id = ++i;
                nodes.push(node);
              }

              recurse(root);
              return nodes;
            }

          }

          center_tree()
          polar_plot()

          //绘制右下角树图
          function treeview(file_name, node_name) {
            //console.log(file_name,node_name)
            var dom = document.getElementById("treeview");
            var myChart = echarts.init(dom);
            var app = {};

            var option;
            $.get('../data/treeview_data/' + file_name + '.json', function (data) {
              myChart.hideLoading();
              myChart.setOption(option = {
                backgroundColor: '#ffffff',
                title: {
                  text: file_name + ' 中的 ' + node_name + ' 结构',
                  left: "center",
                  top: '3%',
                  textStyle: {
                    color: '#5e5e5f',
                    fontWeight: 'bolder',
                    fontSize: 14,
                  },
                },
                tooltip: {
                  trigger: 'item',
                  triggerOn: 'mousemove'
                },
                series: [
                  {
                    type: 'tree',
                    data: [data['children'][node_name.split('tree')[1]]],
                    left: '2%',
                    right: '2%',
                    top: '13%',
                    bottom: '20%',
                    symbol: 'emptyCircle',
                    orient: 'vertical',
                    expandAndCollapse: true,
                    zoom: 1, //当前视角的缩放比例
                    roam: true, //是否开启平游或缩放
                    scaleLimit: { //滚轮缩放的极限控制
                      min: 0.3,
                      max: 5
                    },
                    label: {
                      position: 'top',
                      rotate: 0,
                      verticalAlign: 'middle',
                      align: 'right',
                      fontSize: 13,
                      color: 'rgba(53,51,60,0.7)'
                    },
                    leaves: {
                      label: {
                        position: 'bottom',
                        rotate: -90,
                        verticalAlign: 'middle',
                        align: 'left'
                      }
                    },
                    animationDurationUpdate: 750
                  }
                ]
              });
            });


            if (option && typeof option === 'object') {
              myChart.clear()
              setTimeout(() => {
                echatsInstance.setOption([option])
              }, 500)
            }
          }

        }

        let name = []

        for (var obj in type_name) {
          name.push(obj)
        }
        // console.log(name)
        if (len == '1') {
          draw_charts(name, type_name, width * 0.4, height * 0.5, width * 0.18)
        } else if (len == '2') {
          draw_charts(name[0], type_name, width * 0.18, height * 0.6, width * 0.13)
          draw_charts(name[1], type_name, width * 0.5, height * 0.35, width * 0.13)
        } else if (len == '3') {
          draw_charts(name[0], type_name, width * 0.17, height * 0.28, width * 0.105)
          draw_charts(name[1], type_name, width * 0.6, height * 0.28, width * 0.105)
          draw_charts(name[2], type_name, width * 0.4, height * 0.7, width * 0.105)
        } else if (len == '4') {
          draw_charts(name[0], type_name, width * 0.18, height * 0.25, width * 0.09)
          draw_charts(name[1], type_name, width * 0.5, height * 0.25, width * 0.09)
          draw_charts(name[2], type_name, width * 0.18, height * 0.75, width * 0.09)
          draw_charts(name[3], type_name, width * 0.5, height * 0.75, width * 0.09)
        } else if (len == '5') {
          draw_charts(name[1], type_name, width * 0.18, height * 0.25, width * 0.09)
          draw_charts(name[2], type_name, width * 0.45, height * 0.25, width * 0.09)
          draw_charts(name[3], type_name, width * 0.18, height * 0.75, width * 0.09)
          draw_charts(name[4], type_name, width * 0.45, height * 0.75, width * 0.09)
          draw_charts(name[5], type_name, width * 0.7, height * 0.25, width * 0.09)
        }
      },
      draw_color_tree() {
        // $("#div_center").empty();
        let myChat1 = echarts.init(document.getElementById('div_center'));
        let data1 = this.color_treeData[0];
        console.log(data1, 'uuu')
        let data2 = this.color_treeData[8];
        let datas =
          {
            "nodeid": 0,
            "children": [
              {
                "nodeid": 1,
                "lineStyle": {
                  "opacity": 0
                },
                "itemStyle": {
                  "opacity": 0
                }
              },
              {
                "nodeid": 2,
                "children": [
                  {
                    "nodeid": 2,
                    "lineStyle": {
                      "opacity": 0
                    },
                    "itemStyle": {
                      "opacity": 0
                    }
                  },
                  {
                    "nodeid": 3,
                    "children": [
                      {
                        "symbolSize": 22,
                        "nodeid": 999,
                        "itemStyle": {
                          "color": "red"
                        }
                      },
                      {
                        "symbolSize": 19,
                        "nodeid": 999,
                        "itemStyle": {
                          "color": "blue"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          };

        let option = {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: []

        }
        let lefts = 0
        // let heights = 10
        let that = this
        function location(heights) {
          that.color_treeData.forEach(function (element, k) {
          // if (k >= 10) {
          //   heights = 80 + 80
          //   lefts = 0 + (k-10) * 100;
          //
          // }
          if (k > 0){
            lefts = k * 60;
          }
          else {
            lefts = 0
          }
          console.log(element, k);
          option.series.push({
              type: 'tree',
              data: [element],
              left: lefts,//0-1020
              height: 80,
              width: 100,
              top: heights, //10-280
              symbol: 'circle',
              orient: 'vertical',
              expandAndCollapse: true,
              itemStyle: {
                color: 'black'
              },
              label: {
                position: 'top',
                rotate: -90,
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 9
              },
              leaves: {
                label: {
                  position: 'bottom',
                  rotate: -90,
                  verticalAlign: 'middle',
                  align: 'left'
                }
              },
              initialTreeDepth: -1,
              animationDurationUpdate: 750,
              lineStyle: {
                // curveness:0.1,
                color: 'rgb(142, 142, 142)'
              }

            }
          )
        })
        }
          location(10)
          location(130)
          location(260)
          myChat1.setOption(option);
        }
      }
      ,

      mounted() {
        // this.node_view()
        Readcsv.Read_color_data();
        // Readcsv.Read_samplebar_data();
        console.log('sss')


      }
      ,

      computed: {
        control2() {
          return this.$store.getters.get_control2;
          // return this.$store.getters.get_hotData;
        }
        ,
        center_data() {
          return this.$store.getters.get_centerData;
        }
        ,
        centerDataTree() {
          return this.$store.getters.get_centerDataTree;
        }
        ,
        color_tree_data() {
          return this.$store.getters.get_color_tree_data;
        }

      }
      ,
      watch: {
        // tree_menu:function () {
        //    //this.=this.$store.getters.get_treeMenu
        // },
        color_tree_data: function () {
          this.color_treeData = this.color_tree_data.data;

          this.draw_color_tree()
        }
        ,

        control2: function () {

          this.control_set = this.$store.getters.get_control2
          // this.node_view(
          //   {
          //     "SMS_malware": [
          //       {
          //         "attr_a": 10,
          //         "attr_b": 8,
          //         "attr_c": 7,
          //         "attr_d": 13,
          //         "attr_e": 12,
          //         "attr_f": 10,
          //         "attr_g": 8,
          //         "attr_h": 7,
          //       },   //属性
          //       {
          //         "p_a": 10,
          //         "p_b": 8,
          //         "p_c": 7,
          //         "p_d": 13,
          //         "p_e": 12,
          //         "p_f": 10,
          //         "p_g": 8,
          //         "p_h": 7,
          //       },   //性能
          //     ],
          //     "Bank_malware": [
          //       {
          //         "attr_a": 10,
          //         "attr_b": 8,
          //         "attr_c": 7,
          //         "attr_d": 13,
          //         "attr_e": 12,
          //         "attr_f": 10,
          //         "attr_g": 8,
          //         "attr_h": 7,
          //       },   //属性
          //       {
          //         "p_a": 10,
          //         "p_b": 8,
          //         "p_c": 7,
          //         "p_d": 13,
          //         "p_e": 12,
          //         "p_f": 10,
          //         "p_g": 8,
          //         "p_h": 7,
          //       },   //性能
          //     ],
          //     "Benign_application": [
          //       {
          //         "attr_a": 10,
          //         "attr_b": 8,
          //         "attr_c": 7,
          //         "attr_d": 13,
          //         "attr_e": 12,
          //         "attr_f": 10,
          //         "attr_g": 8,
          //         "attr_h": 7,
          //
          //       },   //属性
          //       {
          //         "p_a": 10,
          //         "p_b": 8,
          //         "p_c": 7,
          //         "p_d": 13,
          //         "p_e": 12,
          //         "p_f": 10,
          //         "p_g": 8,
          //         "p_h": 7,
          //
          //       },   //性能
          //     ]
          //   }, this.control_set)
          this.node_view({
            "SMS_malware": [{
              "precision": 6,
              "recall": 6,
              "specificity": 6,
              "falseAlarm": 6,
              "missRate": 6,
              "accuracy": 6,
              "missRat": 6,
              "accurac": 6,
              "f1": 6,
              "AUC": 6
            }, {
              "access": 6,
              "pread64": 6,
              "mkdir": 6,
              "getDisplayInfo": 6,
              "relayout": 6,
              "CREATE_FOLDER_____": 6,
              "munmap": 6,
              "statfs64": 6,
              "TERMINATE_THREAD": 6,
              "getApplicationInfo": 6
            }],
            "Bank_malware": [{
              "precision": 6,
              "recall": 6,
              "precisio": 6,
              "recal": 6,
              "specificity": 6,
              "falseAlarm": 6,
              "missRate": 6,
              "accuracy": 6,
              "f1": 6,
              "AUC": 6
            }, {
              "isAdminActive": 6,
              "lstat64": 6,
              "read": 6,
              "access": 6,
              "getLine1Number": 6,
              "getDisplayInfo": 6,
              "recvfrom": 6,
              "fchmod": 6,
              "writev": 6,
              "sigprocmask": 6
            }]
          }, this.control_set)
        }
        ,
        center_data: function () {
          let draw_data = [];
          let main_data = this.center_data;
          for (let i = 0; i < main_data.length; i++) {
            let key = main_data[i].label;
            draw_data.push(key.split(':')[0]);
          }
          Readcsv.Read_centerData(draw_data);
          console.log(draw_data, 'hhhhhh')
          // console.log(this.$store.getters.get_centerDataTree,'wwww')
          // this.node_view(draw_data);
        }
        ,

        centerDataTree: function () {
          let this_data = this.centerDataTree;
          // let key;
          // for (key in this_data)
          // {
          //   console.log(this_data[key], 'ssss')
          // }
          console.log(this_data, 'ssss')
          this.node_view(this_data, this.control_set)
          //  this.node_view(
          //    {
          //      "SMS_malware": [
          //        {
          //          "att_a": 10,
          //          "att_b": 8,
          //          "att_c": 7,
          //          "att_d": 13,
          //          "att_e": 12,
          //          "att_f": 10,
          //          "att_g": 8,
          //          "att_h": 7,
          //          "att_i": 13,
          //          "att_j": 12
          //        },   //属性
          //        {
          //          "p_a": 10,
          //          "p_b": 8,
          //          "p_c": 7,
          //          "p_d": 13,
          //          "p_e": 12,
          //          "p_f": 10,
          //          "p_g": 8,
          //          "p_h": 7,
          //          "p_i": 13,
          //          "p_j": 12
          //        },   //性能
          //      ]
          //    }, this.control_set)
        }


      }
    }
</script>

<style scoped>
  .div_center {
    width: 60vw;
    position: relative;
    /*margin: 0 0.2%;*/
    border-top: 3px solid rgb(255, 255, 255);
    border-bottom: 3px solid rgb(255, 255, 255);

  }

  .demo2 {
    height: 20vh;
    width: 43vw;
    position: absolute;
    right: 10px;
    bottom: -20px;
    z-index: 999;
    border: 3px solid rgb(242, 242, 242);
    /*border-left:  3px solid rgb(242,242,242);*/
  }

  #div_center {
    width: 100%;
    height: 100%;
  }

  .demo1 {
    height: 20vh;
    width: 11vw;
    position: absolute;
    left: 0;
    bottom: -20px;
    z-index: 999;
    border: 3px solid rgb(242, 242, 242);
  }

  .axis text {
    font: 10px sans-serif;
  }

  .axis line,
  .axis circle {
    fill: none;
    stroke: steelblue;
    stroke-dasharray: 4;
  }

  .axis:last-of-type circle {
    stroke: steelblue;
    stroke-dasharray: none;
  }

  .line {
    fill: none;
    stroke: orange;
    stroke-width: 3px;
  }

  .tooltip {
    font-family: simsun;
    font-size: 16px;
    width: 120px;
    height: auto;
    position: absolute;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    background-color: white;
    border-radius: 5px;
  }

  h4 {
    font-family: 微软雅黑;
    background-color: rgb(242, 242, 242);
    padding: 3px 3px;
    border-bottom: 2px solid rgb(200, 200, 200);
    text-align: center;

  }


</style>
