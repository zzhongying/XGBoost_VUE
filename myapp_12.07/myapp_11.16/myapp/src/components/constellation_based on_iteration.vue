<template>
  <div id="proj-table"></div>
</template>

<script>
import * as d3 from "d5";
import $ from "jquery";
import axios from "axios";
export default {
  name: "div_center",
  methods: {
  },
  mounted() {
    console.log("mounted调用咯");
    d3.json("./feature_values.json").then(
      (data) => {
        let width = 800;
        let height = 500;
        let Y = d3
          .scaleBand()
          .domain(data.map((d) => d.Class))
          .rangeRound([60, height]);

        let svg = d3
          .select("#proj-table")
          .append("svg")
          .attr("width", width + "px")
          .attr("height", height + "px");

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

        let line = svg
          .append("g")
          .attr("transform", "translate(" + 10 + "," + 10 + ")");
        line
          .selectAll("line")
          .data(data.map((d) => d.Class))
          .enter()
          .append("line")
          .attr("x1", (d, ind) => text.node().getBBox().width + 1)
          .attr("y1", (d) => Y(d) - 5)
          .attr("x2", width - 10)
          .attr("y2", (d) => Y(d) - 5)
          .attr("stroke", "#7570b3");

        let X = d3
          .scaleLinear()
          .domain([0, 14])
          .rangeRound([
            line.node().getBBox().x + 10,
            line.node().getBBox().width,
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
          let use_data = data[i].data
            .filter((d) => d.Max - d.Min > 10 && d.Max - d.Min < 40)
            .slice(0, 15);
          for (let item of use_data) {
            item.feature = item.feature
              .split("(")
              .join("_")
              .split(")")
              .join("_");
            if (features.indexOf(item.feature) == -1)
              features.push(item.feature);
          }
          rects
            .selectAll(`.rect_${data[i].Class}`)
            .data(use_data)
            .enter()
            .append("rect")
            .attr("y", (d) => {
              return Y(data[i].Class) - 5 - (d.Max - d.Min) * 0.5;
            })
            .attr("x", (d, ind) => {
              return X(ind);
            })
            .attr("height", (d) => d.Max - d.Min)
            .attr("width", 20)
            .attr("fill", "pink")
            .attr("class", (d) =>
              d.feature.split("(").join("_").split(")").join("_")
            )
            .classed(`rect_${data[i].Class}`, true);

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
                tem.push(d.slice(0, 5));
                d = d.slice(5, d.length);
              }
              return tem.map((dd) => (ind >= 10 ? 2 + dd + ind : 1 + dd + ind));
            })
            .enter()
            .append("tspan")
            .text((d) => {
              return d.slice(1, d.length - d.slice(0, 1));
            })
            .attr("font-size", 8)
            .attr("x", (d) => {
              return X(
                parseInt(d.slice(d.length - parseInt(d.slice(0, 1)), d.length))
              );
            })
            .attr("dy", "1em");

          for (let j = 0, k = data[i].fusion_features.length; j < k; j++) {
            rects
              .append("rect")
              .attr("y", (d) => {
                return Y(data[i].Class) - 5 - 10;
              })
              .attr("x", X(15 + j))
              .attr("height", 20)
              .attr("width", 20)
              .attr("fill", "pink")
              .attr("class", data[i].Class + data[i].fusion_features[j].name);

            rects
              .append("text")
              // .text(data[i].fusion_features[j].name.slice(11, 15))
              .attr("font-size", 8)
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
          let rects = d3.selectAll(`.${item}`)._groups[0];
          if (rects.length > 1) {
            let points = [];
            for (let rect of rects) {
              // console.log(rect.getBBox())
              let svgrect = rect.getBBox();
              points.push({
                x: svgrect.x + svgrect.width * 0.5,
                y: svgrect.y + svgrect.height * 0.5,
              });
            }
            // console.log(curve(points))
            curve_line
              .append("path")
              .attr("d", curve(points))
              .attr("stroke", "pink")
              .attr("fill", "none");
          }
        }
      },
      (err) => {
        console.log("报错：", err);
      }
    );
  },
};
</script>

<style scoped>
#proj-table {
  width: 768px;
  height: 377px;
  overflow: scroll;
}
</style>
