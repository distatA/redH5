<template>
  
  <div>
  <TabberTop :title="title"></TabberTop>
  <div v-html="data" class="content"></div>

  </div>
</template>

<script>
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";
export default {
data(){
  return{
    data:'',
    title:'用户协议'
  }
},
mounted(){
this.getMobileCode()
},
methods:{
     async getMobileCode() {
      const params = { id:6 };
      var result = await apiData.userAgreement.getUserAgreement(params);
      if (result.code == 200) {
       this.data= result.data.content 
      } else {
        Toast(result.message);
      }
    },
},
 components: {
    TabberTop,
  },
}
</script>

<style scoped lang="less">
.content{
  text-align: justify;
  padding: 10px 20px;
}

</style>
