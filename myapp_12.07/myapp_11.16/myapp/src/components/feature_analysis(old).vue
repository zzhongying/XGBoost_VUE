<template>
  <div id="right-panel-proj">
    <h4> CONSTELLATION BASED ON ITERATION </h4>
    <table class="proj-table">
      <tr>
        <th style="border-radius: 1px; width: 280px">
          <span class="btn-group-proj">
            <button id="data-button" class="proj-button">显示数据</button>
            <button id="median-button" class="proj-button">Median</button>
            <button id="density-button" class="proj-button">Histogram</button>
            <button id="points-button" class="proj-button">Points</button>
            <button id="cf-button" class="proj-button">CF</button>
            <button id="detail-button" class="proj-button">Details</button>
          </span>
        </th>
      </tr>
      <tr>
        <td>
          <div id="distribution-div" style="height: 90%;width: 100%"></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as d3 from "d5";
import $ from "jquery";
import axios from 'axios'
export default {
  name: "div_center",
  methods: {
    draw_comparison(
      complete_data,
      place,
      median_toggle,
      density_toggle,
      point_toggle,
      cf_toggle,
      detail_toggle
    )
    {


      // -- Which side to draw on --
      let single_side = 0; // 0 - left || 1 - right

      function stagger_val(x, y, radius) {
        //x=xScale(data[0].name) y=yScale(data[0].scl_val) radius=3
        var dx =
          radius *
          Math.sqrt(-2 * Math.log(Math.random())) *
          Math.cos(2 * Math.PI * Math.random());
        // dy = radius*Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random());
        var rand_y = Math.random();
        var dy = (rand_y - 0.5) * 15;
        // console.log(dy);
        var angle = 2 * Math.PI * Math.random();
        var x_out = x + dx;
        var y_out = y + dy;

        return [x_out, y_out];
      }

      function draw_curve(data, tri_w, shift, binh) {
        var PI = 3.14159265358979323;

        var lineGenerator = d3.line().curve(d3.curveCardinal);

        var full_string = "";

        for (let n = 0; n < data.length; n++) {
          var d = data[n];

          if (d.scl_val != d.scl_change) {
            var x1 = xScale(d.name);
            var x2 = xScale(d.name) + tri_w;
            var y1 = yScale(d.scl_val);
            var y2 = yScale(d.scl_change);

            var y1_dec = Math.floor(d.scl_val * 10);
            var y2_dec = Math.floor(d.scl_change * 10);

            if (shift_lst[n] != 0) {
              var res1 = height - shift_lst[n][y1_dec] + binh / 2;
              var res2 = height - shift_lst[n][y2_dec] + binh / 2;
              // -- Curvature based on difference --
              var diff = Math.abs(d.scl_val - d.scl_change) * tri_w * 3;
            } else {
              var res1 = y1;
              var res2 = y2;
              // -- Curvature based on difference --
              var diff = Math.abs(d.scl_val - d.scl_change) * tri_w * 2;
            }

            var adj = Math.abs(res1 - res2) / 6;

            var center_y = (res1 + res2) / 2;

            // -- Decide side --
            if (y1 > y2) {
              var center_x = x1 + diff;
              var bool = true;
            } else {
              var center_x = x1 - diff;
              var bool = false;
            }

            // -- Stagger the points --
            var stagger_amount = 3;
            // if (Math.abs(diff)< stagger_amount){
            //     stagger_amount = diff;
            // }

            var new_pair = stagger_val(center_x, center_y, stagger_amount);
            center_x = new_pair[0];
            center_y = new_pair[1];

            // -- Approximate angles --
            var diff_new = Math.abs(center_x - x1);
            var half_dist = Math.abs(res1 - res2) / 2 - adj;
            // half_dist = Math.abs(center_y-res1)-adj;
            var hypo = Math.sqrt(half_dist * half_dist + diff_new * diff_new); //hypothenuse
            var theta = Math.asin(diff / hypo) * 1.4;

            // -- Curve adjustments --
            if (bool) {
              var points = [
                [x1, res1],
                [center_x, center_y + adj],
                [center_x, center_y - adj],
                [x1, res2],
              ];
            } else {
              var points = [
                [x1, res1],
                [center_x, center_y - adj],
                [center_x, center_y + adj],
                [x1, res2],
              ];
            }

            var pathData = lineGenerator(points);

            // -- Drawing triangles --
            if (res1 > res2) {
              var size = 8;
              var cx = x1 - Math.cos(PI / 2 + theta) * size * 0.2;
              var cy = res2 + Math.sin(PI / 2 + theta) * size * 0.2;

              var P1_x = cx + Math.cos(0 + theta) * size * 0.5;
              var P1_y = cy - Math.sin(0 + theta) * size * 0.5;

              var P2_x = cx + Math.cos(PI / 2 + theta) * size;
              var P2_y = cy - Math.sin(PI / 2 + theta) * size;

              var P3_x = cx + Math.cos(PI + theta) * size * 0.5;
              var P3_y = cy - Math.sin(PI + theta) * size * 0.5;

              var one_tri =
                "M" +
                P1_x +
                "," +
                P1_y +
                "L" +
                P2_x +
                "," +
                P2_y +
                "L" +
                P3_x +
                "," +
                P3_y +
                "L" +
                P2_x +
                "," +
                P2_y;
            }
            else {
              var size = 8;
              var cx = x1 + Math.cos(PI / 2 + theta) * size * 0.2;
              var cy = res2 - Math.sin(PI / 2 + theta) * size * 0.2;

             var P1_x = cx + Math.cos(0 + theta) * size * 0.5;
             var P1_y = cy - Math.sin(0 + theta) * size * 0.5;

              var P2_x = cx - Math.cos(PI / 2 + theta) * size;
              var P2_y = cy + Math.sin(PI / 2 + theta) * size;

              var P3_x = cx + Math.cos(PI + theta) * size * 0.5;
              var P3_y = cy - Math.sin(PI + theta) * size * 0.5;

              var one_tri =
                "M" +
                P1_x +
                "," +
                P1_y +
                "L" +
                P2_x +
                "," +
                P2_y +
                "L" +
                P3_x +
                "," +
                P3_y +
                "L" +
                P2_x +
                "," +
                P2_y;
            }

            full_string = full_string + pathData + one_tri;
          }
        }

        // console.log(full_string);
        return full_string;
      }

      // --- Establish metadata ---
      //建立元数据
      var metadata = complete_data[0].meta;

      var no_features = metadata.length, // Assumes they all match
        no_bins = complete_data[0].den[0].length, // Assumes they all match
        no_samples_lst = [],
        pt_opp_lst = [];

      // --- Identify the number of sets to visualize ---
      //确定要可视化的集合数
      var no_sets = complete_data.length,
        fixed_sets = 2;

      var max_ft_name_len = 15;

      for (let i = 0; i < no_sets; i++) {
        let no_samp = complete_data[0].data.length;
        no_samples_lst.push(no_samp); // Different for each set

        if (50 / no_samp > 1) {
          //no_samp小于50
          pt_opp_lst.push(0.7);
        } else {
          pt_opp_lst.push((1 / no_samp) * 50);
        }
      }

      // --- Point related variables ---
      //点相关变量
      var points_col = "#67a9cf",
        point_size = 2,
        stagger_r = 3;

      // --- Track current bin ---
      //追踪当前垃圾箱
      var current_bin = "";

      // --- Color related variables ---
      //颜色相关变量
      var good_col = "#d95f02",
        bad_col = "#1b9e77";

      var single_data_point = complete_data[0].data[0];

      // --- Establshing Dimensions ---
      var max_width = 1050,
        one_width = max_width / no_features / fixed_sets; // => 1050/13/2

      if (one_width > 50) {
        one_width = 50;
      } // Ensures width is not too big(确保宽度不太大)

      var col_width = one_width * fixed_sets,
        half_col = one_width, // TO REMOVE
        separator = 0.3,
        padding = 10;

      // --- Establishing margins and canvas bounds ---
      //建立边距和画布边界
      var margin = {
          top: 30,
          right: 20,
          bottom: 75,
          left: 100,
        },
        width = col_width * no_features - margin.right - margin.left,
        height = 320 - margin.top - margin.bottom;


      // --- Creating Scales based on canvas ---
      //基于画布创建比例
      var xScale = d3
          .scaleBand()
          .domain(
            metadata.map(function (d) {
              return d.name;
            })
          )
          .rangeRound([0, width]) //替代range()方法，这个方法比例尺返回的数据会四舍五入取整。
          .paddingInner(separator), //内部不填充的比例
        yScale = d3.scaleLinear().domain([0, 1]).rangeRound([height, 0]);

      var bandwidth = xScale.bandwidth(), //填充宽度
        // triangle_w = 0.6*bandwidth/no_sets;
        triangle_w = (one_width / 2) * 1.5; // Single CF Triangle Width（单CF三角形宽度）

      // --- Density Variables and Scales --
      //密度变量和尺度
      var den_colour = "#7570b3";

      var yDenScale = d3
        .scaleLinear()
        .domain([0, height])
        .rangeRound([height, 0]);

      let xDenScale = d3
        .scaleLinear()
        .domain([0, 1])
        .rangeRound([0, bandwidth / fixed_sets - 5]);

      // --- Creating base SVG ---
      //创建基本SVG
      // console.log("svg宽度", width, margin.right, margin.left);
      var svg = d3
        .select(place)
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .attr("style", "float: center;")
        .attr("class", "main-svg")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // -- Drawing and styling the AXIS
      //绘制轴并设置其样式
      var xAxis = d3.axisBottom().scale(xScale);

      // --- Make space for Details ---
      //第五个按钮（Details)
      if (detail_toggle) {
        //将x轴向下移动10
        var axis_svg = svg
          .append("g")
          .attr("class", "detailed")
          .attr("transform", "translate(0," + 10 + ")");
      } else {
        var axis_svg = svg;
      }
      //绘制x轴
      axis_svg
        .append("g")
        .attr("class", "axis")
        .attr("y", -50)
        .attr("transform", "translate(0," + (height + padding) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("fill", "black")
        .style("text-anchor", "end")
        .attr("dy", "-0.5em")
        .attr("dx", "-0.5em")
        .attr("transform", "rotate(-25)")
        .attr("class", "feature-name");

      // ====== Creating a shift vector ======
      var shift_lst = [];

      for (let n = 0; n < no_features; n++) {
        var oneMeta = metadata[n];

        if (oneMeta.cat == 1) {
          var ft_bins = oneMeta.bins.length;
          var section_h = height / ft_bins;
          var hist_h = height / no_bins; //no_bins=complete_data[0].den[0].length

          // console.log(oneMeta.bins);

          // // shift_map = new Map();
          var one_shift = [];
          for (let g = 0; g < ft_bins; g++) {
            var bin_val = oneMeta.bins[g][0];
            var bin_shift = section_h / 2 + section_h * g + hist_h / 2;
            one_shift.push(bin_shift);
          }
          shift_lst.push(one_shift);
        } else {
          shift_lst.push(0);
        }
      }

      // ======= Density Distribution =======
      //密度分布
      var single_bw = bandwidth / fixed_sets,
        start_point = single_bw / 2,
        histo_bin_h = height / no_bins;

      var point_shift = histo_bin_h / 2;

      // -- Max/Min range details --
      //第五个按钮（Details)
      //绘制第五个按钮的图
      if (detail_toggle) {
        svg
          .append("g")
          .selectAll("text")
          .data(complete_data[0].meta)
          .enter()
          .append("text")
          .text(function (d) {
            return "Min: " + d.min.toString();
          })
          .attr("x", function (d) {
            return xScale(d.name) + bandwidth / 2;
          })
          .attr("y", yScale(0) + 14)
          .attr("text-anchor", "middle")
          .attr("font-family", '"Open Sans", sans-serif')
          .attr("font-size", "9px")
          .attr("font-weight", 400)
          .attr("fill", "black");

        svg
          .append("g")
          .selectAll("text")
          .data(complete_data[0].meta)
          .enter()
          .append("text")
          .text(function (d) {
            return "Max: " + d.max.toString();
          })
          .attr("x", function (d) {
            return xScale(d.name) + bandwidth / 2;
          })
          .attr("y", yScale(1) - 14)
          .attr("text-anchor", "middle")
          .attr("font-family", '"Open Sans", sans-serif')
          .attr("font-size", "9px")
          .attr("font-weight", 400)
          .attr("fill", "black");
      }

      for (let s = 0; s < no_sets; s++) {
        // -- Data variables for the specific set --
        var this_set = complete_data[s];
        var this_data = this_set.data;
        var this_den = this_set.den;
        var this_med = this_set.median;
        var this_meta = this_set.meta;

        if (no_sets == 1 && single_side == 1) {
          s = 1;
        }

        // console.log("----Set"+s.toString());
        // === Density & Median ===
        // === 密度 & 中值 ===
        //画密度图（点）和中心线（竖线）
        for (let ind = 0; ind < no_features; ind++) {
          var ft_name = this_data[0][ind].name;
          var centre = xScale(ft_name) + start_point + s * single_bw;

          // --- Centre Line ---
          //添加中心线（竖线）
          svg
            .append("g")
            .append("line")
            .attr("x1", centre)
            .attr("x2", centre)
            .attr("y1", yDenScale(0))
            .attr("y2", yDenScale(height))
            .attr("width", 3)
            .attr("opacity", 0.2)
            .attr("stroke-width", 0.5)
            .attr("stroke", den_colour)
            .attr("class", "shuxian");

          // --- Drawing the Density ---
          //画正方形（histogram）（density_toggle）
          for (let n = 0; n < this_meta[ind].bins.length; n++) {
            var inBin = xDenScale(this_den[ind][n]);
            // console.log(this_den[ind][n]);

            if (this_den[ind][n] > 0 && inBin < 3) {
              // Look into this
              inBin = 3;
            }
            //
            svg
              .append("g")
              .append("rect")
              .attr(
                "id",
                "den-" +
                  s.toString() +
                  "-" +
                  ind.toString() +
                  "-" +
                  n.toString()
              )
              .attr("x", centre - inBin / 2)
              .attr("y", function () {
                if (this_meta[ind].cat == 1 && inBin != 0) {
                  var res = height - shift_lst[ind][n];
                  return res;
                }
                return yDenScale(histo_bin_h * n + histo_bin_h);
              })
              .attr("height", histo_bin_h)
              .attr("width", inBin)
              .attr("fill", den_colour)
              .attr("opacity", function (d) {
                //第二个按钮（Histogram）
                if (density_toggle) {
                  return 0.4;
                } else {
                  return 0;
                }
              })
              .attr("stroke-width", 1)
              .attr("stroke", "white");

            // --- Bin Details ---
            if (s == 0) {
              svg
                .append("g")
                .append("text")
                .text(function () {
                  if (this_meta[ind].cat) {
                    return this_meta[ind].bins[n];
                  } else {
                    var low = this_meta[ind].bins[n][0];
                    var high = this_meta[ind].bins[n][1];
                  }
                  return low + "-" + high;
                })
                .attr("id", function () {
                  return (
                    s.toString() + "-" + ind.toString() + "-" + n.toString()
                  );
                })
                .attr("x", function () {
                  return xScale(this_meta[ind].name) + bandwidth / 2;
                })
                .attr("y", function () {
                  if (this_meta[ind].cat == 1) {
                    var res = height - shift_lst[ind][n] + histo_bin_h / 2 + 3;
                    // res = yDenScale(histo_bin_h*n+histo_bin_h);
                    return res;
                  }

                  return yDenScale(
                    histo_bin_h * n + histo_bin_h - histo_bin_h / 2 - 5
                  );
                })

                // .attr("y",yDenScale(histo_bin_h*n+histo_bin_h - histo_bin_h/2-5))
                .attr("text-anchor", "middle")
                .attr("font-family", '"Open Sans", sans-serif')
                .attr("font-size", "10px")
                .attr("font-weight", 400)
                .attr("fill", "none");
            }
          }

          // --- Median Line ---
          //第一个按钮（Median）
          if (median_toggle) {
            var tick_size = 10,
              tick_width = 3;

            svg
              .append("g")
              .append("line")
              .attr("class", "split_lines")
              .attr("x1", centre - tick_size / 2)
              .attr("y1", function () {
                if (this_meta[ind].cat == 1) {
                  return yScale(this_med[ind]) - point_shift;
                } else {
                  return yScale(this_med[ind]);
                }
              })
              .attr("y2", function () {
                if (this_meta[ind].cat == 1) {
                  return yScale(this_med[ind]) - point_shift;
                } else {
                  return yScale(this_med[ind]);
                }
              })
              .attr("x2", centre + tick_size / 2)
              .style("stroke", den_colour)
              .style("stroke-opacity", function () {
                if (this_meta[ind].cat == 1) {
                  return 0;
                } else {
                  return 1;
                }
              })
              .style("stroke-width", tick_width);
          }
        }

        var shift_svg = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + (start_point + s * single_bw) + ",0)"
          );

        // === Individual Points ===
        //第三个按钮（Points）
        if (point_toggle) {
          for (let n = 0; n < this_data.length; n++) {
            var oneData = this_data[n];
            var line_str = "M";
            for (let i = 0; i < oneData.length; i++) {
              var d = oneData[i];
              var x = xScale(d.name);
              var y = yScale(d.scl_val);

              x = stagger_val(x, y, stagger_r)[0];

              // Add shift
              if (this_meta[i].cat == 1) {
                var y_dec = Math.floor(d.scl_val * 10);
                y = height - shift_lst[i][y_dec] + histo_bin_h / 2;

                //不是一个number类型
                if (isNaN(y) == true) {
                  // Non-permanent fix // Remove later
                  y_dec = shift_lst[i].length - 1;
                  y = height - shift_lst[i][y_dec] + histo_bin_h / 2;
                }
              }

              // y_shift = yScale(d.scl_val)-point_shift;
              var xy = stagger_val(xScale(d.name), y, stagger_r + 1);

              // Identify discrete features to jagger
              if (this_meta[i].cat == 1) {
                y = xy[1];
                x = xy[0];
              }
              // x = xy[0]; // Jaggers all point in x-plane

              shift_svg
                .append("g")
                .append("circle")
                .attr("class", s.toString() + "-" + n.toString())
                .attr("r", point_size)
                .attr("cx", x)
                .attr("cy", y)
                .style("fill", function () {
                  if (d.dec == 0) {
                    return good_col;
                  } else {
                    return bad_col;
                  }
                })
                .style("opacity", pt_opp_lst[s])
                .on("mouseover", function () {
                  var id_code = d3.select(this).attr("class");
                  d3.select("#line-" + id_code.toString()).attr(
                    "stroke-opacity",
                    1
                  );
                })
                .on("mouseout", function () {
                  var id_code = d3.select(this).attr("class");
                  d3.select("#line-" + id_code.toString()).attr(
                    "stroke-opacity",
                    0
                  );
                });
              // Add to line path
              line_str = line_str + x.toString() + "," + y.toString();
              if (i != oneData.length - 1) {
                line_str += ",L";
              }
            }

            // ==== Draw line connecting points ====
            //绘制点与点之间的线
            shift_svg
              .append("g")
              .append("path")
              .attr("d", line_str)
              .attr("id", "line-" + s.toString() + "-" + n.toString())
              .attr("fill", "None")
              .attr("stroke-width", 0.5)
              .attr("stroke", "gray")
              .attr("stroke-opacity", 0);
          }
        }

        function draw_lines(data, set, ft, bin, clear) {
          // Deselect all previous selections
          //取消选择之前的所有选择
          d3.selectAll(".line-selected")
            .attr("class", "line-empty")
            .attr("stroke-opacity", 0);

          if (clear == false) {
            for (let n = 0; n < data.length; n++) {
              var oneData = data[n];

              if (oneData[ft].bin_id == bin) {
                var id_code = set.toString() + "-" + n.toString();
                d3.select("#line-" + id_code.toString())
                  .attr("stroke-opacity", 1)
                  .attr("class", "line-selected");
              }
            }
          }
        }

        // --- Click Boxes  ---
        for (let ind = 0; ind < no_features; ind++) {
          ft_name = this_data[0][ind].name;
          centre = xScale(ft_name) + start_point + s * single_bw;
          var box_size = xDenScale(1) + 5;
          for (let no = 0; no < this_meta[ind].bins.length; no++) {
            svg
              .append("g")
              .append("rect")
              .attr("data-bin", no)
              .attr("data-set", s)
              .attr("data-ft", ind)
              .attr("x", centre - box_size / 2)
              .attr("y", function () {
                if (this_meta[ind].cat == 1) {
                  var res = height - shift_lst[ind][no];
                  // res = yDenScale(histo_bin_h*n+histo_bin_h);
                  return res;
                }
                return yDenScale(histo_bin_h * no + histo_bin_h);
              })
              .attr("height", histo_bin_h)
              .attr("width", box_size)
              .attr("fill", "red")
              .attr("opacity", 0)
              .on("click", function () {
                // console.log("clicked");
                var selection = d3.select(this);
                var set_id = selection.attr("data-set");
                var bin_id = selection.attr("data-bin");
                var ft_id = selection.attr("data-ft");

                var bin_str =
                  set_id.toString() +
                  "-" +
                  ft_id.toString() +
                  "-" +
                  bin_id.toString();
                if (bin_str == current_bin) {
                  var clear = true;
                  current_bin = "";
                } else {
                  var clear = false;
                  current_bin = bin_str;
                }
                draw_lines(this_data, set_id, ft_id, bin_id, clear);
              })
              .on("mouseover", function () {
                //第五个按钮（Details)
                if (detail_toggle) {
                  var selection = d3.select(this);
                  var set_id = selection.attr("data-set");
                  var bin_id = selection.attr("data-bin");
                  var ft_id = selection.attr("data-ft");
                  var bin_str =
                    set_id.toString() +
                    "-" +
                    ft_id.toString() +
                    "-" +
                    bin_id.toString();
                  document.getElementById(bin_str);
                  var det_selection = document.getElementById(bin_str);
                  // det_selection.style.fill = "black";
                }
              })
              .on("mouseout", function () {
                //第五个按钮（Details)
                if (detail_toggle) {
                  var selection = d3.select(this);
                  var set_id = selection.attr("data-set");
                  var bin_id = selection.attr("data-bin");
                  var ft_id = selection.attr("data-ft");
                  var bin_str =
                    set_id.toString() +
                    "-" +
                    ft_id.toString() +
                    "-" +
                    bin_id.toString();
                  document.getElementById(bin_str);
                  var det_selection = document.getElementById(bin_str);
                  // det_selection.style.fill = "none";
                }
              });
          }
        }

        shift_svg = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + (start_point + s * single_bw) + ",0)"
          );

        // === Counter Factuals ===
        //第四个按钮（CF)
        if (cf_toggle) {
          shift_svg
            .append("g")
            .selectAll("path")
            .data(this_data)
            .enter()
            .append("path")
            .on("mouseover", function () {
              d3.selectAll(".arrows").attr("stroke-opacity", 0);
              d3.select(this).attr("stroke-opacity", 1);
              d3.select(this).attr("stroke-width", 3);
            })

            .on("mouseout", function () {
              d3.selectAll(".arrows").attr("stroke-opacity", 0.2);
              d3.selectAll(".arrows").attr("stroke-width", 1);
              // d3.select(this).attr("stroke-opacity",0)
            })
            .on("click", function (d) {
              var reloc =
                window.location.origin + "/individual?sample=" + d[0].sample;
              window.location.href = reloc;
            })
            .attr("d", function (d) {
              return draw_curve(d, triangle_w, shift_lst, histo_bin_h);
            })
            .attr("class", "arrows")
            .attr("fill-opacity", 0) // 0.7
            .attr("fill", function (d) {
              if (d[0].dec == 0) {
                return bad_col;
              } else {
                return good_col;
              }
            })
            .attr("stroke-width", 1)
            .attr("stroke", function (d) {
              if (d[0].dec == 0) {
                return bad_col;
              } else {
                return good_col;
              }
            })
            .attr("stroke-opacity", 0.2); // 0
        }
      }

      for (var j = 0; j < no_features; j++) {
        var ft_name =
          document.getElementsByClassName("feature-name")[j].innerHTML;
        var short_ft_name = ft_name;
        if (ft_name.length > max_ft_name_len) {
          short_ft_name = ft_name.substring(0, max_ft_name_len) + "...";
        }
        document.getElementsByClassName("feature-name")[j].innerHTML =
          short_ft_name;
      }
    },
  },
  mounted() {
    // console.log("mounted调用咯")
    // console.log(this)
    d3.json("./data_div_center.json").then((data)=>{
      // console.log("d3读取数据",data)
      document.getElementById("data-button").onclick = () => {
        // console.log("数据：", data);
      };
      let resp_list = data;
      let median_toggle = false;
      let density_toggle = false;
      let points_toggle = false;
      let cf_toggle = false;
      let detail_toggle = false;
      let box = document.getElementById("distribution-div");
      document.getElementById("median-button").onclick = () => {
        box.innerHTML = "";
        median_toggle = !median_toggle;
        // console.log("median_toggle:", median_toggle);
        median_toggle == true
          ? (document.getElementById("median-button").style.backgroundColor =
              "red")
          : (document.getElementById("median-button").style.backgroundColor =
              "white");
        this.draw_comparison(
          resp_list,
          "#distribution-div",
          median_toggle,
          density_toggle,
          points_toggle,
          cf_toggle,
          detail_toggle
        );
      };
      document.getElementById("density-button").onclick = () => {
        box.innerHTML = "";
        density_toggle = !density_toggle;
        // console.log("density_toggle:", density_toggle);
        density_toggle == true
          ? (document.getElementById("density-button").style.backgroundColor =
              "red")
          : (document.getElementById("density-button").style.backgroundColor =
              "white");
        this.draw_comparison(
          resp_list,
          "#distribution-div",
          median_toggle,
          density_toggle,
          points_toggle,
          cf_toggle,
          detail_toggle
        );
      };
      document.getElementById("points-button").onclick = () => {
        box.innerHTML = "";
        points_toggle = !points_toggle;
        // console.log("points_toggle:", points_toggle);
        points_toggle == true
          ? (document.getElementById("points-button").style.backgroundColor =
              "red")
          : (document.getElementById("points-button").style.backgroundColor =
              "white");
        this.draw_comparison(
          resp_list,
          "#distribution-div",
          median_toggle,
          density_toggle,
          points_toggle,
          cf_toggle,
          detail_toggle
        );
      };
      document.getElementById("cf-button").onclick = () => {
        box.innerHTML = "";
        cf_toggle = !cf_toggle;
        // console.log("cf_toggle:", cf_toggle);
        cf_toggle == true
          ? (document.getElementById("cf-button").style.backgroundColor = "red")
          : (document.getElementById("cf-button").style.backgroundColor =
              "white");
        this.draw_comparison(
          resp_list,
          "#distribution-div",
          median_toggle,
          density_toggle,
          points_toggle,
          cf_toggle,
          detail_toggle
        );
      };
      document.getElementById("detail-button").onclick = () => {
        box.innerHTML = "";
        detail_toggle = !detail_toggle;
        // console.log("detail_toggle:", detail_toggle);
        detail_toggle == true
          ? (document.getElementById("detail-button").style.backgroundColor =
              "red")
          : (document.getElementById("detail-button").style.backgroundColor =
              "white");
        this.draw_comparison(
          resp_list,
          "#distribution-div",
          median_toggle,
          density_toggle,
          points_toggle,
          cf_toggle,
          detail_toggle
        );
      };
      this.draw_comparison(
        resp_list,
        "#distribution-div",
        median_toggle,
        density_toggle,
        points_toggle,
        cf_toggle,
        detail_toggle
      );
    },(err)=>{console.log("报错：",err)});
  },
};
</script>

<style scoped>
@import url("../../dist/css/projection-style.css");
</style>
