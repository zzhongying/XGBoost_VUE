<template>
    <div v-resize:[arguments]='value'>
      <div_titles></div_titles>
      <div class="div1">
        <div_left></div_left>
        <div_center></div_center>
        <div_right></div_right>
      </div>
      <div class="div2">
        <bottom_1></bottom_1>
        <bottom_2></bottom_2>
      </div>
    </div>
<!--  <exchange></exchange>-->
</template>
<script>

  import div_left from './components/controls_dataanalysis';
  import div_center from './components/feature_analysis';
  import div_titles from './components/Title';
  import div_right from './components/featurer_comparison';
  import bottom_1 from './components/iteration';
  import bottom_2 from './components/confusion_matrix&sunrain';
  import exchange from "./components/exchange";
  import * as d4 from '../public/d3'
  export default {
    components: {
      div_center,
      div_left,
      div_titles,
      div_right,
      bottom_1,
      bottom_2,
      // exchange

    },
    mounted() {
      console.log(d4,'sss')
    },
    directives:{   //局部自定义指令
      copy:{

      },
      fouces:{
        bind:function (el) {

        },
        inserted:function (el) {
          el.focus()
        },
        updated:function (el) {

        },
        componentUpdated(el){

        },
        unbind(el){

        }
      }
    }

  }
</script>
<style lang="scss">
  .div1 {
    display: flex;
    flex-wrap: nowrap;
    height: 62vh;
  }

  .div2 {
    height: 32vh;
    display: flex;
    flex-wrap: nowrap;
    /*margin: 0.2% 0 0 0;*/
  }

  .bottom_1 h4{
      margin: 0;
  }

  /*.div1,.div2{*/
  /*  background-color: #f5f5f5;*/
  /*}*/
</style>
