<template>
    <div style="margin:auto;">
        <el-tabs type="border-card" style="width:80%;margin:auto" v-model="tabActive">
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
            tabActive: 'first'
        }
    },
    methods: {

    },
    components: {
        chatRoom,
        firends,
        setting
    }
}
</script>

<style>

</style>
