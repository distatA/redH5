<template>
<div class="zanlist">
    <div class='top'>
        <img src="../assets/index-img/back.png" alt="" @click="back">
        <div>赞赏列表</div><img src="../assets/index-img/more.png" alt="" style="width:29px;height:7px">
    </div>
    <div class="title">总收入：<span>¥6768</span></div>
    <div class="list">
        <div class="shang">
            <div class="name">赞赏-来自蒙奇奇</div>
            <div class="money">+0.01</div>
        </div>
        <div class="time">6月30日  13：54</div>
    </div>

</div>
    
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        //返回
        back(){
            this.$router.go(-1);//返回上一层
        },
    }

}
</script>
<style scoped lang="less">
    .zanlist{
        .top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size:18px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:520;
            color:rgba(0,0,0,1);
            padding:10px 20px;
            border-bottom:6px solid #F9F9F9;
            img{
                width:11px;
                height:18px;
            }
        }
        .title{
            background: #F9F9F9;
            padding:10px 22px;
            box-sizing: border-box;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,1);
            span{
                color: #914CDF;
                margin-left:10px;
            }
        }
        .list{
            padding:10px 21px;
            border-bottom:1px solid #F2F2F2;
            .shang{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .name{
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(0,0,0,1);
                }
                .money{
                    font-size:16px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:#914CDF;
                    font-weight: 500;
                }
            }
            .time{
                    margin-top:10px;
                    font-size:12px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(173,173,173,1);
                }
        }
    }

</style>