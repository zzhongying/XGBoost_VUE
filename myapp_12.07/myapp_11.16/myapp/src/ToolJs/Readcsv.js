import * as d3 from 'd3'
import store from '../store'
import axios from 'axios'

const readcsv = {
  Read_pieData: function (path) {
    // d3.json('Data/'+path+'.json', (data) =>{
    //        store.commit('set_pieData',data);
    //    })
    // axios.get('http://127.0.0.1:5000/getdata/recallRate').then((res) => {
    //   store.commit('set_pieData', res.data)
    // }).catch((error) => {
    //   console.log(error)
    // })
  },
  Read_barData: function () {
    // d3.json('Data/' + path + '.json', (data) => {
    //   store.commit('set_barData', data)
    // })
    axios.get('http://127.0.0.1:5000/getdata/featureImportance').then((res) => {
      store.commit('set_barData', res.data)
    }).catch((error) => {
      console.log(error)
    })
  },
  Read_hotData: function () {
    // d3.json('Data/' + path + '.json', (data) => {
    //   store.commit('set_hotData', data)
    // })
    axios.get('http://127.0.0.1:5000/getdata/hotmap').then((res) => {
      store.commit('set_hotData', res.data)
    }).catch((error) => {
      console.log(error);
    })
  },
  Read_control2: function (path) {
    d3.json('Data/' + path + '.json', (data) => {
        store.commit('set_control2', data)
      }
    )
  },
  Read_lineData: function (path) {
    // d3.json('Data/' + path + '.json', (data) => {
    //     store.commit('set_lineData', data)
    //   }
    // )
    axios.get('http://127.0.0.1:5000/getdata/evalModel/PR').then((res) => {
      store.commit('set_lineData', res.data)
    }).catch((error) => {
      console.log(error);
    })
  },
  Read_treeMenu: function (path) {
    axios.get('http://127.0.0.1:5000/getdata/modelStruct/tree_menu2').then((res) => {
      store.commit('set_treeMenu', res.data)
    }).catch((error) => {
      console.log(error);
    })
  },
  Read_lit_bar: function (path) {
    d3.json('Data/' + path + '.json', (data) => {
        store.commit('set_lit_bar', data)
      }
    )
  },
  Read_selector: function (path) {
    axios.get('http://127.0.0.1:5000/getdata/learningCurve').then((res) => {
      store.commit('set_selector', res.data)
    }).catch((error) => {
      console.log(error);
    })

  },
  // Read_centerData: function (params) {
  //   axios({
  //     url: 'http://127.0.0.1:5000/center-top/starMap',
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     data: params,
  //     responseType: 'json',
  //   }).then(res => {
  //     store.commit('set_centerDataTree', res.data)
  //
  //   }).catch(err => {
  //     console.log(err, "Read_centerData");
  //   });
  // },
  Read_tooltip: function (params) {
    axios({
      url: 'http://127.0.0.1:5000/get_data/count',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: params,
      responseType: 'json',
    }).then(res => {
      store.commit('set_tooltip_data', res.data)
    }).catch(err => {
      console.log(err, 'Read_tooltip');
    });
  },
  Read_sca_data: function () {
    // axios.get('http://127.0.0.1:5000/getdata/calculate_coordinates').then((res) => {
    //   store.commit('set_sca_data', res.data)
    // }).catch((error) => {
    //   console.log(error);
    // })
  },
  Read_color_data: function () {
    d3.json('all_tree.json', function (error, data) {
      store.commit('set_color_tree_data', data)
    })
  },
  Read_samplebar_data: function () {
    axios.get("http://127.0.0.1:5000/getdata/data_info/data1").then((res) => {
      store.commit('set_sample_bar', res.data)
      console.log(res.data, 'czp')
    }).catch((error) => {
      console.log(error);
    })
  },
  Read_sca_location: function () {
    // axios.get("").then((res) => {
    //   store.commit('set_sca_location_data', res.data)
    // }).catch((error) => {
    //   console.log(error);
    // })
    d3.json('sca_out_location.json', function (error, data) {
      store.commit('set_sca_location_data', data)
    })
  },
  Read_dataset_show: function (path) {
    d3.json('datashow_' + path + '.json', function (error, data) {
      store.commit('set_dataShow', data)
    })
  },
  Read_scatter_right: function () {
    // d3.json('scatter_right.json',function (error,data) {
    //     store.commit('set_sca_right',data.data)
    //   })
    axios.get("http://127.0.0.1:5000/getdata/recallRate").then((res) => {
      store.commit('set_sca_right', res.data.data)
    }).catch((error) => {
      console.log(error);
    })
  },
  Read_paopaotu: function () {
    axios.get("http://127.0.0.1:5000/get_data/bubble_chart").then((res) => {
      store.commit('set_bubble_data', res.data)

    }).catch((error) => {
      console.log(error);
    })
  },
  Read_xiao_paopao:function () {
    axios.get("http://127.0.0.1:5000/center-top/starMap").then((res) => {
      store.commit('set_bubble_data_1', res.data)
      console.log(1231232)
    }).catch((error) => {
      console.log(error);
    })
  }
}
export default readcsv
