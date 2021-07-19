<!--  -->
<template>
  <div class="changeMobile">
    <TabberTop :title="title"></TabberTop>
    <div class="content_wrap">
        <img class="imgUrl" src="https://firsthouse.oss-cn-shanghai.aliyuncs.com/120/C86569DA320C4EC9AD395E03E1830666.png" alt="" srcset="">
        <span class="mobileShow">您的手机号码：{{ mobileOld }}</span>
        <span class="tips">更换手机号码后，该平台所有有关手机号码信</span>
    </div>    
        <van-form @submit="onSubmit">
            <van-field name="mobile" v-model="mobile" placeholder="请输入新手机号码" label="新手机号码">
                <template #button>
                    <span v-if="show" @click="sendMsg(mobile)">发送验证码</span>
                    <div v-if="!show"><van-count-down @finish="finish" :time="time" format="ss 秒" /></div>
                </template>
            </van-field>
            <van-field
              v-model="code"
              name="code"
              label="验证码"
              placeholder="请输入验证码"
              :rules="[{ required: true, message: '请输入验证码' }]"
            />
            <div class="button_bottom">
              <van-button color="linear-gradient(to right,#914CDF,#914CDF)" type="info" native-type="submit">
              确定
              </van-button>
            </div>
        </van-form>    
        
  </div>
</template>

<script>
import TabberTop from "@/components/TabberTop";
export default {
  data() {
    return {
        title:'绑定手机号',
        time:60 * 1000,
        show:true,
        mobile:null,
        code:null
    };
  },
  components: {
    TabberTop
  },
  computed:{
    mobileOld(){
     return this.$route.query.mobile;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods:{ 
      async onSubmit(values) {  
          const res = await this.$api.my.valityMobile(values)
          console.log(res);         
          if(res.code == 200){
            this.$toast('更改绑定成功')
            setTimeout(()=>{
              this.$router.push({
              path:'/personMes',
              query:{ mobileNew:values.mobile }
            })
            },500)
          }
      },
         /**
     * 发送验证码
     */
    async sendMsg(mobile){
      console.log(mobile);
      
      if(mobile && mobile!=this.mobileOld){
        if((/^1[3456789]\d{9}$/.test(this.mobile))){
           this.show = !this.show;
        let params = {
          mobile:this.mobile
        }
        const res = await this.$api.sendCode(params)
        }else{
           this.$toast('手机号有误')
        }
      }else if(mobile && mobile==this.mobileOld){
           this.$toast('请勿重复绑定相同号码')
      }else { 
           this.$toast('请填写手机号')
      }
     
    },
    /**倒计时结束 */
    finish() {
      this.$toast('倒计时结束');
      this.show = !this.show
    },
  }
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.changeMobile{
    height: 100vh;
    background-color: white;
}
.content_wrap{
    padding: 0 .4rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    .imgUrl{
        margin-top: 0.38rem;
        height: 2.2rem;
        width: 2.2rem;
    }
    .mobileShow{
        font-size: 0.36rem;
        margin-top: 0.56rem;
    }
    .tips{
        font-size: 0.24rem;
        color: #9A9A9A;
        margin-top: 0.26rem;
    }
   
  
}
    /deep/ .van-form{
        margin-top: 0.6rem;
    }
    /deep/ .van-cell{
        padding:0.24rem 0.4rem;
    }
      /deep/ .van-field__body{
        flex-direction: column;
        align-items: flex-end;
        .van-field__control{
            text-align: right;
        }
    }
    /deep/ .van-field__button {
        font-size:0.24rem;
        color: #914CDF;
        margin-top: 0.42rem;
    }
    .button_bottom{
      margin-top: 2.7rem;
      text-align: center;
    }
    /deep/ .van-button--normal { 
    width: 2rem;
    height: 0.60rem;
    }
</style>