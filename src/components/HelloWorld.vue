<template>
  <div class="hello">
    vuex的num：{{num}}
    <button @click="addNum">点击修改</button>
    vuex的count{{count}}
    <input v-model="count">
    <div>getter:  {{reverseMsg}}</div>
    <input type="text" v-model="aa">
    <button @click="clickreverse">点击修改2</button>
    <div>
      <p v-for="(item,index) in name" :key="index">{{item.value +' -- '+item.name}}</p>
      <button @click="getName">点击</button>
    </div>
  </div>
</template>

<script>
import apiData from '@/api/apiData';
import { mapMutations,mapActions,mapGetters,mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      aa:''
    }
  },
  //将要使用的全局state放置到组件内部使用，v-model的内容将其获取和设置分开来
  computed:{
    // count:{
    //   get(){
    //     return this.$store.state.count
    //   },
    //   set(val){
    //     return this.$store.commit('changeCount',val)
    //   }
    // }
    
    ...mapState({
       count:'count',
       name:'name',
       num:'num'
    }),
    ...mapGetters(['reverseMsg'])
 
  },
  async mounted(){
    console.log(this);
    
    const params = {
      dict_name:'audit_status'
    }
    let result  = await apiData.banner.getData(params)
    console.log(result);
    console.log(this);
    
  },
  methods:{
    ...mapMutations(['addNum']),   
    clickReverse(){ 
      this.aa =  this.$store.getters.clickreverse(this.aa)
    },
    ...mapActions(['getName'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
