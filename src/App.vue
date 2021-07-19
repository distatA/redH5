<template>
  <div id="app">
    <router-view v-if="istrue"></router-view>
    <meta name="referrer" content="never">
    <div class="empty"></div>
  </div>
</template>

<script>

import Tabbar from'./components/Tabbar'


export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      istrue:true
    }
  },
  components: {
    Tabbar
  },
  watch:{

  },
  methods:{
    reload(){
      this.istrue = false
      this.$nextTick(function(){
        this.istrue = true
      })
    }
  }
} 
</script>

<style lang="less">
.container{
font-family: PingFangSC-Regular, PingFang SC;

}
    *{
      margin: 0;
      padding: 0;
    }
     a{
        text-decoration:none;
        color:#000;
    }

</style>
