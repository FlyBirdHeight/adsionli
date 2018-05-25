<template>
    <div style="margin:auto;text-align:center;margin-top:60px">
        <div v-if="show==1?true:false">
            <div class="access_true" >
                <span>验证成功！</span>
                <div style="margin-top:20px;text-align:center;margin-left:-35px">
                    <img src="http://p53z0yfgy.bkt.clouddn.com/hello2.gif" alt="50*50" width="150px" height="150px">
                </div>
            </div>
            <div style="margin: auto;text-align: center;">
                <div style="font-size: 20px;text-align: center;margin-top: 20px;">
                    Hello,欢迎加入AdsionLi的个人站点进行交流！
                </div>
                <div class="goto_login">
                    <a href="javascript:;" @click="gotoLogin()">前往登陆</a>
                </div>
            </div>
        </div>
        <div v-if="show==2?true:false">
            <div>
                <span style="font-size:25px;color:red;font-weight:600;margin-top:35px">验证失败！</span>
                <div>
                    <img src="http://p53z0yfgy.bkt.clouddn.com/no.gif" alt="100*100" width="130px" height="130px">
                </div>
                <div style="font-size:20px;color:#333;margin-top:20px">
                    你来得实在太晚了，超过了一个小时限时验证，快去重新注册吧！
                </div>
                <div style="margin-top:20px;font-size:20px;color:#777;font-weight:600">
                    <a href="javascript:;" @click="gotoRegister">前往注册</a>
                </div>
            </div>
        </div>
        <div v-if="show==3?true:false">
            <div>
                <span style="font-size:25px;color:red;font-weight:600;margin-top:35px">NO!NO!NO!</span>
                <div>
                    <img src="http://p53z0yfgy.bkt.clouddn.com/no.gif" alt="100*100" width="130px" height="130px">
                </div>
                <div style="font-size:20px;color:#333;margin-top:20px;font-weight:600">
                    你已经验证过邮箱了，别调皮，快去登陆吧！
                </div>
                <div style="margin-top:20px;font-size:20px;font-weight:600">
                    <a href="javascript:;" style="color:rgb(91,192,222);" @click="gotoLogin">登陆</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            show:0
        }
    },
    mounted () {
        console.log(this.$route.params.token);
        this.editAccessToken();
    },
    methods: {
        editAccessToken(){
            this.axios.put('/api/v1/edit/userToken',{
                'token':this.$route.params.token
            }).then((res) => {
                if(res.data.status == "success"){
                    this.show = 1;
                }else if(res.data.status == "overtime"){
                    this.show = 2;
                }else{
                    this.show = 3;
                }
            }).catch((error) => {
                console.log(error);
            })
        },
        gotoLogin(){
            this.$router.push('/login')
        },
        gotoRegister(){
            this.$router.push('/register')
        }
    }
}
</script>

<style>
.access_true{
    color: rgb(68,197,68);
    font-size: 50px;
    font-weight: 600;
    padding-top: 15px;
    text-align: center;
}
.goto_login{
    margin-top: 15px;
    color: #333;
    font-size: 20px
}
</style>
