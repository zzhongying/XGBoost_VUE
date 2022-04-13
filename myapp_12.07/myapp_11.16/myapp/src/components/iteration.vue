<template>
  <div class="bottom_1">
    <h4>CONSTELLATION BASED ON ITERATION</h4>
    <div id="barchart">
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import * as echarts from 'echarts'
  import $ from 'jquery'
  import Readcsv from '../ToolJs/Readcsv'
  import Selector from "./selector"
  import * as d4 from "../../public/d3";
  import axios from "axios";

  export default {
    name: "bottom_1",
    // components: {select},
    data() {
      return {
        data_right: [],
        type_name:{
          "Benign_application": [
            {
              "attr_a": 10,
              "attr_b": 8,
              "attr_c": 7,
              "attr_d": 13,
              "attr_e": 12,
              "attr_f": 10,
              "attr_g": 8,
              "attr_h": 7,
              "attr_i": 13,
              "attr_j": 12
            },   //属性
            {
              "p_a": 10,
              "p_b": 8,
              "p_c": 7,
              "p_d": 13,
              "p_e": 12,
              "p_f": 10,
              "p_g": 8,
              "p_h": 7,
              "p_i": 13,
              "p_j": 12
            },   //性能
          ],
          // "Bank_malware": [
          //   {
          //     "attr_a": 10,
          //     "attr_b": 8,
          //     "attr_c": 7,
          //     "attr_d": 13,
          //     "attr_e": 12,
          //     "attr_f": 10,
          //     "attr_g": 8,
          //     "attr_h": 7,
          //     "attr_i": 13,
          //     "attr_j": 12
          //   },   //属性
          //   {
          //     "p_a": 10,
          //     "p_b": 8,
          //     "p_c": 7,
          //     "p_d": 13,
          //     "p_e": 12,
          //     "p_f": 10,
          //     "p_g": 8,
          //     "p_h": 7,
          //     "p_i": 13,
          //     "p_j": 12
          //   },   //性能
          // ],
          // "Benign_application": [
          //   {
          //     "attr_a": 10,
          //     "attr_b": 8,
          //     "attr_c": 7,
          //     "attr_d": 13,
          //     "attr_e": 12,
          //     "attr_f": 10,
          //     "attr_g": 8,
          //     "attr_h": 7,
          //     "attr_i": 13,
          //     "attr_j": 12
          //   },   //属性
          //   {
          //     "p_a": 10,
          //     "p_b": 8,
          //     "p_c": 7,
          //     "p_d": 13,
          //     "p_e": 12,
          //     "p_f": 10,
          //     "p_g": 8,
          //     "p_h": 7,
          //     "p_i": 13,
          //     "p_j": 12
          //   },   //性能
          // ]
        },
        bubble_data:{
          "Benign_application": [
            {name: "tree1", count: 345, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree2", count: 3345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree3", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree4", count: 245, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree5", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree6", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree7", count: 1045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree8", count: 2345, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree9", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree10", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree11", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree12", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree13", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree14", count: 5045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree15", count: 1235, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree16", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree17", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree18", count: 345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree19", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree20", count: 345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree21", count: 1345, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree22", count: 335, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree23", count: 145, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree24", count: 245, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree25", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree26", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree27", count: 1045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree28", count: 125, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree29", count: 335, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree30", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree31", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree32", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree33", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree34", count: 1045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree35", count: 1245, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree36", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree37", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree38", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree39", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree40", count: 234, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree41", count: 125, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree42", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree43", count: 145, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree44", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree45", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree46", count: 25, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree47", count: 105, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree48", count: 234, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree49", count: 334, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree50", count: 335, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]}
          ],
          "spam": [
            {name: "tree1", count: 345, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree2", count: 3345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree3", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree4", count: 245, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree5", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree6", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree7", count: 1045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree8", count: 2345, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree9", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree10", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree11", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree12", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree13", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree14", count: 1045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree15", count: 1235, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree16", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree17", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree18", count: 345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree19", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree20", count: 345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree21", count: 1345, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree22", count: 13035, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree23", count: 145, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree24", count: 245, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree25", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree26", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree27", count: 1045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree28", count: 125, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree29", count: 335, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree30", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree31", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree32", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree33", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree34", count: 1045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree35", count: 1245, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree36", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree37", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree38", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree39", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree40", count: 234, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree41", count: 125, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree42", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree43", count: 145, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree44", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree45", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree46", count: 25, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree47", count: 105, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree48", count: 234, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree49", count: 334, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree50", count: 335, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]}
          ],
          "malware": [
            {name: "tree1", count: 345, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree2", count: 3345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree3", count: 10345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree4", count: 245, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree5", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree6", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree7", count: 1045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree8", count: 2345, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree9", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree10", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree11", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree12", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree13", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree14", count: 1045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree15", count: 1235, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree16", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree17", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree18", count: 345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree19", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree20", count: 345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree21", count: 1345, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree22", count: 335, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree23", count: 145, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree24", count: 245, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree25", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree26", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree27", count: 1045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree28", count: 125, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree29", count: 335, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree30", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree31", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree32", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree33", count: 2345, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree34", count: 1045, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree35", count: 1245, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree36", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree37", count: 1345, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree38", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree39", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree40", count: 234, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree41", count: 125, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree42", count: 345, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree43", count: 145, piedata: [{"area": "正影响 ", "value": 20}, {"area": "负影响 ", "value": 80}]},
            {name: "tree44", count: 2345, piedata: [{"area": "正影响 ", "value": 50}, {"area": "负影响 ", "value": 50}]},
            {name: "tree45", count: 545, piedata: [{"area": "正影响 ", "value": 70}, {"area": "负影响 ", "value": 30}]},
            {name: "tree46", count: 25, piedata: [{"area": "正影响 ", "value": 65}, {"area": "负影响 ", "value": 35}]},
            {name: "tree47", count: 105, piedata: [{"area": "正影响 ", "value": 45}, {"area": "负影响 ", "value": 55}]},
            {name: "tree48", count: 234, piedata: [{"area": "正影响 ", "value": 60}, {"area": "负影响 ", "value": 40}]},
            {name: "tree49", count: 334, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]},
            {name: "tree50", count: 335, piedata: [{"area": "正影响 ", "value": 30}, {"area": "负影响 ", "value": 70}]}
          ]
        },
        control_set:{

        }
      }
    },
    methods: {
      test(){
        console.log("this is test")
      },
      //#region
      // draw_scatter() {
      //   echarts.dispose(document.getElementById('scatter_chart'))
      //   let myChart = echarts.init(document.getElementById('scatter_chart'));
      //   // 为echarts对象加载数据
      //   let option = {
      //     // title: {
      //     //     text: '频率幅值图'
      //     // },
      //     grid: [  //将视图分成5个区域
      //       {
      //         left: '9%',
      //         width: '16%'
      //       },
      //       {
      //         left: '25%',
      //         width: '16%'
      //       },
      //       {
      //         left: '41%',
      //         width: '16%'
      //       },
      //       {
      //         left: '57%',
      //         width: '16%'
      //       },
      //       {
      //         left: '73%',
      //         width: '16%'
      //       },
      //     ],
      //     tooltip: {},
      //     legend: {
      //       orient: 'horizontal',
      //       //data:["SMS_malware", "Risk_software", "Bank_malware", "Benign_application","Advertising_software"],
      //       data: ["malware", "spam", "benign", "Defacement", "phishing"],
      //       textStyle: {  // 图列内容样式
      //         color: '#000',  // 字体颜色
      //       },
      //       x: 'left',//图例位置，设置right发现图例和文字位置反了，设置一个数值就好了
      //       y: 'top',//延Y轴居中
      //       marginBottom: '5px',
      //     },
      //     xAxis: [
      //       {
      //         type: 'value',
      //         //zlevel: 0,
      //         gridIndex: 0,  //使用第一个区域
      //         interval: 25,
      //         splitLine: {
      //           show: false,  //不显示网格线
      //         },
      //       },
      //       {
      //         type: 'value',
      //         position: 'bottom',
      //         // min: 0,
      //         //zlevel: 1,
      //         gridIndex: 1,  //使用第二个区域
      //         interval: 25,
      //         axisLine: {
      //           show: true,  //显示轴线
      //           color: 'red'
      //         },
      //         show: true,  //显示X轴
      //         splitLine: {
      //           show: false,
      //         },
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 0,
      //         position: 'bottom',
      //         min: 0,
      //         //zlevel: 1,
      //         gridIndex: 2,  //使用第二个区域
      //         interval: 25,
      //         axisLine: {
      //           show: true,  //显示轴线
      //           color: 'red'
      //         },
      //         show: true,  //显示X轴
      //         splitLine: {
      //           show: false,
      //         },
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 0,
      //         position: 'bottom',
      //         min: 0,
      //         //zlevel: 1,
      //         gridIndex: 3,  //使用第二个区域
      //         interval: 25,
      //         axisLine: {
      //           show: true,  //显示轴线
      //           color: 'red'
      //         },
      //         show: true,  //显示X轴
      //         splitLine: {
      //           show: false,
      //         },
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 0,
      //         position: 'bottom',
      //         min: 0,
      //         //zlevel: 1,
      //         gridIndex: 4,  //使用第二个区域
      //         interval: 25,
      //         axisLine: {
      //           show: true,  //显示轴线
      //           color: 'red'
      //         },
      //         show: true,  //显示X轴
      //         splitLine: {
      //           show: false,
      //         },
      //       },
      //     ],
      //     yAxis: [
      //       {
      //         type: 'value',
      //         //zlevel: 0,
      //         max: 1,
      //         gridIndex: 0,
      //         interval: 20,
      //         splitLine: {
      //           show: false
      //         },
      //         show:false
      //       },
      //       {
      //         type: 'value',
      //         zlevel: 1,
      //         gridIndex: 1,
      //         min: 0,
      //         max: 100,
      //         interval: 100,
      //         axisLabel: {
      //           show: true
      //         },
      //         axisLine: {
      //           show: false
      //         },
      //         splitLine: {
      //           show: false
      //         },
      //         show: false  //第二条Y轴不显示
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 1,
      //         gridIndex: 2,
      //         min: 0,
      //         max: 100,
      //         interval: 500,
      //         axisLabel: {
      //           show: false
      //         },
      //         axisLine: {
      //           show: false
      //         },
      //         splitLine: {
      //           show: false
      //         },
      //         show: false  //第二条Y轴不显示
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 1,
      //         gridIndex: 3,
      //         min: 0,
      //         max: 100,
      //         interval: 500,
      //         axisLabel: {
      //           show: false
      //         },
      //         axisLine: {
      //           show: false
      //         },
      //         splitLine: {
      //           show: false
      //         },
      //         show: false  //第二条Y轴不显示
      //       },
      //       {
      //         type: 'value',
      //         //zlevel: 1,
      //         gridIndex: 4,
      //         min: 0,
      //         max: 1,
      //         interval: 500,
      //         axisLabel: {
      //           show: false
      //         },
      //         axisLine: {
      //           show: false
      //         },
      //         splitLine: {
      //           show: false
      //         },
      //         show: false  //第二条Y轴不显示
      //       },
      //     ],
      //     series: this.series_Data.data,
      //   };
      //   myChart.setOption(option);
      //
      // },
      // type_name:当前展示的类型，bubbledata:气泡图的数据
      //#region
      draw_constellation(type_name, bubbledata) {
        let that=this
        // console.log("this指向",this)

        d3.select('#barchart').selectAll('svg').remove();

        var width = $('#barchart').width(),
          height = $('#barchart').height()*0.95 ,
          root;

        //缩放功能
        var zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

        function zoomed() {
          svg.attr("transform",
            "translate(" + zoom.translate() + ")" +
            "scale(" + zoom.scale() + ")"
          );
        }

        let tooltip = d3
          .select("#barchart")
          .append("div")
          .attr("id", "iteration_tooltip")
          .style("position",'absolute')
          .style("opacity", 0)
          .style("width",200+'px')
          .style('height','auto')
          .style('font-size',14+'px')
          .style('border',`${1}px solid rgb(214, 205, 205)`)
          .style('background-color','rgb(214, 205, 205)')

        var svg = d3.select("#barchart").append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("id", "all_g")
          .call(zoom)

        //设置示意标识
        svg.append("rect")
          .attr("x",10)
          .attr("y",10)
          .attr("width",30)
          .attr("height",15)
          .attr("fill","#cbdcdf" )

        svg.append("text")
          .attr("x", 45)
          .attr("y", 20 )
          .text("positive")
          .attr("font-family","20")
          .style('font-size',11)

        svg.append("rect")
          .attr("x",10)
          .attr("y",35)
          .attr("width",30)
          .attr("height",15)
          .attr("fill","#a5bbbf")

        svg.append("text")
          .attr("x",45)
          .attr("y",45)
          .text("negative")
          .style('font-size',11)

        svg.append("circle")
          .attr("r",10)
          .attr("cx",23)
          .attr("cy",function(){
            return $('#barchart').height()*0.8
          })
          .attr("fill","white")
          .attr("stroke","#b8776c")
          .attr("stroke-dasharray", "3")
          .attr("stroke-width",2)

        svg.append("text")
          .attr("x",45)
          .attr("y",function(){
            return $('#barchart').height()*0.8 -5
          })
          .text("feature")
          .style('font-size',11)

        svg.append("text")
          .attr("x",45)
          .attr("y",function(){
            return $('#barchart').height()*0.8 + 10
          })
          .text("important")  //important
          .style('font-size',11)


        svg.append("circle")
          .attr("r",10)
          .attr("cx",23)
          .attr("cy",function(){
            return $('#barchart').height()*0.92
          })
          .attr("fill","white")
          .attr("stroke","steelblue")
          .attr("stroke-dasharray", "3")
          .attr("stroke-width",2)

        svg.append("text")
          .attr("x",45)
          .attr("y",function(){
            return $('#barchart').height()*0.92 -5
          })
          .text("performance")  //distribution
          .style('font-size',11)

        svg.append("text")
          .attr("x",45)
          .attr("y",function(){
            return $('#barchart').height()*0.92 + 10
          })
          .text("distribution")  //distribution
          .style('font-size',11)



        const len = Object.keys(type_name).length

        function draw_charts(name, type_name, x_transform, y_transform, radius) {

          var data_inner = [
            [radius * 0.9, radius * 0.16],
            [-radius * 0.9, radius * 0.16],
            [radius * 0.9, -radius * 0.16],
            [-radius * 0.9, -radius * 0.16],
            [radius / 1.9, radius / 3.15],
            [-radius / 1.9, radius / 3.15],
            [-radius / 1.9, -radius / 3.15],
            [radius / 1.9, -radius / 3.15],
            [0, radius * 0.375],
            [0, -radius * 0.375]
          ]

          var data_outer = [
            [-radius * 1.2, 0],
            [radius * 1.2, 0],
            [radius * 0.9, radius * 0.3],
            [-radius * 0.9, radius * 0.3],
            [-radius * 0.9, -radius * 0.3],
            [radius * 0.9, -radius * 0.3],
            [radius * 0.35, -radius * 0.43],
            [radius * 0.35, radius * 0.43],
            [-radius * 0.35, radius * 0.43],
            [-radius * 0.35, -radius * 0.43],
          ]

          for (var obj in type_name) {

            for (var i = 0; i < data_inner.length; i++) {
              data_inner[i].push(Object.values(type_name[obj][0])[i], Object.keys(type_name[obj][0])[i])
              data_outer[i].push(Object.values(type_name[obj][1])[i], Object.keys(type_name[obj][1])[i])
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
              .attr("stroke", "#b8776c")
              .attr("stroke-dasharray", "4")
              // .style("opacity", style["secondary_node"][1])
              .attr("transform", "translate(" + x_transform / 2 + "," + y_transform / 2 + ")")

            //外半径坐标轴
            var gr_outer = svg.append("g")
              .attr("class", "r axis outer")
              .attr("transform", "translate(" + x_transform / 2 + "," + y_transform / 2 + ")");

            gr_outer.append("circle")
              .attr("r", radius * 1.2)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-dasharray", "4")
              // .style("opacity", style["secondary_node"][1])
              .attr("transform", "translate(" + x_transform / 2 + "," + y_transform / 2 + ")");

            var temp1 = x_transform - radius / 2
            var temp2 = y_transform + radius * 1.4

            //添加当前气泡环形图下放文字
            svg.append("text")
              .text(name)
              .style("font-size", 40)
              .style('font-family','微软雅黑')
              .style("fill", '#000000')
              .attr("text-align", "center")
              .attr("transform", "translate(" + temp1*0.9 + "," + temp2 + ")");

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
              .on("mouseover", function (d, i) {
                // d3.select(this).select("path")
                //     .attr("d",path0);

                d4.select(this).select("path").attr("fill", "#ad4646")
                var x = event.pageX;
                var y = event.pageY;
                svg.append("text")
                  .attr("id", "tooltip")
                  .attr("x", x-400)
                  .attr("y", y-100)
                  .attr("text-anchor", "middle")
                  .attr("font-family", "sans-setif")
                  .attr("font-size", "15px")
                  .attr("font-weight", "bold")
                  .attr("fill", "black")
                  .text(( Math.round(d[2] * 1000 ) / 100 ).toString());
              })
              .on("mouseout", function (d, i) {
                d3.select("#tooltip").remove();
              })
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
                // console.log((style["secondary_node"][0] / 2), 'rrr')
                return Math.round(Math.random()*5+5);
                // return 30
              })
              .attr("fill", function (d, i) {
                return color[i];
              })
            //        .style("opacity", style["secondary_node"][1])

            svg.selectAll("point")
              .data(data_outer)
              .enter()
              .append("circle")
              .attr("class", "point")
              .attr("id", function (d) {
                return d[3]
              })
              .on("mouseover", function (d, i) {
                // d3.select(this).select("path")
                //     .attr("d",path0);
                d4.select(this).select("path").attr("fill", "#ad4646")
                var x = event.pageX;
                var y = event.pageY;
                svg.append("text")
                  .attr("id", "tooltip")
                  .attr("x", x-400)
                  .attr("y", y-100)
                  .attr("text-anchor", "middle")
                  .attr("font-family", "sans-setif")
                  .attr("font-size", "15px")
                  .attr("font-weight", "bold")
                  .attr("fill", "black")
                  .text(d[2]);
              })
              .on("mouseout", function (d, i) {
                d3.select("#tooltip").remove();
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

                return Math.round(Math.random()*5+5);
              })
              .attr("fill", function (d, i) {
                return color[i];
              })
            // .style("opacity", style["secondary_node"][1])
          }

          //绘制中心气泡饼图
          function center_tree(bubbledata) {


            var color = ['#cbdcdf', '#a5bbbf', '#cce8e2', '#ce848f', '#EFBAC0',
              '#F9F3E1', '#EDE9BF', '#F7E7E0', '#F7DDC0',
              '#F9BCB2', '#ea8991', '#cbdcdf', '#a5bbbf',
              '#cce8e2', '#ce848f', '#EFBAC0', '#F9F3E1',
              '#EDE9BF', '#F7E7E0', '#F7DDC0'];

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

            //绘制气泡饼图
            function bubblepie(data) {

              var packwidth = radius * 0.8 * 2
              var packheight = radius * 0.8 * 2

              var pack = d4.pack()
                .size([packwidth, packheight])
                .padding(1.5);

              var num, pid;
              var root = d4.hierarchy({children: data})
                .sum(function (d) {
                  return d.count;
                })
                .each(function (d) {
                  if (d.parent == null) {
                    num = d.value
                  }
                  if (id = d.data.name) {
                    var id
                    d.id = id;
                    d.class = id;
                    pid = num / (d.value);
                    d.colorPick = pid > 100 ? 5 : (pid > 50 ? 4 : (pid > 10 ? 3 : (pid > 2 ? 2 : 1)));
                  }
                });

              var node = svg.append("g").attr("id", "pie_g")
                .selectAll(".node")
                .data(pack(root).leaves())
                .enter().append("g")
                .attr("class", "node")
                .attr("id", function (d) {
                  return name + '__' + d.id
                })
                .attr("transform", function (d) {
                  DrawPie(d)
                  var x = d.x + x_transform - radius * 0.8
                  var y = d.y + y_transform - radius * 0.8
                  return "translate(" + x + "," + y + ")";
                })
                .on('click',function(){
                  console.log('气泡图点击咯。。。')
                  // console.log(d3.select(this).attr('id'))
                  that.$bus.$emit('getPieId',d3.select(this).attr('id'))
                })
                .on('mouseenter',(d,i)=>{
                  console.log('hover生效。。。')
                  // console.log(d,i)
                  var x = event.offsetX;
                  var y = event.offsetY;
                  tooltip
                    .html(()=>{
                      let res=`${d.class} </br>`
                      // console.log(d)
                      return res
                    })
                    .style("left", x + "px")
                    .style("top", y + 20 + "px")
                    .style("opacity", 1);
                })
                .on("mouseleave", function (d, i) {
                  tooltip.style('opacity',0);
                });


              function DrawPie(data) {
                // console.log(data)
                var radius = data.r

                var g = svg.select("#" + name + '__' + data.id)
                  .append("g")

                var pie = d4.pie()
                  .sort(null)
                  .value(function (d) {
                    return d.value;
                  });

                var path = d4.arc()
                  .outerRadius(radius)
                  .innerRadius(radius / 2);

                var path0 = d4.arc()
                  .outerRadius(radius + 10)
                  .innerRadius((radius + 10) / 2);

                var label = d4.arc()
                  .outerRadius(radius - 20)
                  .innerRadius((radius - 20) / 2);

                var label0 = d4.arc()
                  .outerRadius(radius + 20)
                  .innerRadius((radius + 20) / 2);

                var test=[100,50]
                var arc = g.selectAll(".arc")
                  .data(pie(data.data.piedata))
                  // .data(pie(data.data.piedata))
                  .enter().append("g")
                  .attr("class", "arc")


                arc.append("path")
                  .attr("d", path)
                  .attr("class", function (d) {
                    return d.data.area
                  })
                  .attr("fill", function (d, i) {
                    return color[i];
                  })


                arc.on("mouseover", function (d, i) {
                  // d3.select(this).select("path")
                  //     .attr("d",path0);
                  d4.select(this)
                    .select("path")
                    .attr("d",path0)

                  var x = event.pageX;
                  var y = event.pageY;

                  svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", x-400)
                    .attr("y", y-100)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-setif")
                    .attr("font-size", "15px")
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .text(d.data.value + "%");
                });

                arc.on("mouseout", function (d, i) {
                  d3.select("#tooltip").remove();
                  d4.select(this).select(".positive").attr("fill", '#cbdcdf')
                  d4.select(this).select(".negative").attr("fill", '#a5bbbf')
                  d4.select(this)
                    .select("path")
                    .attr("d",path)
                });


                // arc.append("text")
                //   .attr("transform", d => {
                //     return "translate(" + path.centroid(d) + ")";
                //   })
                //   .text(function (d) {
                //     return d.data.value;
                //   })
                //   .style("font-size", radius / 8)

              }
            }
            bubblepie(bubbledata[name])

          }
          center_tree(bubbledata)
          polar_plot()

        }

        let name = []

        for (var obj in type_name) {
          name.push(obj)
        }
        // console.log(name)
        if (len == '1') {
          draw_charts(name, type_name, width * 0.5, height * 0.5, width * 0.23, bubbledata)
        }
        else if (len == '2') {
          draw_charts(name[0], type_name, width * 0.3, height * 0.6, width * 0.13, bubbledata)
          draw_charts(name[1], type_name, width * 0.6, height * 0.35, width * 0.13, bubbledata)
        } else if (len == '3') {
          draw_charts(name[0], type_name, width * 0.2, height * 0.28, width * 0.105, bubbledata)
          draw_charts(name[1], type_name, width * 0.7, height * 0.28, width * 0.105, bubbledata)
          draw_charts(name[2], type_name, width * 0.45, height * 0.7, width * 0.105, bubbledata)
        }
        else if (len == '4') {
          draw_charts(name[0], type_name, width * 0.3, height * 0.25, width * 0.09, bubbledata)
          draw_charts(name[1], type_name, width * 0.6, height * 0.25, width * 0.09, bubbledata)
          draw_charts(name[2], type_name, width * 0.3, height * 0.75, width * 0.09, bubbledata)
          draw_charts(name[3], type_name, width * 0.6, height * 0.75, width * 0.09, bubbledata)
        }
        else if (len == '5') {
          draw_charts(name[1], type_name, width * 0.18, height * 0.25, width * 0.09, bubbledata)
          draw_charts(name[2], type_name, width * 0.45, height * 0.25, width * 0.09, bubbledata)
          draw_charts(name[3], type_name, width * 0.18, height * 0.75, width * 0.09, bubbledata)
          draw_charts(name[4], type_name, width * 0.45, height * 0.75, width * 0.09, bubbledata)
          draw_charts(name[5], type_name, width * 0.7, height * 0.25, width * 0.09, bubbledata)
        }
      },
    },
    mounted() {
      // Readcsv.Read_barData()
    },
    watch: {
      control2: function (newV, oldV) {
        axios({
          url: "http://127.0.0.1:5000/get_data/bubble_chart",
        }).then(() => {
          console.log("this is test2")
          this.draw_constellation(this.type_name,this.bubble_data);

        });
      },
      // control2: function () {
      //   // console.log(this.control2.Parameter, 'this')
      //   // console.log(this.series_Data, 'this');
      //   Readcsv.Read_scatter_right();
      //   // console.log(this.click_num, 'ssss')
      // },
      // sca_right: function () {
      //   this.data_right = [];
      //   for (let i = 0; i < this.sca_right.length; i++) {
      //     let right = [];
      //     right.push(parseFloat(this.sca_right[i]) * 100);
      //     right.push(parseFloat(this.control2.Parameter[i]));
      //     right.push(this.click_num)
      //     this.data_right.push(right)
      //   }
      //   // console.log(this.data_right,'this')
      //   this.series_Data.data[0].data.push(this.data_right[0]);
      //   this.series_Data.data[1].data.push(this.data_right[1]);
      //   this.series_Data.data[2].data.push(this.data_right[2]);
      //   this.series_Data.data[3].data.push(this.data_right[3]);
      //   this.series_Data.data[4].data.push(this.data_right[4]);
      //   // console.log(this.series_Data.data,'this')
      //   this.draw_scatter();
      // }
    },
    computed: {
      control2() {
        return this.$store.getters.get_control2;
      },
      // sca_right() {
      //   return this.$store.getters.get_sca_right;
      // },
      // click_num() {
      //   return this.$store.getters.get_click_num;
      // },
      // series_Data(){
      //   return this.$store.getters.get_series_Data;
      // }
    },
  }
</script>

<style scoped>
  .bottom_1 {
    width: 21.3vw;
    height: 100%;
    /*border: 3px;*/
    border-top: 7px solid rgb(255, 255, 255);
    /*border-bottom: 6px solid rgb(255,255,255);*/
    /*border-right: 3px solid rgb(255,255,255);*/
    border-left: 5px solid rgb(255, 255, 255);
  }

  #scatter_chart {
    width: 100%;
    height: 98%;
    padding-right: 2%;
    /*margin-right: 2%;*/
    /*margin-top: 2%;*/
  }

  h4 {
    font-family: 微软雅黑;
    background-color: rgb(242, 242, 242);
    padding: 3px 3px;
    text-align: center;
    border-bottom: 2px solid rgb(200, 200, 200);
  }


  #barchart {
    width: 98%;
    height: 95%;
    position: center;
    /*margin-top: 2%;*/
  }

</style>
