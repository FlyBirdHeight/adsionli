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
            center
            >
            <el-dialog
                width="25%"
                :visible.sync="userInfoSee"
                :title="userInfo.name"
                :modal="false"
                append-to-body
                center
                >
                <user-card :userInfo="userInfo"></user-card>
                <div slot="footer" >
                    <el-button @click="setChat(userInfo.id)">发起聊天</el-button>
                    <el-button type="primary" @click="follower(userInfo.id)">加为好友</el-button>
                </div>
            </el-dialog>

            <el-tabs type="border-card" v-model="roomSeeing" @tab-click="clickRoomSeeing">
                <el-tab-pane label="群首页" name="first">
                    <div>
                        <div style="height:100px;border-bottom:1px solid rgb(217,217,217);line-height:96px" >
                            <img :src="roomInfo.avatar" alt="90*90" width="90" height="90" style="margin-left:20px">
                        </div>
                        <div style="margin-top:15px">
                            <div style="font-size:14px;">
                                <span style="color:rgb(177,177,177)">群介绍：</span>
                                <p>本群创建于{{roomInfo.created_at}}：{{roomInfo.description==""?"群主很懒,什么都没有留下":roomInfo.description}}</p>
                            </div>
                            <div style="font-size:14px;">
                                <span style="color:rgb(177,177,177)">群主：</span>
                                <div @click="showUserInfo(admin.id)" style="cursor: pointer">
                                    <img :src="admin.avatar" alt="45*45" width="45" height="45" style="border-radius:50%">
                                    <span style="font-weight:600">{{admin.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="成员列表" name="second">
                    <user-list-info :userList="userList" :roomInfo="roomInfo"></user-list-info>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <set-nick-name :setNickName="setNickName" @showNickName="showNickName" :roomId="roomId" :userId="userId" :nickName="nickName"></set-nick-name>
    </div>
</template>

<script>
import UserListInfo from '../user/userList'
import UserCard from '../user/userCard'
import SetNickName from '../utils/setNickName'
export default {
    props:['roomId','nickName'],
    data() {
        return {
            isCollapse: true,
            centerDialogVisible:false,
            roomInfo:[],
            roomSeeing:'first',
            admin:[],
            userInfoSee:false,
            userInfo:[],
            userList:[],
            setNickName:false,
            userId:JSON.parse(sessionStorage.getItem('user')).id,
        };
    },
    components: {
        UserListInfo,
        UserCard,
        SetNickName
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
                this.roomInfo = res.data.response.room;
                var date = new Date(this.roomInfo.created_at);
                this.roomInfo.created_at = date.getFullYear()+"-"+(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)+"-"+(date.getDate()<10?'0'+date.getDate():date.getDate())
                this.admin = this.roomInfo.admin;
                this.userList = this.roomInfo.user_list;
                this.centerDialogVisible = true;
            }).catch((error) => {
                console.log(error);
            })
        },
        clickSetName(){
            this.setNickName = true;
        },
        clickInvitation(){
            $("#roomInfo").modal("toggle");
        },
        clickOut(){

        },
        clickSetNotify(){

        },
        clickRoomSeeing(tab, event) {

        },
        showUserInfo(id){
            this.axios.get('/api/v1/user/info/'+id).then((res) => {
                this.userInfo = res.data.response;
                this.userInfoSee = true;
                // console.log(res.data.response);
            }).catch((error) => {
                console.log(error);
            })
        },
        showNickName(data){
            this.setNickName = data;
        }
    },
    mounted(){

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
