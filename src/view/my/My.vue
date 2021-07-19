<!-- 我的页面 -->
<template>
  <div>
    <div class="head_wrap">
      <div class="backTop">
        <div class="content_wrap">
          <div class="content_title">用户中心</div>
          <img
            @click="getDetail('personMes')"
            class="content_img"
            :src="loginman.headUrl"
            alt=""
            srcset=""
          />
          <div class="content_name">
            <mallki class-name="mallki-text" :text="loginman.nickName" />
            <img
              :src="
                loginman.gender == 1
                  ? require('@/assets/images/man.png')
                  : require('@/assets/images/woman.png')
              "
              alt=""
              srcset=""
            />
          </div>
          <div class="content_city">{{ loginman.city }}</div>
          <div class="content_sign">
            {{
              loginman.sign ? loginman.sign : "编辑个性签名，展现自己的态度。"
            }}
          </div>
          <div class="content_scal">
            <div
              class="content_scal_box"
              @click="getDetail(item.checkDetail)"
              v-for="(item, index) in dataName"
              :key="index"
            >
              <p class="content_scal_boxT">{{ item.num }}</p>
              <p class="content_scal_boxB">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="backBottom">
        <!-- 余额 , 红人认证 , 地址管理 , 我的收藏 -->
        <div class="person_wrap">
          <div
            class="person_div"
            v-for="(itemPer, indexPer) in dataPer"
            :key="'per' + indexPer"
          >
            <div @click="getDetail(itemPer.checkDetail)">
              <img :src="itemPer.imgUrl" alt="" srcset="" />
              <p>{{ itemPer.content }}</p>
            </div>
          </div>
        </div>
        <div class="meua_wrap">
          <div
            class="meua_content"
            @click="getDetail(itemMeua.checkDetail)"
            v-for="(itemMeua, indexMeua) in dataMeua"
            :key="'meua' + indexMeua"
          >
            <img :src="itemMeua.imgUrl" alt="" srcset="" />
            <p>{{ itemMeua.content }}</p>
          </div>
        </div>
      </div>
      <Tabbar :selected="selected"></Tabbar>
    </div>
  </div>
