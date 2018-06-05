<template>
    <div style="margin:auto;">
        <el-tabs type="border-card" style="margin:auto" :style="{width:chatRoomLength}" v-model="tabActive">
            <div v-if="user!=null?true:false">
                <el-tab-pane name="third">
                    <span slot="label"><i class="el-icon-setting"></i> 消息设置</span>
                    <setting />
                </el-tab-pane>
                <el-tab-pane name="first">
                    <span slot="label"><i class="el-icon-document"></i> 我的消息</span>
                    <chat-room />
                </el-tab-pane>
                <el-tab-pane name="second">
                    <span slot="label"><i class="glyphicon glyphicon-user"></i> 好友</span>
                    <firends />
                </el-tab-pane>
                
                
            </div>
            <div v-if="user!=null?false:true" style="text-align:center">
                <span style="font-size:18px">想进入聊天室与大家一起聊天吗？那就快去登陆吧！</span>
                <br>
                <a href="javascript:;" @click="gotoLogin()">
                    <span>点击前往登陆</span>
                </a>
            </div>
        </el-tabs>
    </div>
</template>

<script>
import chatRoom from '../chatRoom/chatRoom'
import firends from '../chatRoom/firends'
import setting from '../chatRoom/setting'
export default {
    data () {
        return {
            tabActive: 'first',
            chatRoomWidth: document.body.clientWidth,
            chatRoomLength:"80%",
            user:JSON.parse(sessionStorage.getItem('user'))
        }
    },
    methods: {
        gotoLogin(){
            this.$router.push('/login');
        }
    },
    components: {
        chatRoom,
        firends,
        setting
    },
    mounted () {
        const that = this;
        window.onresize = () => {
            return (() => {
                window.chatRoomWidth = document.body.clientWidth
                that.chatRoomWidth = window.chatRoomWidth
            })()
        }
        if(this.chatRoomWidth<=755){
            this.chatRoomLength = "100%";
        }else{
            this.chatRoomLength = "80%";
        }
    },
    watch: {
        chatRoomWidth (val) {
            this.chatRoomWidth = val
            if(this.chatRoomWidth<=755){
                this.chatRoomLength = "100%";
            }else{
                this.chatRoomLength = "80%";
            }
        }
    }
}
</script>

<style>

</style>
