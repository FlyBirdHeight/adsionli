<template>
    <div style="height:100%">
        <sider v-show="showSider"/>
        <div class="chatBody_something">
            <div class="showchat_body">
                123
            </div>
            <div class="showchat_input">
                <mavon-editor v-model="value" :toolbars="toolbars" style="min-height:260px"/>
                <div style="height:40px">
                    <el-button style="float:right;margin-right:20px;margin-top:7px" size="mini" type="primary" @click="sendMail()">发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sider from '../header/sider';
export default {
    props: ['showSider'],
    components: {
        sider
    },
    data () {
        return {
            value:'',
            toolbars: {
                bold: true, // 粗体
                italic: true,// 斜体
                header: true,// 标题
                // subfield: true, // 单双栏模式
                // preview: true, // 预览
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
            }
        }
    },
    methods: {
        sendMail(){
            console.log(this.value);
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
</style>
