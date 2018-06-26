<template>
    <div class="chat_siderbar">
        <div style="z-index: 1550;transform: translateX(0);background-color: #fff;text-align: center;color:black">
            <div class="list-group" style="font-size:15px">
                <button type="button" class="list-group-item" @click="clickSee">查看群资料</button>
                <button type="button" class="list-group-item" @click="clickInvitation">邀请好友入群</button>
                <button type="button" class="list-group-item" @click="clickSetName">设置我的群昵称</button>
                <button type="button" class="list-group-item" @click="clickSetNotify">群消息设置</button>
                <button type="button" class="list-group-item" @click="clickOut">退出该群</button>
            </div>
        </div>
        <el-dialog
            :title="roomInfo.name"
            :visible.sync="centerDialogVisible"
            width="30%"
            :modal="false"
            center>
            <el-tabs type="border-card" v-model="roomSeeing" @tab-click="clickRoomSeeing">
                <el-tab-pane label="群首页" name="first">
                    <div>
                        <div style="height:100px;border-bottom:1px solid rgb(217,217,217);line-height:96px;text-align:center" >
                            <img :src="roomInfo.avatar" alt="90*90" width="90" height="90">
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="成员列表" name="second">

                </el-tab-pane>
            </el-tabs>
            
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:['roomId'],
    data() {
        return {
            isCollapse: true,
            centerDialogVisible:false,
            roomInfo:[],
            roomSeeing:'first'
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickSee(){
            this.axios.get('/api/v1/room/info/'+this.roomId).then((res) => {
                console.log(res.data);
                this.roomInfo = res.data.response.room;
                this.centerDialogVisible = true;
            }).catch((error) => {
                console.log(error);
            })
        },
        clickSetName(){

        },
        clickInvitation(){

        },
        clickOut(){

        },
        clickSetNotify(){

        },
        clickRoomSeeing(tab, event) {
            console.log(tab, event);
        }
    },
    mounted(){
        console.log(this.roomId);
    }
}
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .chat_siderbar{
        height: 649px;
        width: 200px;
        position: absolute;
        right: 16px;
        z-index: 1550;
        box-shadow:0 2px 6px rgb(217, 217, 217);
        background: #fff;
        color: #000;
    }
    .chat_site-author-name{
        margin: 5px 0 0;
        text-align: center;
        color: #000;
        font-weight: normal;
        font-size: 20px;
    }
    .chat_site-description{
        margin-top: 5px;
        text-align: center;
        font-size: 14px;
        color: #999;
    }
    .chat_spanIcon{
        color:#fff;
        text-decoration: none;
    }
    .chat_spanIcon:hover{
        color:#fff;
        text-decoration: none;
    }
    .list-group button{
        height: 50px;
    }
</style>
