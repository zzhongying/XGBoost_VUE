<template>
  <div id="sankey_main">

    <div id="chart">
      <button id='add'>add</button>
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
  import axios from "axios";
  export default {
    name: "sankey",
    data() {
      return {
        nodes: null,
        anti_links: null,
        positive_links: null,
        nodes1: null,
      };
    },
    methods: {
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
                    正link：${(
                  d.source.sub[0].value - d.target.sub[0].value
                ).toFixed(2)}<br/>
                    负link：${(
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
        let nodes = [
            {
              name: "getDisplayInfo",
              value: 3480,
              id: 0,
            },
            {
              name: "open",
              value: 2459,
              id: 1,
            },
            {
              name: "mprotect",
              value: 1021,
              id: 2,
            },
            {
              name: "writev",
              value: 62,
              id: 3,
            },
            {
              name: "gLastLocation",
              value: 2397,
              id: 4,
            },
            {
              name: "getDeviceId",
              value: 512,
              id: 5,
            },
            {
              name: "getDeviceId",
              value: 509,
              id: 6,
            },
            {
              name: "futex",
              value: 29,
              id: 7,
            },
            {
              name: "getpid",
              value: 33,
              id: 8,
            },
            {
              name: "read",
              value: 2376,
              id: 9,
            },
            {
              name: "mprotect",
              value: 21,
              id: 10,
            },
            {
              name: "writev",
              value: 130,
              id: 11,
            },
            {
              name: "TERMINATE_THREAD",
              value: 382,
              id: 12,
            },
            {
              name: "nanosleep",
              value: 503,
              id: 13,
            },
            {
              name: "leaf",
              value: 1,
              id: 14,
            },
            {
              name: "munmap",
              value: 26,
              id: 15,
            },
            {
              name: "gettimeofday",
              value: 3,
              id: 16,
            },
            {
              name: "leaf",
              value: 1,
              id: 17,
            },
            {
              name: "writev",
              value: 32,
              id: 18,
            },
            {
              name: "getDisplayInfo",
              value: 955,
              id: 19,
            },
            {
              name: "ftruncate",
              value: 1421,
              id: 20,
            },
            {
              name: "getDeviceId",
              value: 12,
              id: 21,
            },
            {
              name: "leaf",
              value: 1,
              id: 22,
            },
            {
              name: "munmap",
              value: 8,
              id: 23,
            },
            {
              name: "munmap",
              value: 122,
              id: 24,
            },
            {
              name: "CREATE_THREAD",
              value: 50,
              id: 25,
            },
            {
              name: "gIccSerialNumber",
              value: 332,
              id: 26,
            },
            {
              name: "lstat64",
              value: 81,
              id: 27,
            },
            {
              name: "pipe",
              value: 422,
              id: 28,
            },
            {
              name: "leaf",
              value: 1,
              id: 29,
            },
            {
              name: "leaf",
              value: 1,
              id: 30,
            },
            {
              name: "leaf",
              value: 1,
              id: 31,
            },
            {
              name: "leaf",
              value: 1,
              id: 32,
            },
            {
              name: "futex",
              value: 31,
              id: 33,
            },
            {
              name: "leaf",
              value: 1,
              id: 34,
            },
            {
              name: "mkdir",
              value: 902,
              id: 35,
            },
            {
              name: "getDeviceId",
              value: 53,
              id: 36,
            },
            {
              name: "gCnectiInfo",
              value: 1419,
              id: 37,
            },
            {
              name: "leaf",
              value: 1,
              id: 38,
            },
            {
              name: "leaf",
              value: 1,
              id: 39,
            },
            {
              name: "CREATE_THREAD",
              value: 10,
              id: 40,
            },
            {
              name: "DplayInChannel",
              value: 6,
              id: 41,
            },
            {
              name: "leaf",
              value: 1,
              id: 42,
            },
            {
              name: "leaf",
              value: 1,
              id: 43,
            },
            {
              name: "pwrite64",
              value: 119,
              id: 44,
            },
            {
              name: "leaf",
              value: 1,
              id: 45,
            },
            {
              name: "leaf",
              value: 1,
              id: 46,
            },
            {
              name: "unlink",
              value: 287,
              id: 47,
            },
            {
              name: "finishDrawing",
              value: 45,
              id: 48,
            },
            {
              name: "hasSysFeature",
              value: 64,
              id: 49,
            },
            {
              name: "wait4",
              value: 17,
              id: 50,
            },
            {
              name: "dup",
              value: 5,
              id: 51,
            },
            {
              name: "toggleSoftIn",
              value: 417,
              id: 52,
            },
            {
              name: "leaf",
              value: 1,
              id: 53,
            },
            {
              name: "leaf",
              value: 1,
              id: 54,
            },
            {
              name: "leaf",
              value: 1,
              id: 55,
            },
            {
              name: "leaf",
              value: 1,
              id: 56,
            },
            {
              name: "leaf",
              value: 1,
              id: 57,
            },
            {
              name: "leaf",
              value: 1,
              id: 58,
            },
            {
              name: "leaf",
              value: 1,
              id: 59,
            },
            {
              name: "leaf",
              value: 1,
              id: 60,
            },
            {
              name: "leaf",
              value: 1,
              id: 61,
            },
            {
              name: "leaf",
              value: 1,
              id: 62,
            },
            {
              name: "leaf",
              value: 1,
              id: 63,
            },
            {
              name: "leaf",
              value: 1,
              id: 64,
            },
            {
              name: "leaf",
              value: 1,
              id: 65,
            },
            {
              name: "leaf",
              value: 1,
              id: 66,
            },
            {
              name: "leaf",
              value: 1,
              id: 67,
            },
            {
              name: "leaf",
              value: 1,
              id: 68,
            },
            {
              name: "leaf",
              value: 1,
              id: 69,
            },
            {
              name: "leaf",
              value: 1,
              id: 70,
            },
            {
              name: "leaf",
              value: 1,
              id: 71,
            },
            {
              name: "leaf",
              value: 1,
              id: 72,
            },
            {
              name: "leaf",
              value: 1,
              id: 73,
            },
            {
              name: "leaf",
              value: 1,
              id: 74,
            },
            {
              name: "leaf",
              value: 1,
              id: 75,
            },
            {
              name: "leaf",
              value: 1,
              id: 76,
            },
            {
              name: "leaf",
              value: 1,
              id: 77,
            },
            {
              name: "leaf",
              value: 1,
              id: 78,
            },
          ],
          anti_links = [
            {
              source: 0,
              target: 1,
              value: 2380,
            },
            {
              source: 0,
              target: 2,
              value: 746,
            },
            {
              source: 1,
              target: 3,
              value: 39,
            },
            {
              source: 1,
              target: 4,
              value: 2341,
            },
            {
              source: 2,
              target: 5,
              value: 278,
            },
            {
              source: 2,
              target: 6,
              value: 468,
            },
            {
              source: 3,
              target: 7,
              value: 28,
            },
            {
              source: 3,
              target: 8,
              value: 11,
            },
            {
              source: 4,
              target: 9,
              value: 2328,
            },
            {
              source: 4,
              target: 10,
              value: 13,
            },
            {
              source: 5,
              target: 11,
              value: 128,
            },
            {
              source: 5,
              target: 12,
              value: 150,
            },
            {
              source: 6,
              target: 13,
              value: 468,
            },
            {
              source: 6,
              target: 14,
              value: 0.1,
            },
            {
              source: 7,
              target: 15,
              value: 26,
            },
            {
              source: 7,
              target: 16,
              value: 2,
            },
            {
              source: 8,
              target: 17,
              value: 1,
            },
            {
              source: 8,
              target: 18,
              value: 10,
            },
            {
              source: 9,
              target: 19,
              value: 918,
            },
            {
              source: 9,
              target: 20,
              value: 1410,
            },
            {
              source: 10,
              target: 21,
              value: 4,
            },
            {
              source: 10,
              target: 22,
              value: 9,
            },
            {
              source: 11,
              target: 23,
              value: 7,
            },
            {
              source: 11,
              target: 24,
              value: 121,
            },
            {
              source: 12,
              target: 25,
              value: 47,
            },
            {
              source: 12,
              target: 26,
              value: 103,
            },
            {
              source: 13,
              target: 27,
              value: 56,
            },
            {
              source: 13,
              target: 28,
              value: 412,
            },
            {
              source: 15,
              target: 29,
              value: 25,
            },
            {
              source: 15,
              target: 30,
              value: 1,
            },
            {
              source: 16,
              target: 31,
              value: 0.1,
            },
            {
              source: 16,
              target: 32,
              value: 2,
            },
            {
              source: 18,
              target: 33,
              value: 9,
            },
            {
              source: 18,
              target: 34,
              value: 1,
            },
            {
              source: 19,
              target: 35,
              value: 876,
            },
            {
              source: 19,
              target: 36,
              value: 42,
            },
            {
              source: 20,
              target: 37,
              value: 1409,
            },
            {
              source: 20,
              target: 38,
              value: 1,
            },
            {
              source: 21,
              target: 39,
              value: 2,
            },
            {
              source: 21,
              target: 40,
              value: 2,
            },
            {
              source: 23,
              target: 41,
              value: 6,
            },
            {
              source: 23,
              target: 42,
              value: 1,
            },
            {
              source: 24,
              target: 43,
              value: 3,
            },
            {
              source: 24,
              target: 44,
              value: 118,
            },
            {
              source: 25,
              target: 45,
              value: 0.1,
            },
            {
              source: 25,
              target: 46,
              value: 47,
            },
            {
              source: 26,
              target: 47,
              value: 62,
            },
            {
              source: 26,
              target: 48,
              value: 41,
            },
            {
              source: 27,
              target: 49,
              value: 50,
            },
            {
              source: 27,
              target: 50,
              value: 6,
            },
            {
              source: 28,
              target: 51,
              value: 4,
            },
            {
              source: 28,
              target: 52,
              value: 408,
            },
            {
              source: 33,
              target: 53,
              value: 8,
            },
            {
              source: 33,
              target: 54,
              value: 1,
            },
            {
              source: 35,
              target: 55,
              value: 34,
            },
            {
              source: 35,
              target: 56,
              value: 842,
            },
            {
              source: 36,
              target: 57,
              value: 28,
            },
            {
              source: 36,
              target: 58,
              value: 14,
            },
            {
              source: 37,
              target: 59,
              value: 1365,
            },
            {
              source: 37,
              target: 60,
              value: 44,
            },
            {
              source: 40,
              target: 61,
              value: 1,
            },
            {
              source: 40,
              target: 62,
              value: 1,
            },
            {
              source: 41,
              target: 63,
              value: 4,
            },
            {
              source: 41,
              target: 64,
              value: 2,
            },
            {
              source: 44,
              target: 65,
              value: 115,
            },
            {
              source: 44,
              target: 66,
              value: 3,
            },
            {
              source: 47,
              target: 67,
              value: 48,
            },
            {
              source: 47,
              target: 68,
              value: 14,
            },
            {
              source: 48,
              target: 69,
              value: 41,
            },
            {
              source: 48,
              target: 70,
              value: 0.1,
            },
            {
              source: 49,
              target: 71,
              value: 23,
            },
            {
              source: 49,
              target: 72,
              value: 27,
            },
            {
              source: 50,
              target: 73,
              value: 4,
            },
            {
              source: 50,
              target: 74,
              value: 2,
            },
            {
              source: 51,
              target: 75,
              value: 3,
            },
            {
              source: 51,
              target: 76,
              value: 1,
            },
            {
              source: 52,
              target: 77,
              value: 408,
            },
            {
              source: 52,
              target: 78,
              value: 0.1,
            },
          ],
          positive_links = [
            {
              source: 0,
              target: 1,
              value: 79,
            },
            {
              source: 0,
              target: 2,
              value: 275,
            },
            {
              source: 1,
              target: 3,
              value: 23,
            },
            {
              source: 1,
              target: 4,
              value: 56,
            },
            {
              source: 2,
              target: 5,
              value: 234,
            },
            {
              source: 2,
              target: 6,
              value: 41,
            },
            {
              source: 3,
              target: 7,
              value: 1,
            },
            {
              source: 3,
              target: 8,
              value: 22,
            },
            {
              source: 4,
              target: 9,
              value: 48,
            },
            {
              source: 4,
              target: 10,
              value: 8,
            },
            {
              source: 5,
              target: 11,
              value: 2,
            },
            {
              source: 5,
              target: 12,
              value: 232,
            },
            {
              source: 6,
              target: 13,
              value: 35,
            },
            {
              source: 6,
              target: 14,
              value: 6,
            },
            {
              source: 7,
              target: 15,
              value: 0.1,
            },
            {
              source: 7,
              target: 16,
              value: 1,
            },
            {
              source: 8,
              target: 17,
              value: 0.1,
            },
            {
              source: 8,
              target: 18,
              value: 22,
            },
            {
              source: 9,
              target: 19,
              value: 37,
            },
            {
              source: 9,
              target: 20,
              value: 11,
            },
            {
              source: 10,
              target: 21,
              value: 8,
            },
            {
              source: 10,
              target: 22,
              value: 0.1,
            },
            {
              source: 11,
              target: 23,
              value: 1,
            },
            {
              source: 11,
              target: 24,
              value: 1,
            },
            {
              source: 12,
              target: 25,
              value: 3,
            },
            {
              source: 12,
              target: 26,
              value: 229,
            },
            {
              source: 13,
              target: 27,
              value: 25,
            },
            {
              source: 13,
              target: 28,
              value: 10,
            },
            {
              source: 15,
              target: 29,
              value: 0.1,
            },
            {
              source: 15,
              target: 30,
              value: 0.1,
            },
            {
              source: 16,
              target: 31,
              value: 0.1,
            },
            {
              source: 16,
              target: 32,
              value: 1,
            },
            {
              source: 18,
              target: 33,
              value: 22,
            },
            {
              source: 18,
              target: 34,
              value: 0.1,
            },
            {
              source: 19,
              target: 35,
              value: 26,
            },
            {
              source: 19,
              target: 36,
              value: 11,
            },
            {
              source: 20,
              target: 37,
              value: 10,
            },
            {
              source: 20,
              target: 38,
              value: 1,
            },
            {
              source: 21,
              target: 39,
              value: 0.1,
            },
            {
              source: 21,
              target: 40,
              value: 8,
            },
            {
              source: 23,
              target: 41,
              value: 0.1,
            },
            {
              source: 23,
              target: 42,
              value: 1,
            },
            {
              source: 24,
              target: 43,
              value: 0.1,
            },
            {
              source: 24,
              target: 44,
              value: 1,
            },
            {
              source: 25,
              target: 45,
              value: 3,
            },
            {
              source: 25,
              target: 46,
              value: 0.1,
            },
            {
              source: 26,
              target: 47,
              value: 225,
            },
            {
              source: 26,
              target: 48,
              value: 4,
            },
            {
              source: 27,
              target: 49,
              value: 14,
            },
            {
              source: 27,
              target: 50,
              value: 11,
            },
            {
              source: 28,
              target: 51,
              value: 1,
            },
            {
              source: 28,
              target: 52,
              value: 9,
            },
            {
              source: 33,
              target: 53,
              value: 13,
            },
            {
              source: 33,
              target: 54,
              value: 9,
            },
            {
              source: 35,
              target: 55,
              value: 7,
            },
            {
              source: 35,
              target: 56,
              value: 19,
            },
            {
              source: 36,
              target: 57,
              value: 1,
            },
            {
              source: 36,
              target: 58,
              value: 10,
            },
            {
              source: 37,
              target: 59,
              value: 5,
            },
            {
              source: 37,
              target: 60,
              value: 5,
            },
            {
              source: 40,
              target: 61,
              value: 7,
            },
            {
              source: 40,
              target: 62,
              value: 1,
            },
            {
              source: 41,
              target: 63,
              value: 0.1,
            },
            {
              source: 41,
              target: 64,
              value: 0.1,
            },
            {
              source: 44,
              target: 65,
              value: 1,
            },
            {
              source: 44,
              target: 66,
              value: 0.1,
            },
            {
              source: 47,
              target: 67,
              value: 220,
            },
            {
              source: 47,
              target: 68,
              value: 5,
            },
            {
              source: 48,
              target: 69,
              value: 2,
            },
            {
              source: 48,
              target: 70,
              value: 2,
            },
            {
              source: 49,
              target: 71,
              value: 11,
            },
            {
              source: 49,
              target: 72,
              value: 3,
            },
            {
              source: 50,
              target: 73,
              value: 11,
            },
            {
              source: 50,
              target: 74,
              value: 0.1,
            },
            {
              source: 51,
              target: 75,
              value: 0.1,
            },
            {
              source: 51,
              target: 76,
              value: 1,
            },
            {
              source: 52,
              target: 77,
              value: 9,
            },
            {
              source: 52,
              target: 78,
              value: 0.1,
            },
          ];
        let nodes1 = [
          {
            name: "getDisplayInfo",
            value: 3480,
            id: 0,
          },
          {
            name: "open",
            value: 2459,
            id: 1,
          },
          {
            name: "mprotect",
            value: 1021,
            id: 2,
          },
          {
            name: "writev",
            value: 62,
            id: 3,
          },
          {
            name: "gLastLocation",
            value: 2397,
            id: 4,
          },
          {
            name: "getDeviceId",
            value: 512,
            id: 5,
          },
          {
            name: "getDeviceId",
            value: 509,
            id: 6,
          },
          {
            name: "futex",
            value: 29,
            id: 7,
          },
          {
            name: "getpid",
            value: 33,
            id: 8,
          },
          {
            name: "read",
            value: 2376,
            id: 9,
          },
          {
            name: "mprotect",
            value: 21,
            id: 10,
          },
          {
            name: "writev",
            value: 130,
            id: 11,
          },
          {
            name: "TERMINATE_THREAD",
            value: 382,
            id: 12,
          },
          {
            name: "nanosleep",
            value: 503,
            id: 13,
          },
          {
            name: "leaf",
            value: 1,
            id: 14,
          },
          {
            name: "munmap",
            value: 26,
            id: 15,
          },
          {
            name: "gettimeofday",
            value: 3,
            id: 16,
          },
          {
            name: "leaf",
            value: 1,
            id: 17,
          },
          {
            name: "writev",
            value: 32,
            id: 18,
          },
          {
            name: "getDisplayInfo",
            value: 955,
            id: 19,
          },
          {
            name: "ftruncate",
            value: 1421,
            id: 20,
          },
          {
            name: "getDeviceId",
            value: 12,
            id: 21,
          },
          {
            name: "leaf",
            value: 1,
            id: 22,
          },
          {
            name: "munmap",
            value: 8,
            id: 23,
          },
          {
            name: "munmap",
            value: 122,
            id: 24,
          },
          {
            name: "CREATE_THREAD",
            value: 50,
            id: 25,
          },
          {
            name: "gIccSerialNumber",
            value: 332,
            id: 26,
          },
          {
            name: "lstat64",
            value: 81,
            id: 27,
          },
          {
            name: "pipe",
            value: 422,
            id: 28,
          },
          {
            name: "leaf",
            value: 1,
            id: 29,
          },
          {
            name: "leaf",
            value: 1,
            id: 30,
          },
          {
            name: "leaf",
            value: 1,
            id: 31,
          },
          {
            name: "leaf",
            value: 1,
            id: 32,
          },
          {
            name: "futex",
            value: 31,
            id: 33,
          },
          {
            name: "leaf",
            value: 1,
            id: 34,
          },
          {
            name: "mkdir",
            value: 902,
            id: 35,
          },
          {
            name: "getDeviceId",
            value: 53,
            id: 36,
          },
          {
            name: "gCnectiInfo",
            value: 1419,
            id: 37,
          },
          {
            name: "leaf",
            value: 1,
            id: 38,
          },
          {
            name: "leaf",
            value: 1,
            id: 39,
          },
          {
            name: "CREATE_THREAD",
            value: 10,
            id: 40,
          },
          {
            name: "DplayInChannel",
            value: 6,
            id: 41,
          },
          {
            name: "leaf",
            value: 1,
            id: 42,
          },
          {
            name: "leaf",
            value: 1,
            id: 43,
          },
          {
            name: "pwrite64",
            value: 119,
            id: 44,
          },
          {
            name: "leaf",
            value: 1,
            id: 45,
          },
          {
            name: "leaf",
            value: 1,
            id: 46,
          },
          {
            name: "unlink",
            value: 287,
            id: 47,
          },
          {
            name: "finishDrawing",
            value: 45,
            id: 48,
          },
          {
            name: "hasSysFeature",
            value: 64,
            id: 49,
          },
          {
            name: "wait4",
            value: 17,
            id: 50,
          },
          {
            name: "dup",
            value: 5,
            id: 51,
          },
          {
            name: "toggleSoftIn",
            value: 417,
            id: 52,
          },
          {
            name: "leaf",
            value: 1,
            id: 53,
          },
          {
            name: "leaf",
            value: 1,
            id: 54,
          },
          {
            name: "leaf",
            value: 1,
            id: 55,
          },
          {
            name: "leaf",
            value: 1,
            id: 56,
          },
          {
            name: "leaf",
            value: 1,
            id: 57,
          },
          {
            name: "leaf",
            value: 1,
            id: 58,
          },
          {
            name: "leaf",
            value: 1,
            id: 59,
          },
          {
            name: "leaf",
            value: 1,
            id: 60,
          },
          {
            name: "leaf",
            value: 1,
            id: 61,
          },
          {
            name: "leaf",
            value: 1,
            id: 62,
          },
          {
            name: "leaf",
            value: 1,
            id: 63,
          },
          {
            name: "leaf",
            value: 1,
            id: 64,
          },
          {
            name: "leaf",
            value: 1,
            id: 65,
          },
          {
            name: "leaf",
            value: 1,
            id: 66,
          },
          {
            name: "leaf",
            value: 1,
            id: 67,
          },
          {
            name: "leaf",
            value: 1,
            id: 68,
          },
          {
            name: "leaf",
            value: 1,
            id: 69,
          },
          {
            name: "leaf",
            value: 1,
            id: 70,
          },
          {
            name: "leaf",
            value: 1,
            id: 71,
          },
          {
            name: "leaf",
            value: 1,
            id: 72,
          },
          {
            name: "leaf",
            value: 1,
            id: 73,
          },
          {
            name: "leaf",
            value: 1,
            id: 74,
          },
          {
            name: "leaf",
            value: 1,
            id: 75,
          },
          {
            name: "leaf",
            value: 1,
            id: 76,
          },
          {
            name: "leaf",
            value: 1,
            id: 77,
          },
          {
            name: "leaf",
            value: 1,
            id: 78,
          },
        ];

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
