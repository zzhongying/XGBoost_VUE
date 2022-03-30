import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)  //安装插件

//创建对象
export default new Vuex.Store({

  state: {   //保存状态
    hot_data: null,
    pie_data: null,
    bar_data: null,
    tree_data: {},
    control1: null,
    control2: {},
    litteTree_data: null,
    line_data: [],
    center_data: null,
    record_data: [],
    tree_menu: null,
    lit_bar_data: null,
    selector: ['1', '2', '3'],
    data_size: '221M',
    data_rows: '1110',
    number_attributes: '15',
    correct_identification: '1100',
    control_data: null,
    click_num: 0,
    sca_data: null,
    centerDataTree: null,
    tooltip_data: null,
    color_tree_data: null,
    sample_bar: null,
    sca_location_data: null,
    exchange_state: true,
    dataShow: [],
    sca_right: null,
    bubble_data: null,
    bubble_data_1:null,
    series_Data: {
      "data": [
        {
          type: 'scatter',
          name: "malware",
          // data: [this.data_right[0]],
          data: [[85, 100, 'a']],
          xAxisIndex: 0,
          yAxisIndex: 0,
          //encode: { tooltip: [0, 1] },
          markLine: {
            symbol: "none",               //去掉警戒线最后面的箭头
            label: {
              position: "end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
            },
            data: [{
              silent: true,             //鼠标悬停事件  true没有，false有
              lineStyle: {               //警戒线的样式  ，虚实  颜色
                type: "dashed",
                color: "black",
              },
              xAxis: 0          // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
            }]
          },
          symbolSize: 8,
          itemStyle: {
            borderColor: 'white',
            color: (p) => {
              if (p.data[2] == 'a') {
                return 'transparent'
              } else {
                return 'rgb(118,141,209)'
              }

            }
          },
          datasetIndex: 1,
          tooltip: {
            trigger: 'item',
            formatter: (params) => {

              return params.seriesName + "</br>" + params.marker + params.data[0].toString() + "  "
                + params.data[1].toString() + "</br>"
                + params.marker + params.data[2].toString();
            },
            show: true
          },
        },
        {
          type: 'scatter',
          tooltip: {
            trigger: 'item',
            formatter: (params) => {

              return params.seriesName + "</br>" + params.marker + params.data[0].toString() + "  "
                + params.data[1].toString() + "</br>"
                + params.marker + params.data[2].toString();
            },
            show: true
          },
          // data: [this.data_right[1]],
          data: [[85, 100, 'a']],
          name: "spam",
          xAxisIndex: 1,
          yAxisIndex: 1,
          encode: {tooltip: [0, 1]},
          markLine: {
            symbol: "none",               //去掉警戒线最后面的箭头
            label: {
              position: "end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
            },
            data: [{
              silent: true,             //鼠标悬停事件  true没有，false有
              lineStyle: {               //警戒线的样式  ，虚实  颜色
                type: "dashed",
                color: "black",
              },
              xAxis: 0          // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
            }]
          },
          symbolSize: 8,
          itemStyle: {
            borderColor: 'white',
            color: (p) => {
              if (p.data[2] == 'a') {
                return 'transparent'
              } else {
                return 'rgb(167,214,145)'
              }

            }
          },
          datasetIndex: 1
        },
        {
          type: 'scatter',
          tooltip: {
            trigger: 'item',
            formatter: (params) => {

              return params.seriesName + "</br>" + params.marker + params.data[0].toString() + "  "
                + params.data[1].toString() + "</br>"
                + params.marker + params.data[2].toString();
            },
            show: true
          },
          name: "benign",
          // data: [this.data_right[2]],
          data: [[85, 100, 'a']],
          xAxisIndex: 2,
          yAxisIndex: 2,
          encode: {tooltip: [0, 1]},
          markLine: {
            symbol: "none",               //去掉警戒线最后面的箭头
            label: {
              position: "end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
            },
            data: [{
              silent: true,             //鼠标悬停事件  true没有，false有
              lineStyle: {               //警戒线的样式  ，虚实  颜色
                type: "dashed",
                color: "black",
              },
              xAxis: 0          // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
            }]
          },
          symbolSize: 8,
          itemStyle: {
            borderColor: 'white',
            color: (p) => {
              if (p.data[2] == 'a') {
                return 'transparent'
              } else {
                return 'rgb(251,211,121)'
              }

            }
          },
          datasetIndex: 1
        },
        {
          type: 'scatter',
          name: "Defacement",
          tooltip: {
            trigger: 'item',
            formatter: (params) => {

              return params.seriesName + "</br>" + params.marker + params.data[0].toString() + "  "
                + params.data[1].toString() + "</br>"
                + params.marker + params.data[2].toString();
            },
            show: true
          },
          // data: [this.data_right[3]],
          data: [[85, 100, 'a']],
          xAxisIndex: 3,
          yAxisIndex: 3,
          encode: {tooltip: [0, 1]},
          markLine: {
            symbol: "none",               //去掉警戒线最后面的箭头
            label: {
              position: "end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
            },
            data: [{
              silent: true,             //鼠标悬停事件  true没有，false有
              lineStyle: {               //警戒线的样式  ，虚实  颜色
                type: "dashed",
                color: "black",
              },
              xAxis: 0          // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
            }]
          },
          symbolSize: 8,
          itemStyle: {
            borderColor: 'white',
            color: (p) => {
              if (p.data[2] == 'a') {
                return 'transparent'
              } else {
                return 'rgb(241,133,133)'
              }
            }
          },
          datasetIndex: 1
        },
        {
          type: 'scatter',
          name: "phishing",
          tooltip: {
            trigger: 'item',
            formatter: (params) => {

              return params.seriesName + "</br>" + params.marker + params.data[0].toString() + "  "
                + params.data[1].toString() + "</br>"
                + params.marker + params.data[2].toString();
            },
            show: true
          },
          // data: [this.data_right[4]],
          data: [[85, 100, 'a']],
          xAxisIndex: 4,
          yAxisIndex: 4,
          encode: {tooltip: [0, 1]},
          markLine: {
            symbol: "none",               //去掉警戒线最后面的箭头
            label: {
              position: "end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
            },
            data: [{
              silent: true,             //鼠标悬停事件  true没有，false有
              lineStyle: {               //警戒线的样式  ，虚实  颜色
                type: "dashed",
                color: "black",
              },
              xAxis: 0          // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
            }]
          },
          symbolSize: 8,
          itemStyle: {
            borderColor: 'white',
            color: (p) => {
              if (p.data[2] == 'a') {
                return 'transparent'
              }
                // if(p.data[2] == this.click_num){
                //   return 'black'
              // }
              else {
                return 'rgb(143,205,229)'
              }

            }
          },
          datasetIndex: 1
        },
      ]
    }
  },

  //定义方法，通过mutation修改state中的数据，即动作
  mutations: {
    set_exchange_state: function (state, data) {
      state.exchange_state = data;
    },
    set_bubble_data_1:function(state,data){
      state.bubble_data_1 = data;
    },
    set_sca_right: function (state, data) {
      state.sca_right = data;
    },
    set_dataShow: function (state, data) {
      state.dataShow = data;
    },
    set_sca_location_data: function (state, data) {
      state.sca_location_data = data;
    },
    set_bubble_data: function (state, data) {
      state.bubble_data = data;
    },

    set_series_Data: function (state, data) {

    },


    set_tooltip_data: function (state, data) {
      state.tooltip_data = data;
    },
    set_color_tree_data: function (state, data) {
      state.color_tree_data = data;
    },
    set_centerDataTree: function (state, data) {
      state.centerDataTree = data;
    },
    set_hotData: function (state, data) {
      state.hot_data = data;
    },
    set_pieData: function (state, data) {
      state.pie_data = data;
    },
    set_barData: function (state, data) {
      state.bar_data = data;
    },
    set_treeData: function (state, data) {
      state.tree_data = data;
    },
    set_control1: function (state, data) {
      state.control1 = data;
    },
    set_control2: function (state, data) {
      state.control2 = data || {};
    },
    set_littleTree: function (state, data) {
      state.litteTree_data = data;
    },
    set_lineData: function (state, data) {
      state.line_data.push(data)
    },
    set_centerData: function (state, data) {
      state.center_data = data
    },
    set_recordData: function (state, data) {
      state.record_data.push(data)
    },
    set_treeMenu: function (state, data) {
      state.tree_menu = data
    },
    set_lit_bar: function (state, data) {
      state.lit_bar_data = data
    },
    set_selector: function (state, data) {
      state.selector.push(data)
    },
    set_click_num: function (state, data) {
      state.click_num = data
    },
    set_sample_bar: function (state, data) {
      state.sample_bar = data
    },
  },

  actions: {},

  getters: {
    get_exchange_state: state => {
      return state.exchange_state;
    },
    get_dataShow: state => {
      return state.dataShow;
    },
    get_sca_location_data: state => {
      return state.sca_location_data;
    },
    get_series_Data: state => {
      return state.series_Data;
    },
    get_sca_right: state => {
      return state.sca_right;
    },
    get_bubble_data: state => {
      return state.bubble_data;
    },
    get_bubble_data_1:state => {
      return state.bubble_data_1;
    },

    get_tooltip_data: state => {
      return state.tooltip_data;
    },
    get_centerDataTree: state => {
      return state.centerDataTree;
    },
    get_hotData: state => {
      return state.hot_data;
    },
    get_pieData: state => {
      return state.pie_data;
    },
    get_barData: state => {
      return state.bar_data;
    },
    get_treeData: state => {
      return state.tree_data;
    },
    get_control1: state => {
      return state.control1;
    },
    get_control2: state => {
      return state.control2;
    },

    get_littleTree: state => {
      return state.litteTree_data;
    },
    get_lineData: state => {
      return state.line_data;
    },
    get_centerData: state => {
      return state.center_data;
    },
    get_recordData: state => {
      return state.record_data;
    },
    get_treeMenu: state => {
      return state.tree_menu;
    },
    get_lit_bar: state => {
      return state.lit_bar_data;
    },
    get_selector: state => {
      return state.selector;
    },
    get_click_num: state => {
      return state.click_num;
    },
    get_color_tree_data: state => {
      return state.color_tree_data;
    },
    get_sample_bar: state => {
      return state.sample_bar;
    }
  },

  modules: {}
})
