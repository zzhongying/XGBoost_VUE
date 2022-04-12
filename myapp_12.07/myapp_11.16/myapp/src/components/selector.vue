<template>
  <diV id="select">
    <div id="choose" @click="mydo">
      <svg style="width: 30px;height: 30px;padding-left:50%" t="1629278721682" class="icon" viewBox="0 0 1024 1024"
           version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2083" width="200" height="200">
        <path
          d="M148.7872 57.4464h177.152c64.9216 0 118.0672 53.1456 118.0672 118.0672v295.2192H148.7872C83.8656 470.7328 30.72 417.5872 30.72 352.5632v-177.152C30.72 110.592 83.8656 57.4464 148.7872 57.4464z m0 531.3536h295.2192v295.2192c0 64.9216-53.1456 118.0672-118.0672 118.0672h-177.152C83.8656 1001.984 30.72 948.9408 30.72 883.9168v-177.152C30.72 641.9456 83.8656 588.8 148.7872 588.8z m0 0M768.7168 559.2064L562.0736 346.7264c-23.6544-17.7152-35.4304-53.1456-35.4304-82.6368s11.776-59.0848 35.4304-82.6368L686.08 57.4464C733.2864 10.24 810.0864 10.24 851.3536 57.4464l124.0064 124.0064c23.6544 23.6544 35.4304 53.1456 35.4304 82.6368s-11.776 59.0848-35.4304 82.6368L768.7168 559.2064z m0-478.208c-17.7152 0-29.4912 5.9392-41.3696 17.7152l-123.904 124.0064c-11.776 11.776-17.7152 23.6544-17.7152 41.3696s5.9392 29.4912 17.7152 41.3696l165.2736 165.2736 165.2736-165.2736c11.776-11.776 17.7152-23.6544 17.7152-41.3696s-5.9392-29.4912-17.7152-41.3696L809.984 98.7136c-11.776-11.776-23.552-17.7152-41.2672-17.7152z m0 0"
          p-id="2084"></path>
        <path
          d="M562.0736 588.8h295.2192c64.9216 0 118.0672 53.1456 118.0672 118.0672v177.152c0 64.9216-53.1456 118.0672-118.0672 118.0672h-177.152c-64.9216 0-118.0672-53.1456-118.0672-118.0672V588.8z m0 0"
          p-id="2085"></path>
      </svg>
    </div>
    <div id="main" v-if="show">
      <yibiao v-for="(item,index) in data" :key="index" :msg="item" @click.native="touch(index)"></yibiao>
    </div>
  </diV>
</template>

<script>
  import yibiao from "./yibiao";
  import $ from 'jquery'

  export default {
    name: "selector",
    components: {yibiao},
    data() {
      return {
        // data: [[1, 100], [1, 100], [1, 100], [1, 100]],
        data:[],
        show: 0
        // data:[1,2,3,4]
      }
    },
    methods: {
      touch(index) {
        this.$parent.draw_arc(index);

      },

      mydo() {
        this.show = !this.show
      }
    },
    computed: {
      selector() {
        return this.$store.getters.get_selector   //调用store/index.js中getters下的get_selector函数
      }
    },
    watch:{
      selector:function () {
        let main = this.selector;
        for (let i=0;i<main.length;i++){
          this.data[i] = main[i].select
        }
        console.log(this.data[0].length,'ssss')
      }


    }

  }
</script>

<style scoped>
  #select {
    height: 100%;
    width: 100%;
    background-color: white;
    z-index: 100 !important;
  }

  #main {
    background-color: white;
  }

  #choose {
    /*height: 100%;*/
    background-color: white;
  }
</style>
