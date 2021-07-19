<!--  -->
<template>
<div>
    {{this.$route.params.city}}天气:{{weather}}
    <p>{{txt}}</p>
</div>
</template>

<script>
import axios from 'axios'
export default {
data() {
    return {
        weather:null,
        city:null,
        txt:null
    }
},
async beforeMount(){
    let key = '5fcf0ee3f6f24e96b1b2733ba108d4e7'
    let param = 'lifestyle'
    let httpUrl = `https://free-api.heweather.net/s6/weather/${param}?location=${this.$route.params.city}&key=${key}`
    let res 
    try {
        res = await axios.get(httpUrl)
    } catch (error) {
        console.log(error);
        
    }
    console.log(res);
    if(res.data.HeWeather6[0].status == 'ok'){
        this.city = res.data.HeWeather6[0].basic.location
        this.weather= res.data.HeWeather6[0].lifestyle[0].brf
        this.txt = res.data.HeWeather6[0].lifestyle[0].txt
    }else{
       console.log(res.data.HeWeather6[0].status);     
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */

</style>