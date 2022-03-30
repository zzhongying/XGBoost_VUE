<template>
  <div id="tree_menu">
    <el-scrollbar style="height: 90%">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        ref="tree"
        :props="defaultProps"
        @check-change="handleCheckChange"
      >
      </el-tree>
    </el-scrollbar>

  </div>
</template>

<script>
  import Readcsv from '../ToolJs/Readcsv'
  import * as d3 from "d3";
  import store from "../store";
  export default {
    name: "tree_menu",
    components:{

    },
    data() {
      return {
        data:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        checked:null
      };

    },
    methods: {
      handleCheckChange() {
        // let res = this.$refs.tree.getCheckedKeys()
        let res = this.$refs.tree.getCheckedNodes()
        this.checked = res
      },
      change1(){
        Readcsv.Read_treeMenu("tree_menu")
      }
    },
    mounted() {
       Readcsv.Read_treeMenu();
      let res = this.$refs.tree
      res.setCheckedKeys([3]);
      // this.checked = res.getCheckedKeys();

    },
    watch:{
      checked:function () {
      // console.log(this.checked)
        this.$store.commit('set_centerData',this.checked)
      },
      center_data:function () {

      },
      tree_menu:function () {
        this.data = this.tree_menu
      }
    },
    computed:{
      center_data () {
        return this.$store.getters.get_centerData;
      },
      tree_menu(){
        return this.$store.getters.get_treeMenu;
      }
    }
  }
</script>

<style scoped>
  #tree_menu {
    height: 100%;
    width: 100%;
  }

  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }

  /deep/ .el-tree {
    /*height: 350px;*/
    background: white;
    min-width: 100%;
    display: inline-block;
  }
  /deep/ .el-tree-node__content:hover {
    color: red;
  }
</style>