</template>
<script>
import Tabbar from "@/components/Tabbar";
import apiData from "@/api/apiData";
import { mapState, mapMutations, mapActions } from "vuex";
import Mallki from '@/components/Mallki'
export default {
  data() {
    return {
      selected: "my",
      dataName: [
        {
          name: "我的粉丝",
          num: "0",
          checkDetail: "myFans",
        },
        {
          name: "我的关注",
          num: "0",
          checkDetail: "myAttention",
        },
        {
          name: "我的社区",
          num: "0",
          checkDetail: "myCommunity",
        },
      ],
      dataPer: [
        {
          imgUrl: require("../../assets/images/money.png"),
          content: "账户余额",
          checkDetail: "getWalletDetail",
        },
        {
          imgUrl: require("../../assets/images/redPerson.png"),
          content: "红人认证",
          checkDetail: "redsCertification",
        },

        {
          imgUrl: require("../../assets/images/myComplain.png"),
          content: "我的投诉",
          checkDetail: "myComplain",
        },
        {
          imgUrl: require("../../assets/images/myCollect.png"),
          content: "我的收藏",
          checkDetail: "myCollection",
        },
      ],
      dataMeua: [
        {
          imgUrl: require("../../assets/images/pay.png"),
          content: "支付设置",
          checkDetail: "paySet",
        },
        {
          imgUrl: require("../../assets/images/clear.png"),
          content: "清除缓存",
          checkDetail: "cleanStorage",
        },
        {
          imgUrl: require("../../assets/images/about.png"),
          content: "关于我们",
          checkDetail: "aboutUs",
        },
      ],
      loginman: {
        headUrl:
          "https://firsthouse.oss-cn-shanghai.aliyuncs.com/120/A6244AFB72C64FE3AF94FB21374D3DB4.jpg",
        nickName: "未登录",
        city: "未知",
        gender: 1,
      }, //登录者的信息
      userInfo: "", //用户信息
    };
  },
  components: {
    Tabbar,
    Mallki
  },
  computed: {
    member_no() {
      return JSON.parse(localStorage.getItem("member"))
        ? JSON.parse(localStorage.getItem("member")).member_no
        : "";
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getCode(decodeURI(window.location.href));
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("member")) || "";
  },
  methods: {
    ...mapActions(["setMemer"]),
    /**
     * 获取code
     */
    getCode(url) {
      let arr = [];
      let code = "";
      let state = "";
      let login = localStorage.getItem("member");
      if (!login) {
        if (url.split("?").length > 1) {
          console.log(url);
          arr = url.split("?")[1];
          code = arr.split("&")[0].split("=")[1];
          state = arr.split("&")[1].split("=")[1];
          const params = {
            code,
            state,
          };
          this.getMyMsg(params);
        } else {
        }
      } else {
        this.loginman = JSON.parse(localStorage.getItem("member"));
        this.$api.member_no = this.loginman.member_no;
        this.$api.nickName = this.loginman.nickName;
        this.$api.headUrl = this.loginman.headUrl;
        this.getDetails();
      }
    },
    async getDetail(e) {
      if (e === "getWalletDetail") {
        //余额
        this.getWalletDetail;
        this.$router.push({
          path: "/balance",
        });
      } else if (e === "redsCertification") {
        //红人认证
        /**查询是否进行红人认证 */
        const params = {
          member_no: this.member_no,
        };
        const res = await apiData.my.authStatus(params);
        if (res.data.people) {
          //个人认证
          this.$router.push({
            path: "/chooseAuth",
            query: { status: res.data.people, flag: 1 },
          });
        } else if (res.data.company) {
          //企业认证
          this.$router.push({
            path: "/chooseAuth",
            query: { status: res.data.company, flag: 2 },
          });
        } else {
          //未认证
          this.$router.push({
            path: "/chooseAuth",
            query: { status: "", flag: 0 },
          });
        }
      } else if (e === "myComplain") {
        //支付设置
        this.$router.push({
          path: "/myComplain",
        });
      } else if (
        e == "myFans" ||
        e == "myAttention" ||
        e == "aboutUs" ||
        e == "personMes" ||
        e == "myCollection" ||
        e == "paySet" ||
        e == "myCommunity"
      ) {
        /**
         * 我的粉丝 我的关注 关于我们 个人信息 我的收藏
         * 判断是否登录,否则跳转到登录页面
         */
        if (this.userInfo.member_no) {
          this.$router.push({
            path: `/${e}`,
          });
        } else {
          this.$router.push({
            path: `/login`,
          });
        }
      } else if (e == "cleanStorage") {
        //清除缓存
        this.$dialog
          .confirm({
            message: "清除缓存将跳转登录页面，是够继续?",
          })
          .then(() => {
            localStorage.clear();
            apiData.member_no = "";
            apiData.nickName = "";
            apiData.headUrl = "";
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
            this.$toast("已取消清除缓存");
          });
      }
    },
    /**
     * 获取用户信息
     */
    async getMyMsg(params) {
      let result = await apiData.banner.getData(params);
      console.log("result", result);
      this.loginman = result.data;
      localStorage.setItem("member", JSON.stringify(result.data));
      this.$api.member_no = result.data.member_no;
      this.$api.nickName = result.data.nickName;
      this.$api.headUrl = result.data.headUrl;
      this.$store.dispatch("setMemer", result.data.member_no);
      this.getDetails();
    },
    async getDetails() {
      const param = { member_no: this.$api.member_no };
      let res = await apiData.my.getDetail(param);
      this.dataName[0].num = res.data.fanCount;
      this.dataName[1].num = res.data.followCount;
      this.dataName[2].num = res.data.noteCount;
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.head_wrap {
  background-color: #f9f9f9;
  height: calc(100vh - 40px);
}
.backTop {
  background-image: url("https://firsthouse.oss-cn-shanghai.aliyuncs.com/120/18D9A1FA922D44C6BE86EAD51877A508.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.content_wrap {
  display: flex;
  height: 7.5rem;
  align-items: center;
  flex-flow: column;
  color: white;
  .content_title {
    font-size: 0.36rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.5rem;
    margin: 0.62rem 0 0.5rem 0;
  }
  .content_img {
    width: 1.6rem;
    height: 1.6rem;
    margin-bottom: 0.32rem;
    border-radius: 50%;
  }
  .content_name {
    font-size: 0.32rem;
    line-height: 0.44rem;
    margin-bottom: 0.14rem;
  }
  .content_city {
    font-size: 0.28rem;
    font-weight: 400;
    line-height: 0.4rem;
    margin-bottom: 0.32rem;
  }
  .content_sign {
    line-height: 0.34rem;
    font-size: 0.24rem;
    margin-bottom: 0.66rem;
  }
  .content_scal {
    display: flex;
    width: 100%;
    .content_scal_box {
      flex: 1;
      text-align: center;
      .content_scal_boxT {
        font-size: 0.28rem;
        line-height: 0.4rem;
      }
      .content_scal_boxB {
        font-size: 0.24rem;
        line-height: 0.34rem;
      }
    }
  }
}
.backBottom {
  width: 7.1rem;
  margin: auto;
  top: -0.8rem;
  position: relative;
}
.person_wrap {
  display: flex;
  height: 1.6rem;
  background: white;
  border-radius: 0.1rem;
  justify-content: space-around;
  .person_div {
    text-align: center;
    img {
      height: 0.5rem;
      padding-top: 0.26rem;
      padding-bottom: 0.18rem;
    }
  }
}
.meua_wrap {
  margin-top: 0.18rem;
  .meua_content {
    display: flex;
    padding-left: 0.18rem;
    padding-right: 0.2rem;
    background-color: white;
    display: flex;
    align-items: center;
    &:not(:last-child) {
      border-bottom: 1px solid rgba(242, 242, 242, 1);
    }
    &:first-of-type {
      border-top-left-radius: 0.1rem;
      border-top-right-radius: 0.1rem;
    }
    &:last-of-type {
      border-bottom-left-radius: 0.1rem;
      border-bottom-right-radius: 0.1rem;
    }
    line-height: 0.78rem;
    img {
      width: 0.4rem;
      height: 0.38rem;
      margin-left: 0.4rem;
      margin-right: 0.26rem;
      vertical-align: center;
    }
  }
}
.mallki-text{
  margin-right: 5px;
  margin-left: 10px;

}
</style>