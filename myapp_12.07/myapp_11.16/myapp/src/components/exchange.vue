<template>
  <div id="exchange_but">
  <el-switch
    v-model="value1"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-text="Bubble"
    inactive-text="Scatter"
  />
  </div>
</template>

<script>
  export default {
    name: "exchange",
    data() {
      return {
        value1: true,
      }
    },
    methods:{
    },
    computed:{
      exchange_state(){
        return this.$store.getters.get_exchange_state;
      }
    },
    mounted() {
      this.$store.commit('set_exchange_state',this.value1);
    },
    watch:{
      value1:function (oldv,newv) {
          // console.log(oldv);
          this.$store.commit('set_exchange_state',oldv);

      },
      exchange_state:function () {
      console.log(this.exchange_state,'eeee')
      }
    }
  }
</script>

<style scoped>
  #exchange_but {
    position: absolute;
    top: 10%;
    left: 2%;
    height: 20px;
    width: 229px;
    /*background-color: #5e5e5f;*/
  }
</style>
