<!-- 个人信息 -->
<template>
  <div>
    <TabberTop :title="title"></TabberTop>
    <van-form @submit="onSubmit">
      <van-field name="headUrl" label="头像">
        <template #input>
          <img class="custom-headurl" :src="headUrl" alt srcset />
        </template>
      </van-field>
      <van-field
        v-model="nickName"
        name="nickName"
        label="昵称"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field name="mobile" label="手机号码">
        <template #input>
          <van-button color="#914CDF" plain size="small" @click="changeMobile" native-type="button">更换</van-button>
          <span class="tel">{{ mobile }}</span>
        </template>
      </van-field>
      <van-field name="gender" label="性别">
        <template #input>
          <van-radio-group v-model="gender" direction="horizontal">
            <van-radio name="1" checked-color="#914CDF">男</van-radio>
            <van-radio name="2" checked-color="#914CDF">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="birth"
        label="生日"
        placeholder="点击选择时间"
        @click="showPicker = true"

        />
        <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            v-model="currentDate"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
        </van-popup>
        <van-field
            v-model="sign"
            name="sign"
            label="个性签名"
            placeholder="请输入个性签名"
        />

        <div class="button_bottom">
            <van-button color="linear-gradient(to right,#914CDF,#914CDF)" type="info" native-type="submit">
            保存
            </van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import TabberTop from "@/components/TabberTop";
import AresList from '@/assets/ares.js' 
export default {
  data() {
    return {
      title: "个人信息",
      headUrl: "",
      nickName: "",
      showPicker: false,
      gender: null,
      mobile:null,
      sign:'',
      birth:'',
      currentDate:new Date(),
      minDate: new Date(1950, 0, 1),   
      maxDate:new Date(),
      arrList:AresList,
      member_no:null
    };
  },
  components: {
    TabberTop
  },
  computed:{
    mobileNew(){
      return this.$route.query.mobileNew || '';
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
      this.getPersonMsg();    
  },
  methods: {
    changeMobile(){
      this.$router.push({
        path:'/changeMobile',
        query:{mobile:this.mobile}
      })
    },
    async getPersonMsg(){
       const member = JSON.parse(localStorage.getItem('member'))
       console.log(member);     
       const {gender,mobile,headUrl,sign,nickName,member_no,birth} = member
       this.gender = gender
       this.mobileNew?this.mobile = this.mobileNew : this.mobile = mobile
       this.headUrl = headUrl
       this.birth = birth
       this.sign = sign
       this.nickName = nickName
       this.member_no = member_no
    },
    async onSubmit(values) {     
      values.member_no = this.member_no
      values.mobile = this.mobile
      values.headUrl = this.headUrl
      values.birth = this.birth
      //values.gender = this.gender
      console.log(values);  
      const res = await this.$api.my.updateMyMessage(values)
      console.log(res);
      if(res.code == 200){
        this.$toast('修改成功')
        localStorage.setItem('member',JSON.stringify(res.data))
        this.$router.push({
          push:'/my'
        })
        console.log(res.data);     
      }

    },
    onConfirm(time) {
      console.log(time);
      this.birth = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() 
      this.showPicker = false;
    },

  }
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
/deep/ .van-field__control--custom {
  flex-direction: row-reverse;
}
/deep/ .van-cell__title {
  display: flex;
  align-items: center;
}
/deep/ .van-field__control {
  text-align: right;
}
.tel {
  padding-right: 0.2rem;
}
.custom-headurl {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
}

.button_bottom{
    margin-top: 3rem;
    text-align: center;
}
/deep/ .van-button--normal { 
    width: 2rem;
    height: 0.60rem;
}
</style>