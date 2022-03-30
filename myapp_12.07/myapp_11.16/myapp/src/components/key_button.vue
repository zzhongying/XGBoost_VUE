<template>
  <button class="push_button red" href="#" @click="submit" id="but">SUBMISSION</button>
</template>

<script>
  export default {
    name: "key_button",
    props: ['deliver'],
    methods: {
      submit() {
          this.$emit('sub')
      }
    }
  }
</script>

<style scoped>
  .push_button {
    position: relative;
    margin-left: 30%;
    margin-top: 5%;
    background-color: rgb(253, 252, 252);
    border: 2px solid #686767;
    border-radius: 5px;
    width: 30%;
    height: 8%;
    font-size: 15px;
    padding: 1% 1%;
    text-align: center;
    color: #686767;
    text-decoration: none;
    font-family: 微软雅黑;
    display: block;
  }

  .push_button:hover{
    background-color:rgb(242,242,242);
  }
  #but{
    font-family: 微软雅黑;
    font-size: 12px;
  }

  /*.push_button:before {*/
  /*  background: #f0f0f0;*/
  /*  position: absolute;*/
  /*  content: "";*/
  /*  left: -6px;*/
  /*  right: -6px;*/
  /*  top: -6px;*/
  /*  bottom: -10px;*/
  /*  z-index: -1;*/
  /*}*/

  /*.push_button:active {*/
  /*  !*-webkit-box-shadow:0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset;*!*/
  /*  top: 5px;*/
  /*}*/

  /*.push_button:active:before {*/
  /*  top: -11px;*/
  /*  bottom: -5px;*/
  /*  content: "";*/
  /*}*/


</style>
