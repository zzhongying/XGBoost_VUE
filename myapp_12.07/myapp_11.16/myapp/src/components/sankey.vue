<template>
  <div id="sankey_main">

    <div id="chart">
      <button id='add' @click='add'>add</button>
      <svg id="box"></svg>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  // import * as d3 from 'd4';
  import * as d3Sankey from "../../public/d3-sankey";
  import * as d3 from "d5";
  import Readcsv from "../ToolJs/Readcsv";
  import eventBus from "../utils/eventBus";

  import axios from "axios";
  export default {
    name: "sankey",
    data() {
      return {
        nodes: null,
        anti_links: null,
        positive_links: null,
        nodes1: null,
        typename:null
      };
    },
    created() {
      eventBus.$on('share_data',val =>{   //接收到数据后使用回调函数
        this.typename = val
        console.log(this.typename)
      })
    },
    methods: {
      add(){
        //向树比较那里发送数据
        this.$bus.$emit('add')
      },
      Sankey(res) {
        //绘制之前先清空，否则会重复绘制
        $("#box").empty()
        res.path.unshift({ source: "", target: 0, yes: 0, no: 0 });
        let data = res.path;
        let name = res.nodeid_split;
        console.log("sankey data", data);
        // console.log("sankey name", name);
        var entries = d3
          .stratify()
          .id(function (d) {
            return d.target;
          })
          .parentId(function (d) {
            return d.source;
          })(data);

        function bfs(obj) {
          for (let key in obj) {
            if (key == "children") {
              for (let i = 0, n = obj[key].length; i < n; i++) bfs(obj[key][i]);
            }

            if (key == "id") {
              obj.name = name[parseInt(obj[key])];
              //obj.name = obj[key]
              delete obj[key];
            } else if (key == "children") {
              continue;
            } else {
              if (obj.height == 1) {
                obj["children"] = [
                  { name: "Yes", Freq: obj.data.yes },
                  { name: "No", Freq: obj.data.no },
                ];
                delete obj["depth"];
                delete obj["parent"];
              } else {
                delete obj[key];
              }
            }
          }
        }
        function bfs3(obj) {
          for (let key in obj) {
            if (key == "children") {
              for (let i = 0, n = obj[key].length; i < n; i++) bfs3(obj[key][i]);
            }

            if (key == "id") {
              obj.name = name[parseInt(obj[key])];
              delete obj[key];
            } else if (key == "children") {
              continue;
            } else {
              if (obj.height == 1) {
                obj["children"] = [
                  { name: "Yes", Freq: obj.data.yes },
                  { name: "No", Freq: obj.data.no },
                ];
                delete obj["data"];
                delete obj["height"];
              }
            }
          }
        }
        bfs(entries);
        bfs3(entries);
        // console.log("entries", entries);
        let tm_h = d3.hierarchy(entries).sum(function (d) {
          return d.Freq || 0;
        });


        // console.log("tm-h->", tm_h);
        let width = $('#sankey_main').width();
        let height = $('#chart').height();
        let nodeHeightRatio = 0.5;
        let color = d3.scaleOrdinal(d3.schemeCategory10);
        color.range(
          [color.range()[2]]
            .concat([color.range()[3]])
            .concat(color.range().splice(0, 2))
            .concat(color.range().splice(4, 10))
        );
        color.domain(["Yes", "No"]);
        let svg = d3.select("#box")
          .attr("viewBox", "0,0," + width/1.2 + "," + height*1.2 );
        d3.select('.sankey_tooltip').remove()
        let tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "sankey_tooltip")
          .style("opacity", 0)
          .style("position",'absolute')
          .style('width','200px')
          .style('height','auto')
          .style('font-size','14px')
          .style('text-align','center')
          .style('background-color','rgb(214, 205, 205)')


        let nodes = initialize(tm_h);

        drawPartSankey(tm_h, nodes, nodeHeightRatio, 100, 0);

        function initialize(hier) {
          /*
        d3.partition(root)
        对指定的 root hierarchy 进行布局，root 节点以及每个后代节点会被附加以下属性:
          node.x0 - 矩形的左边缘
          node.y0 - 矩形的上边缘
          node.x1 - 矩形的右边缘
          node.y1 - 矩形的下边缘
        */
          d3.partition().size([height, width])(hier);

          // get all nodes that are not root
          //获取所有非根节点
          var nodes = svg.selectAll("g.node").data(
            hier.descendants().filter(function (d) {
              //返回非叶子节点
              return d.height > 0;
            })
          );

          nodes.exit().remove(); //删除多余的dom

          //将多个数组合并成一个,并返回新数组
          nodes = nodes.merge(nodes.enter()
            .append("g")
            .attr("class", function (d) {
              return d.data.name
            }));

          nodes.attr("transform", function (d) {
            //位移
            return "translate(" + d.y0 + "," + d.x0 + ")";
          });

          nodes.append("rect")
            .classed("rect-part", true)

          // nodes.append("text")
          //   .attr("transform",d =>{
          //     return "translate(" + d.y0 + "," + d.x0+10 + ")";
          //   })
          //   .text(function (d) {
          //     // console.log(d.data.name)
          //     return d.data.name
          //   })
          //   .style("text-align","left")
          //   .style("font-size", 20)

          // these are reference rectangles to see space allocated for each node
          //这些是参考矩形，用于查看为每个节点分配的空间
          // nodes.append('rect')
          //   .classed('rect-outline', true)
          //   .attr('width', function (d) { return d.y1 - d.y0; })
          //   .attr('height', function (d) { return d.x1 - d.x0; })
          //   .style('fill', 'none')
          //   .style('stroke', 'none');

          // nodes.append('text')
          //   //.style('text-anchor','end')
          //   .attr('dy', '0.5em')
          //   .text(function (d) { return d.data.name });

          return nodes;
        }

        function drawPartSankey(hier, nodes, nodeHeightRatio, duration, delay) {
          nodeHeightRatio = nodeHeightRatio ? nodeHeightRatio : 0.66;
          var nodeHeight = height * nodeHeightRatio;
          var nodeWidth = 10;

          // run treemap slice to get heights
          //  note, this will overwrite the x0,x1,y0,y1
          //运行树形图切片以获得高度
          //注意，这将覆盖x0、x1、y0、y1
          /*
        d3.treemap()
        对指定的 root hierarchy 进行布局，为 root 以及每个后代节点附加以下属性:
        node.x0 - 矩形的左边缘
        node.y0 - 矩形的上边缘
        node.x1 - 矩形的右边缘
        node.y1 - 矩形的下边缘
        */
          d3.treemap().size([nodeWidth, nodeHeight]).tile(d3.treemapSlice)(hier);
          //记录树的宽高，避免被后面覆盖
          hier.each(function (d) {
            d.h = d.y1 - d.y0;
            d.w = d.x1 - d.x0;
          });

          hier.each(function (d) {
            // console.log("d->", d)
            // for the non-leaves also sum
            //对于非叶子节点求和
            //  the categories at the leaf level
            //  in the case of Titanic data this will be survival
            if (d.height > 0) {
              var nest = d3
                .nest()
                .key((d) => {
                  // console.log(d)
                  return d.data.name;
                })
                .rollup((d) => {
                  return d3.sum(d.map((dd) => dd.h));
                });
              //console.log(nest.entries(d.leaves()))
              d.sub = nest
                .entries(d.leaves())
                .filter((d) => d.key !== "undefined");
              //console.log("d.sub",d.sub)
            }
          });
          // console.log(hier);
          // now run partition with no size
          //现在运行没有大小的分区,在[0,1]范围内
          //  so will be in range [0,1]
          d3.partition()(hier);

          nodes
            .selectAll("rect.rect-outline")
            .transition()
            .duration(duration) //指定每个过渡元素的过渡时间(毫秒).
            .delay(delay) //指定每个过渡元素的过渡时间(毫秒).
            .style("stroke", "gray")
            .style("fill", "none")
            .style("stroke-dasharray", "2,2");

          nodes
            .selectAll("rect.rect-part")
            .style("fill", function (d) {
              return '#a5bbbf';
            })
            .style("stroke", "white")
            .transition()
            .duration(duration)
            .delay(delay)
            .attr("y", function (d) {
              return ((d.x1 - d.x0) * height - d.h) / 2;
            })
            .attr("width", function (d) {
              return nodeWidth*2;
            })
            .attr("height", function (d) {
              return d.h;
            });

          nodes
            .selectAll("text")
            .attr("y", function (d) {
              if (d.height > 1) {
                return ((d.x1 - d.x0) * height - d.h) / 2;
              }
              return ((d.x1 - d.x0) * height) / 2;
            })
            .attr("x", function (d) {
              if (d.height > 1) {
                return nodeWidth / 2;
              }
              return nodeWidth;
            })
            .attr("dy", function (d) {
              if (d.height > 1) {
                return "-0.15em";
              }
              return "0.25em";
            })
            .style("text-anchor", function (d) {
              if (d.height > 1) {
                return "middle";
              }
              return "start";
            });

          function stack(x) {
            var xobj = {};
            var sum = d3.sum(x.children, function (d) {
              return d.h;
            });
            // console.log("x->", x, "sum=", sum)
            x.children.forEach(function (d) {
              try {
                d.sub.forEach(function (dd) {
                  xobj[d.data.name + "~" + dd.key] = dd.value / sum;
                });
              } catch {
                // console.log(d);
              }
            });
            return d3.stack().keys(Object.keys(xobj))([xobj]);
          }

          function stackLeaf(x) {
            var xobj = {};
            var sum = d3.sum(x.children, function (d) {
              return d.h;
            });
            x.sub.forEach(function (d) {
              xobj[d.key] = d.value / sum;
            });
            return d3.stack().keys(Object.keys(xobj))([xobj]);
          }

          nodes.each(function (node) {
            if (node.height <= 1) {
              return;
            }

            // empty array to store links on each node
            //空数组以在每个节点上存储链接
            node.linkPaths = node.linkPaths ? node.linkPaths : [];

            var st = stack(node);
            // console.log("st->", st)
            st.forEach(function (d, i) {
              var childname = d.key.split("~")[0];
              var leafname = d.key.split("~")[1];
              var child = node.children.filter(function (ch) {
                return ch.data.name === childname;
              })[0];

              //因为我们画的链接/路径在一个非标准d3进入，合并，退出方式
              //使用这个来决定我们是绘制新的还是更新旧的
              //我欢迎帮助转换到d3标准模式
              if (typeof node.linkPaths[i] === "undefined") {
                var link = svg
                  .append("path")
                  .classed("link", true)
                  .style("opacity", 0.000001);
              } else {
                var link = d3.select(node.linkPaths[i]);
              }

              //绘制路径，而不是使用具有笔划宽度的线条
              function customLine(pts) {
                var ld = d3
                  .linkHorizontal()
                  .source(function (d) {
                    return d[0];
                  })
                  .target(function (d) {
                    return d[1];
                  })
                  .x(function (d) {
                    return d[0];
                  })
                  .y(function (d) {
                    return d[1];
                  });
                return [
                  ld([pts[0], pts[1]]),
                  pts[1] + "," + pts[2],
                  ld([pts[2], pts[3]]).slice(1),
                ].join("L");
              }

              var st2 = stackLeaf(child).filter(function (d) {
                return d.key === leafname;
              })[0];

              link.datum({
                source: node,
                target: child,
                leaf: leafname,
              });

              link.attr(
                "d",
                customLine([
                  [
                    node.y0 * width + nodeWidth*2,
                    node.x0 * height +
                    ((node.x1 - node.x0) * height - node.h) / 2 +
                    d[0][0] * node.h,
                  ],
                  [
                    child.y0 * width,
                    child.x0 * height +
                    ((child.x1 - child.x0) * height - child.h) / 2 +
                    st2[0][0] * child.h,
                  ],
                  [
                    child.y0 * width,
                    child.x0 * height +
                    ((child.x1 - child.x0) * height - child.h) / 2 +
                    st2[0][1] * child.h,
                  ],
                  [
                    node.y0 * width + nodeWidth*2,
                    node.x0 * height +
                    ((node.x1 - node.x0) * height - node.h) / 2 +
                    d[0][1] * node.h,
                  ],
                  //[node.y0 * width + nodeWidth, ((node.x0 * height) + ((node.x1-node.x0)*height-node.h)/2 )]
                ])
              );

              link.style("stroke", "white")
                .style("fill", function(){
                  if( leafname == 'Yes'){
                    return '#cce8e2'
                  }
                  else {
                    return '#F9BCB2'
                  }

                  return color(leafname)
                });

              link
                .transition()
                .duration(500)
                .delay(duration + delay)
                .style("opacity", 0.5);

              node.linkPaths = node.linkPaths.concat(link.node());
            });
          });

          //将鼠标移到高亮不透明度较高的区域
          //这将突出显示所有具有相同叶子名的子节点
          svg.selectAll(".link").on("mouseover", function (d) {
            d3.select(this).style("opacity", 1);
            // console.log("d->", d)
            tooltip
              .html(
                `source:${d.source.data.name}<br/>
                    target:${d.target.data.name}<br/>
                    positive-link：${(
                  d.source.sub[0].value - d.target.sub[0].value
                ).toFixed(2)}<br/>
                    negative-link：${(
                  d.source.sub[1].value - d.target.sub[1].value
                ).toFixed(2)}`
              )
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY + 20 + "px")
              .style("opacity", 1.0);
            if (d.target.linkPaths) {
              d.target.linkPaths.forEach(function (lp) {
                var data = d3.select(lp).datum();
                if (data.leaf == d.leaf) {
                  d3.select(lp).style("opacity", 0.8);
                }
              });
            }
          });

          svg.selectAll(".link").on("mouseout", function (d) {
            svg.selectAll(".link").style("opacity", 0.5);
            tooltip.style("opacity", 0);
          });
        }
      },
      getPieId(id){
        console.log('snakey组件获取到id名',id)
        axios({
          url: "http://127.0.0.1:5000/get_data/sankey",
          method:'post',
          data:{
            id
          }
        }).then((res) => {
          this.Sankey(res.data);
        });
      },
      getType(name){
        // 获取混淆矩阵点击的类名
        console.log('snake获取到混淆矩阵点击的类名：',name);
        axios({
          url: "http://127.0.0.1:5000/get_data/sankey",
          method:'post',
          data:{
            name
          }
        }).then((res) => {
          this.Sankey(res.data);
        });
      }
    },
    watch: {
      control2: function () {

        //console.log("sankey中d3的版本：", d3.version);
        // d3.json("http://127.0.0.1:5000/get_data/sankey",function(res){
        //   console.log("sankey res")
        //   this.Sankey(res);
        // })
        axios({
          url: "http://127.0.0.1:5000/get_data/sankey",
        }).then((res) => {
          this.Sankey(res.data);
        });
      },
    },
    computed: {
      control2() {
        return this.$store.getters.get_control2;
      },
    },
    mounted(){
      this.$bus.$on('getPieId',this.getPieId)
      this.$bus.$on('getType',this.getType)
    },
    beforeDestroy() {
      this.$bus.$off('getPieId')
      this.$bus.$off('getType')
    },
  };
</script>

<style scoped>
  #add{
    /* display: inline-block; */
    float: left;

  }
  #sankey_main {
    height: 95%;
    width:90%;
    margin-left: 5%;
    background-color: #e4e4e4;
  }

  #chart {
    background: #fff;
    width: 100%;
    height: 90%;
    padding: 30px;
    font-size: 12px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    position: relative;
    margin: 0;
  }

  .node rect {
    fill-opacity: 0.9;
    shape-rendering: crispEdges;
    stroke-width: 0;
    cursor: move;
  }

  .node text {
    text-shadow: 0 1px 0 #fff;
  }

  .link {
    fill: none;
    stroke: #ddd;
    stroke-opacity: 0.5;
    cursor: pointer;
  }

  .link title {
    visibility: hidden;
  }

  .link:hover {
    stroke-opacity: 1;
  }

  .sankey_tooltip {
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
</style>
