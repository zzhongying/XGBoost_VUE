<template>
  <div id="right-panel-proj">
    <h4>FEATURE ANALYSIS</h4>
    <div id="proj-table"></div>
  </div>
</template>

<script>
  import * as d3 from "d5";
  import $ from "jquery";
  import axios from "axios";
  // 目前有一个bug:因为下面的矩形（特征数量）和中间的矩形类名相同，导致连线有问题
  export default {
    name: "div_center",
    methods: {},
    mounted() {
      // console.log("mounted调用咯")
      // console.log(this)
      axios({ url: "http://127.0.0.1:5000/get_data/centerData" })
        .then((res) => {
          let data = res.data;
          console.log("中间图的数据",data)
          // let width = 1200;
          // let height = 700;

          // 获取下面矩形数据
          let Feature_histogram_data=[]
          let tem=[]
          data.forEach(e => {
            e.data.forEach(d=>{
              if(!tem.includes(d.feature)){
                Feature_histogram_data.push({'feature':d.feature,'num':1})
                tem.push(d.feature)
              }
              else{
                Feature_histogram_data.forEach(r=>{
                  if(r.feature===d.feature){
                    r.num+=1;
                  }
                })
              }
            })
          });
          Feature_histogram_data.sort((a,b)=>b.num-a.num)
          tem=null
          // console.log("Feature_histogram_data",Feature_histogram_data)
          let width = parseFloat($('#proj-table').width())
          let height = parseFloat($('#proj-table').height())
          let svg = d3
            .select("#proj-table")
            .append("svg")
            .attr("width", width + "px")
            .attr("height", height + "px")

          // 提示框
          let tooltip = d3
            .select("#proj-table")
            .append("div")
            .attr("id", "proj-table_tooltip")
            .style("position",'absolute')
            .style("opacity", 0)
            .style("width",200+'px')
            .style('height','auto')
            .style('font-size',14+'px')
            .style('border',`${1}px solid rgb(214, 205, 205)`)
            .style('background-color','rgb(214, 205, 205)')
          // 特征柱状图
          let Feature_histogram=svg
            .append("g")
            .attr("id", "Feature_histogram")
            .attr("transform", `translate(${165},${height-15})`);
          Feature_histogram.selectAll('rect')
            .data(Feature_histogram_data)
            .enter()
            .append('rect')
            .attr("x",(d,i)=>{
              // console.log('d->',d,' i->',i)
              return 20*i
            })
            .attr('y',(d,i)=>-d.num*5)
            .attr('width',20)
            .attr('height',(d)=>d.num*5)
            .attr('fill',"#cbdcdf")
            .attr('stroke',"black")
            .attr("stroke-opacity",0.5)
            .attr('class',d=>d.feature.split("(").join("_").split(")").join("_"))
            .on("mouseenter",d=>{
              d3.selectAll(`.${d.feature.split("(").join("_").split(")").join("_")}`)
                .attr('fill',"pink")
              tooltip.html(()=>{
                return `特征名：${d.feature}</br>
                        出现次数：${d.num}`
              })
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + 20 + "px")
                .style("opacity", 1);
              d3.selectAll(`.path_${d.feature.split("(").join("_").split(")").join("_")}`)
                .attr("stroke", "pink")
                .attr('stroke-width',2)
                .style('opacity','1')
              // d3.selectAll(`.${d.feature.split("(").join("_").split(")").join("_")}`)
              //   .attr('fill','pink')
            })
            .on('mouseleave',d=>{
              d3.selectAll(`.${d.feature.split("(").join("_").split(")").join("_")}`)
                .attr('fill',"#cbdcdf")
              tooltip.style("opacity", 0);
              d3.selectAll(`.path_${d.feature.split("(").join("_").split(")").join("_")}`)
                .style('opacity','0')
              // d3.selectAll(`.${d.feature.split("(").join("_").split(")").join("_")}`)
              //   .attr('fill','#cbdcdf')
            })
          //#region
          //   let Feature_histogram_X= d3
          //     .scaleLinear()
          //     .domain([0, Feature_histogram_data.length])
          //     .rangeRound([
          //       10,
          //       width-60,
          //     ]);

          //   //定义一个坐标轴
          // var xAxis = d3.axisBottom(Feature_histogram_X)//定义一个axis，朝上的
          // 	.ticks(7);//设置刻度数目
          // Feature_histogram.append("g")
          // 	.call(xAxis);
          //#endregion

          let Y = d3
            .scaleBand()
            .domain(data.map((d) => d.Class))
            .rangeRound([60, height]);

          let x_axis = d3 //直线生成器
            .line()
            .x((d) => d[0])
            .y((d) => d[1])
            .curve(d3.curveCatmullRom.alpha(1));

          let linearGradient=svg.append('defs')   //渐变色
            .append('linearGradient')
            .attr("x1","0%")
            .attr("y1","0%")
            .attr("x2","100%")
            .attr("y2","0%")
            .attr('id',"line_color")
            .attr("gradientUnits","userSpaceOnUse")
          linearGradient.append("stop")
            .attr("offset", "0%")
            .style("stop-color", 'rgb(67,138,224)');
          linearGradient.append("stop")
            .attr("offset", "100%")
            .style("stop-color", 'rgb(214,219,104)');

          let linearGradient1=svg.append('defs')   //渐变色
            .append('linearGradient')
            .attr("x1","0%")
            .attr("y1","0%")
            .attr("x2","10%")
            .attr("y2","0%")
            .attr('id',"legend_color")
            .attr("gradientUnits","userSpaceOnUse")
          linearGradient1.append("stop")
            .attr("offset", "0%")
            .style("stop-color", 'rgb(67,138,224)');
          linearGradient1.append("stop")
            .attr("offset", "100%")
            .style("stop-color", 'rgb(214,219,104)');

          let legend=svg
            .append("g")
            .attr("id", "legend")
            .attr("transform", "translate(" + 10 + "," + 10 + ")");
          legend.append('path')
            .attr('d',x_axis([[10,10],[100,10]]))
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("stroke", `url(#${linearGradient1.attr("id")})`)
          legend.append('text')
            .attr('x',10)
            .attr('y',20)
            .text('high')
            .attr('font-size',8)
          legend.append('text')
            .attr('x',90)
            .attr('y',20)
            .text('low')
            .attr('font-size',8)

          let text = svg
            .append("g")
            .attr("id", "text")
            .attr("transform", "translate(" + 10 + "," + 10 + ")");

          text
            .selectAll("text")
            .data(data.map((d) => d.Class))
            .enter()
            .append("text")
            .attr("x", 160)
            .attr("y", (d) => Y(d))
            .text((d) => d)
            .attr("text-anchor", "end");

          // console.log(text.node().children[0].getBBox())



          let axisPoints=[]
          for(let name of data.map((d) => d.Class)){
            axisPoints.push([
              [text.node().getBBox().width + 1,Y(name) - 5],
              [width - 10,Y(name) - 5]
            ])
          }

          let line = svg
            .append("g")
            .attr("transform", "translate(" + 10 + "," + 10 + ")");
          line.selectAll('.axis_path')
            .data(axisPoints)
            .enter()
            .append("path")
            .attr('d',(d)=>{
              // console.log("axis->",x_axis(d))
              return x_axis(d)
            })
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("stroke", `url(#${linearGradient.attr("id")})`)

          let X = d3
            .scaleLinear()
            .domain([0, 14])
            .rangeRound([
              line.node().getBBox().x + 10,
              line.node().getBBox().width-60,
            ]);

          let rects = svg
            .append("g")
            .attr("transform", "translate(" + 10 + "," + 10 + ")");

          const pack = (dataset) =>
            d3.pack().size([20, 20]).padding(3)(
              d3
                .hierarchy(dataset)
                .sum((d) => d.value)
                .sort((a, b) => b.value - a.value)
            );

          let features = [];
          for (let i = 0, n = data.length; i < n; i++) {
            let use_data = data[i].data.map(d => {
              let h=d.Max-d.Min
              if(h<10){
                d['h']=h*4
              }
              if(h>100){
                // console.log("Math.log(h)",Math.log(h),' h=',h)
                d['h']=Math.log(h)*4
              }
              if(h>=10&&h<=100){
                d['h']=h
              }
              return d
            });
            // console.log("use_data",use_data)
            // .filter((d) => d.Max - d.Min > 10 && d.Max - d.Min < 40)
            // .slice(0, 15);
            for (let item of use_data) {
              item.feature = item.feature
                .split("(")
                .join("_")
                .split(")")
                .join("_");
              if (features.indexOf(item.feature) == -1)
                features.push(item.feature);
            }

            //设置前15个重要特征的矩形
            rects
              .selectAll(`.rect_${data[i].Class}`)
              .data(use_data)
              .enter()
              .append("rect")
              .attr("y", (d) => {
                return Y(data[i].Class) - 5 - (d.h) * 0.5;
              })
              .attr("x", (d, ind) => {
                return X(ind);
              })
              .attr("height", (d) => d.h)
              .attr("width", 40)
              .attr("fill", "#cbdcdf")
              .attr("class", (d) =>{
                return `${d.feature.split("(").join("_").split(")").join("_")} rect_${d.feature.split("(").join("_").split(")").join("_")}`
              })
              .classed(`rect_${data[i].Class}`, true)
              .on('mouseenter',d=>{
                // console.log('mouseenter=>',d)
                var x = event.offsetX;
                var y = event.offsetY;
                tooltip
                  .html(()=>{
                    let res=`特征重要性：${d.featureImportance}`
                    return res
                  })
                  .style("left", d3.event.pageX + "px")
                  .style("top", d3.event.pageY + 20 + "px")
                  .style("opacity", 1);

                d3.selectAll(`.${d.feature.split("(").join("_").split(")").join("_")}`)
                  .attr('fill','pink')
                d3.selectAll(`.path_${d.feature.split("(").join("_").split(")").join("_")}`)
                  .attr("stroke", "pink")
                  .attr('stroke-width',2)
                  .style('opacity','1')
                // d3.selectAll(`.center_path:not(.path_${d.feature.split("(").join("_").split(")").join("_")})`)
                //   .style('opacity','0')
              })
              .on('mouseleave',(d)=>{
                tooltip.style("opacity", 0);
                d3.selectAll(`.${d.feature.split("(").join("_").split(")").join("_")}`)
                  .attr('fill',"#cbdcdf")

                d3.selectAll(`.center_path`)
                  .attr("stroke", "#cbdcdf")
                  .attr('stroke-width',1)
                  .style('opacity','0')
              })
            // console.log("data[i]",data[i])
            let text = rects
              .selectAll(`.text_${data[i].Class}`)
              .data(use_data)
              .enter()
              .append("text")
              .attr("x", (d, ind) => {
                return X(ind);
              })
              .attr("y", (d) => {
                return Y(data[i].Class) + 20;
              });
            text
              .selectAll("tspan")
              .data((d, ind) => {
                d = d.feature.split("_").sort();
                while (d[0].length == 0) {
                  d.shift();
                }
                d = d.join("");
                let tem = [];
                while (d.length) {
                  //字符串切片，换行
                  tem.push(d.slice(0, 8));
                  d = d.slice(8, d.length);
                }
                return tem.map((dd) => (ind >= 10 ? 2 + dd + ind : 1 + dd + ind));
              })
              .enter()
              .append("tspan")
              .text((d) => {
                return d.slice(1, d.length - d.slice(0, 1));
              })
              .attr("font-size", 11)
              .attr("x", (d) => {
                return X(
                  parseInt(d.slice(d.length - parseInt(d.slice(0, 1)), d.length))
                );
              })
              .attr("dy", "1em");

            //设置融合特征的矩形
            for (let j = 0, k = data[i].fusion_features.length; j < k; j++) {
              rects
                .append("rect")
                .attr("y", (d) => {
                  return Y(data[i].Class) - 25;
                })
                .attr("x", X(15 + j))
                .attr("height", 40)
                .attr("width", 40)
                .attr("fill", "#cbdcdf")
                .attr("class", data[i].Class + data[i].fusion_features[j].name);

              rects
                .append("text")
                // .text(data[i].fusion_features[j].name.slice(11, 15))
                .attr("font-size", 10)
                .attr("x", X(15 + j))
                .attr("y", (d) => {
                  return Y(data[i].Class) + 25;
                })
                .selectAll("tspan")
                .data(data[i].fusion_features[j].name.split("_"))
                .enter()
                .append("tspan")
                .attr("x", X(15 + j))
                .attr("dy", "1em")
                .text((d) => d);

              let svgrect = d3
                .selectAll(`.${data[i].Class + data[i].fusion_features[j].name}`)
                .node()
                .getBBox();

              let nodes = pack(data[i].fusion_features[j]);
              rects
                .append("g")
                .attr("transform", `translate(${svgrect.x},${svgrect.y})`)
                .selectAll("circle")
                .data(nodes.descendants().slice(1))
                .enter()
                .append("circle")
                .attr("fill", "rgb(31, 119, 180)")
                .attr("fill-opacity", "0.4")
                .attr("cx", function (d) {
                  return d.x;
                })
                .attr("cy", function (d) {
                  return d.y;
                })
                .attr("r", function (d) {
                  return d.r;
                });
            }
          }
          // 矩形之间的连线
          let curve = d3
            .line()
            .x((d) => d.x)
            .y((d) => d.y)
            // .curve(d3.curveMonotoneX)
            .curve(d3.curveCatmullRom.alpha(1)); //让line变得圆滑
          let curve_line = svg
            .append("g")
            .attr("transform", "translate(" + 10 + "," + 10 + ")");
          for (let item of features) {
            let rects = d3.selectAll(`.rect_${item}`)._groups[0];
            // console.log('rects->',rects)
            if (rects.length > 1) {
              let points = [];
              for (let rect of rects) {
                // console.log("怎么获取名字",d3.select(rect).attr('class').split(" "))
                let svgrect = rect.getBBox();
                points.push({
                  name:d3.select(rect).attr('class').split(" ")[1],
                  x: svgrect.x + svgrect.width * 0.5,
                  y: svgrect.y + svgrect.height * 0.5,
                });
              }
              // console.log(points)
              curve_line
                .append("path")
                .data(points)
                .attr("d", curve(points))
                .attr("stroke", "#cbdcdf")
                .attr("fill", "none")
                .attr('class',(d)=>{
                  // console.log("类名",d.name)
                  return `path_${d.name.split('_')[1]}`
                })
                .classed("center_path",'true')
                .style('opacity','0')
              // .on('mouseenter',(d)=>{
              //   d3.selectAll(`.${d.name}`)
              //     .attr('fill','pink')
              //   d3.selectAll(`.path_${d.name}`)
              //     .attr("stroke", "pink")
              //     .attr('stroke-width',2)
              //   d3.selectAll(`.center_path:not(.path_${d.name})`)
              //     .style('opacity','0')
              // })
              // .on('mouseleave',(d)=>{
              //   d3.selectAll(`.${d.name}`)
              //     .attr('fill','#cbdcdf')

              //   d3.selectAll(`.center_path`)
              //     .style('opacity','1')
              //     .attr("stroke", "#cbdcdf")
              //     .attr('stroke-width',1)
              // })
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //#region
      // d3.json("./Data/feature_values.json").then(
      //   (data) => {
      //     let width = 1200;
      //     let height = 700;
      //     let Y = d3
      //       .scaleBand()
      //       .domain(data.map((d) => d.Class))
      //       .rangeRound([60, height]);

      //     let svg = d3
      //       .select("#proj-table")
      //       .append("svg")
      //       .attr("width", width + "px")
      //       .attr("height", height + "px");

      //     let text = svg
      //       .append("g")
      //       .attr("id", "text")
      //       .attr("transform", "translate(" + 10 + "," + 10 + ")");

      //     text
      //       .selectAll("text")
      //       .data(data.map((d) => d.Class))
      //       .enter()
      //       .append("text")
      //       .attr("x", 160)
      //       .attr("y", (d) => Y(d))
      //       .text((d) => d)
      //       .attr("text-anchor", "end");

      //     // console.log(text.node().children[0].getBBox())

      //     let line = svg
      //       .append("g")
      //       .attr("transform", "translate(" + 10 + "," + 10 + ")");

      //     line
      //       .selectAll("line")
      //       .data(data.map((d) => d.Class))
      //       .enter()
      //       .append("line")
      //       .attr("x1", (d, ind) => text.node().getBBox().width + 1)
      //       .attr("y1", (d) => Y(d) - 5)
      //       .attr("x2", width - 10)
      //       .attr("y2", (d) => Y(d) - 5)
      //       .attr("stroke", "#afc0c2");

      //     let X = d3
      //       .scaleLinear()
      //       .domain([0, 14])
      //       .rangeRound([
      //         line.node().getBBox().x + 10,
      //         line.node().getBBox().width,
      //       ]);

      //     let rects = svg
      //       .append("g")
      //       .attr("transform", "translate(" + 10 + "," + 10 + ")");

      //     const pack = (dataset) =>
      //       d3.pack().size([20, 20]).padding(3)(
      //         d3
      //           .hierarchy(dataset)
      //           .sum((d) => d.value)
      //           .sort((a, b) => b.value - a.value)
      //       );

      //     let features = [];
      //     for (let i = 0, n = data.length; i < n; i++) {
      //       let use_data = data[i].data
      //         .filter((d) => d.Max - d.Min > 10 && d.Max - d.Min < 40)
      //         .slice(0, 15);
      //       for (let item of use_data) {
      //         item.feature = item.feature
      //           .split("(")
      //           .join("_")
      //           .split(")")
      //           .join("_");
      //         if (features.indexOf(item.feature) == -1)
      //           features.push(item.feature);
      //       }

      //       //设置前15个重要特征的矩形
      //       rects
      //         .selectAll(`.rect_${data[i].Class}`)
      //         .data(use_data)
      //         .enter()
      //         .append("rect")
      //         .attr("y", (d) => {
      //           return Y(data[i].Class) - 5 - (d.Max - d.Min) * 0.5;
      //         })
      //         .attr("x", (d, ind) => {
      //           return X(ind);
      //         })
      //         .attr("height", (d) => d.Max - d.Min)
      //         .attr("width", 40)
      //         .attr("fill", "#cbdcdf")
      //         .attr("class", (d) =>
      //           d.feature.split("(").join("_").split(")").join("_")
      //         )
      //         .classed(`rect_${data[i].Class}`, true);

      //       let text = rects
      //         .selectAll(`.text_${data[i].Class}`)
      //         .data(use_data)
      //         .enter()
      //         .append("text")
      //         .attr("x", (d, ind) => {
      //           return X(ind);
      //         })
      //         .attr("y", (d) => {
      //           return Y(data[i].Class) + 20;
      //         });
      //       text
      //         .selectAll("tspan")
      //         .data((d, ind) => {
      //           d = d.feature.split("_").sort();
      //           while (d[0].length == 0) {
      //             d.shift();
      //           }
      //           d = d.join("");
      //           let tem = [];
      //           while (d.length) {
      //             //字符串切片，换行
      //             tem.push(d.slice(0, 8));
      //             d = d.slice(8, d.length);
      //           }
      //           return tem.map((dd) => (ind >= 10 ? 2 + dd + ind : 1 + dd + ind));
      //         })
      //         .enter()
      //         .append("tspan")
      //         .text((d) => {
      //           return d.slice(1, d.length - d.slice(0, 1));
      //         })
      //         .attr("font-size", 11)
      //         .attr("x", (d) => {
      //           return X(
      //             parseInt(d.slice(d.length - parseInt(d.slice(0, 1)), d.length))
      //           );
      //         })
      //         .attr("dy", "1em");

      //       //设置融合特征的矩形
      //       for (let j = 0, k = data[i].fusion_features.length; j < k; j++) {
      //         rects
      //           .append("rect")
      //           .attr("y", (d) => {
      //             return Y(data[i].Class) - 25;
      //           })
      //           .attr("x", X(15 + j))
      //           .attr("height", 40)
      //           .attr("width", 40)
      //           .attr("fill", "#cbdcdf")
      //           .attr("class", data[i].Class + data[i].fusion_features[j].name);

      //         rects
      //           .append("text")
      //           // .text(data[i].fusion_features[j].name.slice(11, 15))
      //           .attr("font-size", 10)
      //           .attr("x", X(15 + j))
      //           .attr("y", (d) => {
      //             return Y(data[i].Class) + 25;
      //           })
      //           .selectAll("tspan")
      //           .data(data[i].fusion_features[j].name.split("_"))
      //           .enter()
      //           .append("tspan")
      //           .attr("x", X(15 + j))
      //           .attr("dy", "1em")
      //           .text((d) => d);

      //         let svgrect = d3
      //           .selectAll(`.${data[i].Class + data[i].fusion_features[j].name}`)
      //           .node()
      //           .getBBox();

      //         let nodes = pack(data[i].fusion_features[j]);
      //         rects
      //           .append("g")
      //           .attr("transform", `translate(${svgrect.x},${svgrect.y})`)
      //           .selectAll("circle")
      //           .data(nodes.descendants().slice(1))
      //           .enter()
      //           .append("circle")
      //           .attr("fill", "rgb(31, 119, 180)")
      //           .attr("fill-opacity", "0.4")
      //           .attr("cx", function (d) {
      //             return d.x;
      //           })
      //           .attr("cy", function (d) {
      //             return d.y;
      //           })
      //           .attr("r", function (d) {
      //             return d.r;
      //           });
      //       }
      //     }

      //     let curve = d3
      //       .line()
      //       .x((d) => d.x)
      //       .y((d) => d.y)
      //       // .curve(d3.curveMonotoneX)
      //       .curve(d3.curveCatmullRom.alpha(1)); //让line变得圆滑
      //     let curve_line = svg
      //       .append("g")
      //       .attr("transform", "translate(" + 10 + "," + 10 + ")");
      //     for (let item of features) {
      //       let rects = d3.selectAll(`.${item}`)._groups[0];
      //       if (rects.length > 1) {
      //         let points = [];
      //         for (let rect of rects) {
      //           // console.log(rect.getBBox())
      //           let svgrect = rect.getBBox();
      //           points.push({
      //             x: svgrect.x + svgrect.width * 0.5,
      //             y: svgrect.y + svgrect.height * 0.5,
      //           });
      //         }
      //         // console.log(curve(points))
      //         curve_line
      //           .append("path")
      //           .attr("d", curve(points))
      //           .attr("stroke", "#cbdcdf")
      //           .attr("fill", "none");
      //       }
      //     }
      //   },
      //   (err) => {
      //     console.log("报错：", err);
      //   }
      // );
      //#endregion
    },
  };
</script>

<style scoped>
  #proj-table {
    /* width: 768px;
    height: 377px; */
    width: 55vw;
    height: 98%;
    /* overflow: scroll; */
    /* overflow: scroll; */
    /* overflow-x: scroll;
    overflow-y: scroll; */
  }
  #right-panel-proj {
    width: 60vw;
    height: 100%;
    overflow: hidden;
  }

  h4 {
    font-family: 微软雅黑;
    background-color: rgb(242, 242, 242);
    padding: 3px 3px;
    border-bottom: 2px solid rgb(200, 200, 200);
    text-align: center;
    margin: 0px 0px 0px 0px;
  }

  /* @import url("../../dist/css/projection-style.css"); */
</style>
