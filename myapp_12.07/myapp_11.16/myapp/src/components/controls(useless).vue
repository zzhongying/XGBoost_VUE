<!--<template>-->
<!--  <div id="div_left">-->
<!--    <h4>CONTROLS</h4>-->
<!--    <div id="control">-->

<!--      <vue-grid style="width: 21vw;border-top:3px solid rgb(255,255,255);border-bottom:3px solid rgb(255,255,255);border-right: 6px solid rgb(255,255,255);border-left: 6px solid rgb(255,255,255);height:99%;">-->
<!--        <vue-cell width="12of12" style="background-color: #fdfdfd;margin-top: 0.2%;font-size:  15px"> ☀ Parameter:-->
<!--        </vue-cell>-->
<!--        <vue-cell width="5of12"><label style="font-size: smaller"  >Eta</label></vue-cell>-->
<!--        <vue-cell width="7of12"><input type="range" min="0" max="1.0" step="0.1" class="input" v-model.number="eta_"/><label>{{eta_}}</label></vue-cell>-->
<!--        <vue-cell width="5of12"><label style="font-size: smaller"   >Max depth:</label></vue-cell>-->
<!--        <vue-cell width="7of12"><input type="range" min="0" max="100" class="input" v-model.number="maxdepth"/><label>{{-->
<!--          maxdepth }}</label></vue-cell>-->
<!--        <vue-cell width="5of12"><label style="font-size: smaller"  >Min child weight:</label></vue-cell>-->
<!--        <vue-cell width="7of12"><input type="range" min="0" max="100" class="input"-->
<!--                                       v-model.number="minchildweight"/><label>{{ minchildweight }}</label></vue-cell>-->
<!--        <vue-cell width="5of12"><label style="font-size: smaller"  >Gamma:</label></vue-cell>-->
<!--        <vue-cell width="7of12"><input type="range" min="0" max="100" class="input" v-model.number="gamma_"/><label>{{-->
<!--          gamma_ }}</label></vue-cell>-->
<!--        <vue-cell width="5of12"><label style="font-size: smaller">Subsample:</label></vue-cell>-->
<!--        <vue-cell width="7of12"><input type="range" min="0" max="1" class="input" step="0.1" v-model.number="subsample_"/><label>{{-->
<!--          subsample_ }}</label></vue-cell>-->
<!--&lt;!&ndash;        固定值去掉&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12" style="font-size: smaller">lambda</vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="text" value="1"/></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12" style="font-size: smaller">alpha</vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="text" value="0"/></vue-cell>&ndash;&gt;-->

<!--&lt;!&ndash;        <vue-cell width="12of12" style="background-color: #fff;margin-top: 0.2%;font-size:  15px"> <hr/>☀ Master node&ndash;&gt;-->
<!--&lt;!&ndash;        </vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller"  >Tree structure node size:</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="range" min="2" max="10" step="0.1" class="input"&ndash;&gt;-->
<!--&lt;!&ndash;                                       v-model.number="fnode_tree_size"/><label>{{fnode_tree_size}}</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller"  >Attr node size:</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="range" min="2" max="10" step="0.1" class="input"&ndash;&gt;-->
<!--&lt;!&ndash;                                       v-model.number="fnode_attr_size"/><label>{{fnode_attr_size}}</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller"  >Node opacity:</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="range" min="0" max="1" step="0.1" class="input"&ndash;&gt;-->
<!--&lt;!&ndash;                                       v-model.number="fnode_opacity"/><label>{{fnode_opacity}}</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller"  >Tree structure node color:</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="color" v-model.number="root_node_color"/><label>{{root_node_color}}</label>&ndash;&gt;-->
<!--&lt;!&ndash;        </vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller"  >Attr node color:</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="color" v-model.number="Leaf_node_color"/><label>{{Leaf_node_color}}</label>&ndash;&gt;-->
<!--&lt;!&ndash;        </vue-cell>&ndash;&gt;-->

