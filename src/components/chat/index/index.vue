<template>
    <div style="margin:auto;">
        <el-tabs type="border-card" style="margin:auto" :style="{width:chatRoomLength}" v-model="tabActive">
            <el-tab-pane name="first">
                <span slot="label"><i class="el-icon-document"></i> 我的消息</span>
                <chat-room />
            </el-tab-pane>
            <el-tab-pane name="second">
                <span slot="label"><i class="glyphicon glyphicon-user"></i> 好友</span>
                <firends />
            </el-tab-pane>
            <el-tab-pane name="third">
                <span slot="label"><i class="el-icon-setting"></i> 消息设置</span>
                <setting />
            </el-tab-pane>
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
            chatRoomLength:"80%"
        }
    },
    methods: {

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
