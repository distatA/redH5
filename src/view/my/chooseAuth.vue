<!-- 红人认证选择 -->
<template>
  <div class="redConfirm">
    <TabberTop :title="title"></TabberTop>  
    <div class="list_wrap">
        <div class="left_content">
            <img src="../../assets/images/authentication.png" alt="" srcset="">
            个人认证
        </div>
        <div class="right_content" > 
              <span v-if="flag==1">{{status}}</span>     
              <img @click="changeSelect(0)" class="img-icon" :src="code==1 ? activeIcon : inactiveIcon" />    
        </div>
    </div>
    <div class="list_wrap">
        <div class="left_content">
            <img src="../../assets/images/authentication.png" alt="" srcset="">
            企业认证
        </div>
        <div class="right_content" > 
              <span v-if="flag==2">{{status}}</span>
              <img @click="changeSelect(1)" class="img-icon" :src="code==2 ?  activeIcon : inactiveIcon " />    
        </div>
    </div>
    <div class="button_bottom">
        <van-button color="linear-gradient(to right,#914CDF,#914CDF)" @click="authNow">立即认证</van-button>
    </div>
  </div>
</template>

<script>
import TabberTop from "@/components/TabberTop";
export default {
  data() {
    return {
        code:null,
        title:'红人认证',     
        activeIcon: require('../../assets/images/dot.png'),
        inactiveIcon: 'https://firsthouse.oss-cn-shanghai.aliyuncs.com/120/F1DD83C1BC024540AA07EF97E43AC8D7.png',
    };
  },
  components: {
    TabberTop
  },
  computed:{
      flag(){   
        return this.$route.query.flag 
      },
      status(){
          return this.$route.query.status
      },

  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
      this.changeCode()
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods:{
      changeCode(){
          this.code = this.flag
      },
      changeSelect(index){
          console.log(index);
          
          if(!this.status){
            if(index == 0){
                if(this.code != 1){
                    this.code = 1
                }
                
                }else if(index == 1){
                    console.log(this.code);
                    
                    if(this.code != 2){
                        this.code = 2
                    }
                }
            }      
      },
      async authNow(){
          
          const flag = this.code
          let path = ''
          if(flag == 1){
              path = '/redConfirmP'
          }else if(flag == 2){
              path = '/redConfirmC'
          }else {
              this.$toast('请选择认证类型')
              return
          }
          
          this.$router.push({path:`${path}`,query : {
                  type:this.status
              }})  
          
      }
  }
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.redConfirm{
  background-color: #F9F9F9;
  height: 100vh;
}
.list_wrap{
    background-color: #ffffff;
    height: 1.2rem;
    display: flex;
    align-items: center;
    
    .left_content{
        flex: 1;
        font-size: 0.32rem;
        height: 100%;
        display: flex;
        align-items: center;
        img{
            width: 0.4rem;
            height: 0.4rem;
            margin-left: 0.44rem;
            margin-right: 0.3rem;
        }
    }
    .right_content{
        width: 2.9rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .img-icon{
            width: 0.4rem;
            height: 0.4rem;
            margin-left: 0.2rem;
            margin-right: 0.5rem;
        }
    }
}
.button_bottom{
    margin-top: 4rem;
    text-align: center;
}
/deep/ .van-button--normal { 
    width: 2rem;
    height: 0.60rem;
}

</style>