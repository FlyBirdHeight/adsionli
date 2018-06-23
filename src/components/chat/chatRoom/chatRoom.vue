<template>
    <div>
        <el-container class="el-container_chat">
            <el-aside style="width:20%" class="el-aside_chat">
                <div class="charLine_text">
                    <div style="width:95%;padding-left:5px;display:inline-block">
                        <el-input
                            placeholder="查找好友或群聊"
                            prefix-icon="el-icon-search"
                            v-model="search">
                        </el-input>
                    </div>
                </div>
                <div class="charLine_out">
                    
                    <div class="charLine" @click="chatRoomChat(1,'公频')" :class="active==1?'charLineActive':''">
                        <div class="chatLine-inline">
                            <img src="http://p53z0yfgy.bkt.clouddn.com/cat.gif" alt="64*64" width="50px" height="50px" style="border-radius: 50%; border: 2px solid rgb(217, 217, 217);">
                        </div>
                        <div class="chatLine-inline" style="width:45%;font-weight:600;font-size:14px;margin-top:-10px">
                            <span style="margin-top:-10px">公频</span>
                        </div>
                        <span class="badge" style="background-color:rgb(245,108,108)">4</span>
                        <el-button type="info" icon="el-icon-close" circle style="right:-20px;width: 15px;height: 15px;margin-left: -10px;position: relative;top: -5px;" :class="btn_active==1?'':'showButton'"></el-button>
                    </div>
                    
                    <div v-for="room in rooms" :key="room.id">
                        <div class="charLine" @click="chatRoomChat(room.id,room.name)" :class="active==room.id?'charLineActive':''">
                            <div class="chatLine-inline">
                                <img :src="room.avatar" alt="64*64" width="50px" height="50px" style="border-radius: 50%; border: 2px solid rgb(217, 217, 217);">
                            </div>
                            <div class="chatLine-inline" style="width:45%;font-weight:600;font-size:14px;margin-top:-10px">
                                <span style="margin-top:-10px">{{room.name}}</span>
                            </div>
                            <span class="badge" style="background-color:rgb(245,108,108)">{{room.unread}}</span>
                            <el-button type="info" icon="el-icon-close" circle style="right:-20px;width: 15px;height: 15px;margin-left: -10px;position: relative;top: -5px;" :class="btn_active==room.id?'':'showButton'"></el-button>
                        </div>
                    </div>
                </div>
            </el-aside>
            <el-container>
                <el-header style="height:50px;padding:0 0">
                    <charHeader :showName="showName" @showSiderInfo="showSiderInfo" @addRoom='addRoom'></charHeader>
                </el-header>
                <el-main style="padding:0">
                    <chat-room-body :showSider='showSiderInfo01' :roomId='roomId' :clientName='user.name' @sendMessage="websocketsend" />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import charHeader from '../header/header';
import chatRoomBody from '../chatRoom/chatRoomBody'
import VueMarkdown from 'vue-markdown';
import websock from '../../chat.js';
export default {
    methods: {
        chatRoomChat(data,vechar){
            this.active = data;
            this.btn_active = data;
            this.showName = vechar;
            this.ws.send(JSON.stringify({'type':'login','room_id':data,'client_name':this.user.name}));
        },
        addRoom(data){
            console.log('addRoom');
            this.rooms.splice(1,0,data);
        },
        showSiderInfo(data){
            this.showSiderInfo01 = data;
        },
        threadPoxi(){  // 实际调用的方法
            //若是ws开启状态
            if (this.ws.readyState === this.ws.OPEN) {
                this.websocketsend(this.msg)
            }
            // 若是 正在开启状态，则等待300毫秒
            else if (this.ws.readyState === this.ws.CONNECTING) {
                let that = this;//保存当前对象this
                setTimeout(function () {
                    that.websocketsend(this.msg)
                }, 300);
            }
            // 若未开启 ，则等待500毫秒
            else {
                this.initWebSocket();
                let that = this;//保存当前对象this
                setTimeout(function () {
                    that.websocketsend(this.msg)
                }, 500);
            }
        },
        websocketonmessage(e){ //数据接收
            e = JSON.parse(e.data);
            console.log(this.unescapeHTML(e.content));
            if(e.type == "login"){
                document.getElementById("chat_message").innerHTML += " <li><div class='chat_login'><span class='chat_login_span'>" + e.client_name+"加入聊天室"+ "</span></div></li>";
            }else if(e.type=="logout"){
                document.getElementById("chat_message").innerHTML += " <li><div class='chat_login'><span class='chat_login_span'>" + e.from_client_name+"离开聊天室"+ "</span></div></li>";
            }else{
                document.getElementById("chat_message").innerHTML += "<li><p>"+e.from_client_name+" "+e.time+"</p><div class='chat_div'>"+this.unescapeHTML(e.content)+"</div></li>";
            }
            $('.showchat_body').scrollTop( $('.showchat_body')[0].scrollHeight);
        },
        websocketsend(msg){//数据发送
            console.log(this.ws);
            this.ws.send(msg);
        },
        websocketclose(e){  //关闭
            console.log("connection closed (" + e.code + ")");
        },
        close(){
            this.ws.onclose=function(e){
                 console.log(e);
                 ws.close();
            };
            console.log(123);
        },
        unescapeHTML(data){ //解析脚本
            data = "" + data;
            return data.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
        },
        addRoom(data){
            this.rooms.splice(0,0,data)
        }
    },
    data () {
        return {
            active: 0,
            btn_active:0,
            active_num:'active',
            search:'',
            showName:"",
            showSiderInfo01:false,
            user:JSON.parse(sessionStorage.getItem('user')),
            ws: websock,
            roomId: 1,
            rooms:[],
            unread_count:0
        }
    },
    beforeMount () {
        console.log(this.ws);
    },
    mounted(){
        this.ws.onmessage = this.websocketonmessage;
        if(this.user != null){
            this.axios.get('/api/v1/chatRoom/'+this.user.id).then((res) => {
                if(res.data.status == 'success'){
                    this.rooms = res.data.response;
                    for(var i=0;i<this.rooms.length;i++){
                        console.log(this.rooms[i].id);
                        this.rooms[i].unread = 0;
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
        }
        
    },
    components: {
        charHeader,
        chatRoomBody,
        VueMarkdown
    }
}
</script>

<style>
.el-container_chat{
    border:1px solid rgb(217,217,217);
    border-radius: 5px;
}
.el-aside_chat {
    background-color: rgb(250, 250, 250);
    color: #000;
    overflow: hidden;
    position: relative;
    height: 700px;
}
.charLine{
    height: 80px;
    width: 95%;
    text-align: left;
    line-height: 80px;
    overflow-x: hidden;
}
.charLine_text{
    height: 50px;
    width: 100%;
    text-align: left;
    line-height: 50px;
    border-bottom: 3px solid #777;
}
.charLine_out{
    height: 650px;
    overflow-y: auto;
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 0;
    right: -15px;
}
.chatLine-inline{
    display: inline-block;
}
.el-button .el-icon-close{
    margin-left: -6px;
    margin-top: -12px;
    position: absolute;
    top: 17px;
    left: 11px;
}
.charLine:hover{
    background-color: rgb(231, 231, 231);
}
.charLineActive{
    background-color: rgb(231, 231, 231);
}
.showButton{
    display: none
}
</style>
