<template>
    <div style="height:100%">
        <sider v-show="showSider"/>
        <div class="chatBody_something">
            <div class="showchat_body">
                <ul class="chat_message">
                    <li>
                        <p>Adsionli 2018/5/31 0:13:00</p>
                        <div>123</div>
                    </li>
                    <li>
                        <p>Adsionli 2018/5/31 0:13:00</p>
                        <vue-markdown v-highlight :source="content"></vue-markdown>
                    </li>
                </ul>
            </div>
            <div class="showchat_input">
                <mavon-editor ref=md v-model="value" :toolbars="toolbars" style="min-height:260px;max-height:260px" :subfield="true" :ishljs = "true" @imgAdd="$imgAdd"/>
                <div style="height:40px">
                    <el-button style="float:right;margin-right:20px;margin-top:7px" size="mini" type="primary" @click="sendMail()">发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sider from '../header/sider';
import VueMarkdown from 'vue-markdown';
export default {
    props: ['showSider'],
    components: {
        sider,
        VueMarkdown,
    },
    data () {
        return {
            value:'',
            toolbars: {
                bold: true, // 粗体
                italic: true,// 斜体
                header: true,// 标题
                subfield: true, // 单双栏模式
                preview: true, // 预览
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                htmlcode: true,
            },
            content:'![11.jpg](http://127.0.0.1/images/152785613311.jpg)'
        }
    },
    methods: {
        sendMail(){
            console.log(this.value);
        },
        $imgAdd(pos, $file){
            var formdata = new FormData();
            var user = JSON.parse(sessionStorage.getItem('user'));
            formdata.append('image', $file);
            formdata.append('userId',user.id);
            this.axios({
                url: '/api/v1/upload/image',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((url) => {
                this.$refs.md.$img2Url(pos, url.data.response.url);
            })
        }
    }   
}
</script>

<style>
.showchat_body{
    height: 350px;
    overflow-y: auto;
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: -15px;
    border-bottom: 1px solid rgb(217,217,217)
}
.showchat_input{
    height: 250px;
}
.showchat_setting{
    height: 30px;
}
.chat_message{
    margin-left: -5px;
    list-style: none;
}
.chat_message li p{
    font-size: 15px;
    font-weight: bolder
}
.chat_message li{
    margin-top: 15px
}
.chat_message li div{
    margin-left: 10px
}
.chat_message li div image{
    width: 150px;
    height: 150px;
}
</style>