<!--&lt;!&ndash;        <vue-cell width="12of12" style="background-color: #fff;margin-top: 0.2%;font-size:  15px"> <hr/>☀ Secondary Node</vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller"   >Node size:</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="range" min="0" max="5" step="0.1" class="input" v-model.number="node_size"/><label>{{node_size}}</label>&ndash;&gt;-->
<!--&lt;!&ndash;        </vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller"  >Node opacity:</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="range" min="0" max="1" step="0.1" class="input"&ndash;&gt;-->
<!--&lt;!&ndash;                                       v-model.number="node_opacity"/><label>{{node_opacity}}</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller">Node stroke:</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="color" v-model.number="node_stroke"/><label>{{node_stroke}}</label>&ndash;&gt;-->
<!--&lt;!&ndash;        </vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller">Node color:</label></vue-cell>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <vue-cell width="7of12"><input type="color" v-model.number="node_color"/><label>{{node_color}}</label></vue-cell>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;        <vue-cell width="12of12" style="background-color: #fff;margin-top: 0.2%;font-size:  15px"> <hr/>☀ Edge</vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller"  >Edge width:</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="range" min="2" max="10" step="0.1" class="input" v-model.number="edge_width"/><label>{{edge_width}}</label>&ndash;&gt;-->
<!--&lt;!&ndash;        </vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller"  >Edge opacity:</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="range" min="0" max="1" step="0.1" class="input"&ndash;&gt;-->
<!--&lt;!&ndash;                                       v-model.number="edge_opacity"/><label>{{edge_opacity}}</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="5of12"><label style="font-size: smaller">Edge color:</label></vue-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <vue-cell width="7of12"><input type="color" v-model.number="edge_color"/><label>{{edge_color}}</label></vue-cell>&ndash;&gt;-->
<!--        <key_button @sub="submit"></key_button>-->
<!--      </vue-grid>-->
<!--    </div>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->
<!--  import {VueGrid, VueCell} from 'vue-grd';-->
<!--  import Readcsv from '../ToolJs/Readcsv'-->
<!--  import * as d3 from 'd3'-->
<!--  import key_button from "./key_button";-->
<!--  export default {-->
<!--    name: 'div_left',-->
<!--    data() {-->
<!--      return {-->
<!--        //显示默认值-->
<!--        eta_: '0.3',-->
<!--        maxdepth: '6',-->
<!--        minchildweight: '1',-->
<!--        gamma_: '0',-->
<!--        subsample_: '1',-->
<!--        timer: null,-->
<!--      }-->
<!--    },-->

<!--    components: {-->
<!--      VueGrid,-->
<!--      VueCell,-->
<!--      key_button-->
<!--    },-->

<!--    mounted() {-->

<!--    },-->

<!--    watch: {-->
<!--      control2: function (newV, oldV) {-->

<!--      },-->
<!--      control1: function () {-->
<!--        let now_data = this.control1-->
<!--        this.eta_ = now_data[0];-->
<!--        this.maxdepth = now_data[1];-->
<!--        this.minchildweight = now_data[2];-->
<!--        this.gamma_ = now_data[3];-->
<!--        this.subsample_ = now_data[4];-->
<!--        // console.log(now_data)-->
<!--        // console.log(this.eta_)-->
<!--      }-->
<!--    },-->
<!--    computed: {-->
<!--      control2() {-->
<!--        return this.$store.getters.get_control2;-->
<!--      },-->
<!--      control1() {-->
<!--        return this.$store.getters.get_control1-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      submit() {-->
<!--        let num = this.$store.getters.get_click_num+1;-->
<!--        this.$store.commit('set_click_num',num)-->
<!--        let deliver = {-->
<!--          "Parameter": [this.eta_, this.maxdepth, this.minchildweight, this.gamma_, this.subsample_],-->
<!--          "master_node":[ this.fnode_tree_size,this.fnode_attr_size, this.fnode_opacity, this.root_node_color, this.Leaf_node_color],-->
<!--          "secondary_node":[ this.node_size,  this.node_opacity, this.node_stroke, this.node_color],-->
<!--          "edge":[ this.edge_width, this.edge_opacity, this.edge_color],-->
<!--          "count": this.count++-->
<!--        }-->
<!--        this.$store.commit('set_control2', deliver);-->
<!--        this.$store.commit('set_recordData',deliver);-->
<!--        Readcsv.Read_sca_data();-->
<!--        Readcsv.Read_hotData()-->
<!--        // console.log(this.$store.state.control2)-->
<!--      },-->

<!--      goToPay: function (param1, param2) {-->
<!--        this.$nextTick(function () {-->
<!--          if (this.timer) {-->
<!--            clearTimeout(this.timer);-->
<!--          }-->
<!--          this.timer = setTimeout(() => {-->
<!--            this.$refs.getFocus.focus();-->

<!--          }, 100);-->
<!--        });-->
<!--      },-->
<!--    },-->
<!--  }-->

<!--</script>-->

<!--<style scoped lang="scss">-->

<!--  #div_left {-->
<!--    padding-right:3px;-->
<!--    width:21.5%;-->
<!--    border-top: 3px solid rgb(255, 255, 255);-->
<!--    border-left: 6px solid rgb(255, 255, 255);-->
<!--    border-right: 6px solid rgb(255, 255, 255);-->
<!--    /*border-bottom: 6px solid rgb(255, 255, 255);*/-->

<!--  }-->

<!--  input[type=range] {-->
<!--    -webkit-appearance: none;-->
<!--    /*width: 5vw;*/-->
<!--    height: 5px;-->
<!--    background-color: rgb(217, 217, 217);-->
<!--    /*background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;*/-->
<!--    border-radius: 10px;-->
<!--  }-->

<!--  input[type='range']::-webkit-slider-thumb {    //拖动块的样式-->
<!--    -webkit-appearance: none;-->
<!--    border: 3px solid rgb(165,187,191);-->
<!--    height: 14px;-->
<!--    width: 14px;-->
<!--    border-radius: 8px;-->
<!--    background: #ffffff;-->
<!--    cursor: pointer;-->
<!--  }-->
<!--  input[type='range']::-moz-range-thumb {-->
<!--    border: 3px solid #fff;-->
<!--    height: 7px;-->
<!--    width: 7px;-->
<!--    border-radius: 8px;-->
<!--    background: rgb(165,187,191);-->
<!--    cursor: pointer;-->
<!--  }-->

<!--  input[type='color'] {-->
<!--    width: 5vw;-->
<!--    height: 2vh;-->
<!--    /*border-radius: 5px;*/-->
<!--  }-->

<!--  input[type='color']::-webkit-color-swatch-wrapper {-->
<!--    padding: 0;-->
<!--  }-->

<!--  input[type='color']::-webkit-color-swatch {-->
<!--    border: 0;-->
<!--  }-->

<!--  input[type='text'] {-->
<!--    width: 9vw;-->
<!--    height: 2vh;-->
<!--    border: 0;-->
<!--    /*background:linear-gradient(to right,#fff ,#00416A);*/-->
<!--    /*border-block-color:#baccd9;*/-->
<!--    background-color: #CCDDDF;-->
<!--  }-->

<!--  h4{-->
<!--    font-family: 微软雅黑;-->
<!--    background-color: rgb(242,242,242);-->
<!--    padding: 3px 3px;-->
<!--    text-align: center;-->
<!--    border-bottom: 2px solid rgb(200,200,200);-->
<!--  }-->



<!--</style>-->
