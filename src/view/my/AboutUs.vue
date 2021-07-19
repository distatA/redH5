<!-- 关于我们 -->
<template>
  <div>
    <TabberTop :title="title"></TabberTop>
    <div class="content_wrap">
        <div class="img">
            <img src="@/assets/images/icon.png" alt="" srcset="">
        </div>
        <van-cell-group>
         <van-cell v-for="(item,index) in listCell" :key="index" :title="item.title" :value="item.value" />
        </van-cell-group>
        <div class="version">
           当前版本 v{{version}}
        </div>
    </div>
  </div>
</template>

<script>
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";

export default {
  data() {
    return {
      title: "关于我们",
    
      listCell:[{
          title:'发行单位',value:""
          },{
          title:'商务合作',value:""    
          },{
          title:'联系电话',value:""    
          },{
          title:'公司地址',value:""    
          }],
        version:null
    };
  },
  components: {
    TabberTop
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
      this.getAboutUs()
  },
  methods:{
      async getAboutUs(){
          const res = await apiData.my.aboutUs()
          this.listCell[0].value = res.data.issuer
          this.listCell[1].value = res.data.business
          this.listCell[2].value = res.data.phone
          this.listCell[3].value = res.data.address
          this.version = res.data.version
      }
  }
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
    .img{
        height: 3.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            height: 2rem;
        }
    }
    /deep/ .van-cell__title{
        flex: 2;
    }
    /deep/ .van-cell__value{
        flex: 3;
    }
    .version{
        color:#717171;
        font-size: 0.24rem;
        text-align: center;
        margin-top: 0.76rem;
    }
</style>