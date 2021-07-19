<!-- 红人个人认证 -->
<template>
  <div class="personConfirm">
    <TabberTop :title="title"></TabberTop>
    <div class="titleTip">
      <span>为确保您账号的安全及正常使用，依据国家相关法律法规，您需要进行实名认证，感谢您的理解和支持。
        </span> </div>
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="area"
        :value="address"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          :columns-num="2"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <van-field
        v-model="name"
        name="name"
        label="真实姓名"
        placeholder="请填写证件上的真实姓名"
        :rules="[{ required: true, message: '请填写必填项' }]"
      />
      <van-field
        v-model="id_no"   
        name="id_no"
        label="身份证"
        placeholder="请填写证件上的证件号码"
        :rules="[{ required: true, message: '请填写必填项' }]"
      />
      <van-field name="card" label="上传证件照">
        <template #input> 
          <!-- :before-delete="beforeDelete" -->
          <van-uploader :max-count="2" v-model="card" :after-read="afterRead"  />
        </template>
      </van-field>
      <van-field
        v-model="mobile"
        name="mobile"
        label="手机号码"
        placeholder="请输入你的手机号"
        :rules="[{ required: true, message: '请填写必填项' }]"
      />
      <van-field
        v-model="sendCode"
        center
        clearable
        name="sendCode"
        label="验证码"
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请填写必填项' }]"
      >
        <template #button>
          <van-button size="small" @click="sendMsg" native-type="button" color="#914CDF" plain >
            <div v-if="show" >发送验证码</div>
            <div v-if="!show"><van-count-down @finish="finish" :time="time" format="ss 秒" /></div>
          </van-button>
        </template>
      </van-field>
      <van-field
        v-model="company_name"
        name="company_name"
        class="onlyNo"
        label="公司名称"
        placeholder="请输入公司名称"
        :rules="[{ required: false, message: '请填写必填项' }]"
      /> 
      <van-field name="card_image"  label="上传名片">
        <template #input>
          <van-uploader :max-count="1" :after-read="afterChange"  v-model="card_image" />
        </template>
      </van-field>
      <div class="button_bottom">
            <van-button color="linear-gradient(to right,#914CDF,#914CDF)" type="info" native-type="submit">
              提交
            </van-button>
       </div>
    </van-form>
  </div>
</template>

<script>
import apiData from "@/api/apiData";
import TabberTop from "@/components/TabberTop";
import {mapState} from 'vuex'
import AresList from '@/assets/ares.js'
export default {
  data() {
    return {
      time:60 * 1000,
      show:true,
      uploader:[],
      title:'个人认证',
      card:[],  //存储上传的图片
      // front_card:[],
      // reverse_card:[],
      name:'',
      id_no:'',
      mobile:'',
      sendCode:'',
      company_name:'',
      card_image:[],
      showArea: false,
      address: '',
      areaList:AresList
    };
  },
  components: {
    TabberTop
  },
  computed: {
    member_no(){
      const {member_no} = JSON.parse(localStorage.getItem('member'))
      return member_no
    } ,
    type(){
      console.log(this.$route);
      
      const {type} = this.$route.query
      if(type){
        return 1
      }else{
        return 2
      }
    }
  }
    
  ,
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getMes();
  },
  methods: {
    /**获得个人认证信息 */
    async getMes(){
      if(this.type==1){
        const params = {
          member_no:this.member_no,
          type:1
        }
        const res = await this.$api.my.details(params)
        console.log('res',res);
        const {name,id_no,mobile,sendCode,company_name,front_card,reverse_card,province,city,card_image} = res.data
        this.name = name
        this.id_no = id_no
        this.mobile = mobile
        this.sendCode = sendCode
        this.company_name = company_name
        this.card.push({
          url:front_card
        })
        this.card.push({
          url:reverse_card
        })
        this.address = province +'/'+city
        this.card_image.push({
          url:card_image
        })
      }
    },
    /**证件照上传 */
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let params = new FormData(); //创建form对象
      params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      const res = await apiData.upLoad(params);
      let head = "https://firsthouse.oss-cn-shanghai.aliyuncs.com/";   
      const length = this.card.length - 1
      this.card[length].url= `${head + res.data}`
      console.log(this.card);
    },
    /**名片上传 */
    async afterChange(file){
      // 此时可以自行将文件上传至服务器
      let params = new FormData(); //创建form对象
      params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      const res = await apiData.upLoad(params);
      let head = "https://firsthouse.oss-cn-shanghai.aliyuncs.com/";
      const length = this.card_image.length - 1
      console.log(length);
      console.log(this.card_image);
      
      this.card_image[length].url = `${head + res.data}`
    },
    /**
     * 删除之前
     */
    // beforeDelete(file,detail){
    //   console.log(detail.index);
    //   const index = detail.index
    //   this.card.splice(index,index+1);
    // },
    async onSubmit(values) {
       console.log("submit", values);
      if(values.card.length<2){
        this.$toast('请上传2张证件照')
      }else{
        //debugger;
        const image = values.card_image[0].url
        values.card_image = image
        values.front_card = values.card[0].url
        values.reverse_card = values.card[1].url
        values.member_no = this.member_no
        values.open_store= 0,//0不开店 1开店
        values.type= 1,//1个人 2企业
        values.type_name= '其它',//开店类型
        values.province = this.province
        values.city = this.city
        values.is_office = 0
        console.log(typeof(values)); 
        console.log("submit2", values); 
        const res = await apiData.my.savePeopleAuth(values)
        if(res.code == 200){
          this.$toast('修改成功，等待审核！')
          setTimeout(()=>{
            this.$router.push({
              path:'/my'
            })
          },500)
        }
        
        console.log(res);      
      }
     
     
    },
    finish() {
      this.show = !this.show
      this.time = 60 * 1000
    },
    
    /**
     * 发送验证码
     */
    async sendMsg(){
      if(this.show){
        if(this.mobile){
        this.show = !this.show;
        let params = {
          mobile:this.mobile
        }
        const res = await apiData.sendCode(params)
        }else {
          this.$toast('请填写手机号')
        }
      }
      
     
    },
    /**确定注册地址 */
    onConfirm(values) {
      console.log(values);
      this.province = values[0].name
      this.city = values[1].name
      this.address = values.map((item) => item.name).join('/');
      this.showArea = false;
    },
  }
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.personConfirm{
  background-color: #F9F9F9;
  height: 100vh;
}
.titleTip {
  height: 0.96rem;
  padding:0.1rem 0.36rem 0 0.42rem;
  line-height:0.34rem;
  font-size: 0.24rem;
  color: #914CDF;
}
/deep/ .van-field__body{
  margin-left: 0.22rem;
}
/deep/ .van-field__error-message{
  margin-left: 0.22rem;
}
/deep/ .onlyNo .van-field__label > span::before{
  display: none;
}
/deep/ .van-field__label > span::before {
  display: inline-block;
  height: 0.32rem;
  content: "";
  width: 0.32rem;
  background: url("~@/assets/images/sure.png") no-repeat;
  background-size: 20px 16px;
}

.button_bottom{
    margin-top: 0.5rem;
    text-align: center;
}
/deep/ .van-button--normal { 
    width: 2rem;
    height: 0.60rem;
}
</style>