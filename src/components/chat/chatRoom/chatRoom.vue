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
                        <span class="badge" style="background-color:rgb(245,108,108)" v-if="unread_count!=0">{{unread_count}}</span>
                        <el-button type="info" icon="el-icon-close" circle style="right:-20px;width: 15px;height: 15px;margin-left: -10px;position: relative;top: -5px;" :class="btn_active==1?'':'showButton'"></el-button>
                    </div>
                    
                    <div v-for="(room,key , index) in rooms">
                        <div class="charLine" @click="chatRoomChat(room.id,room.name,key)" :class="active==room.id?'charLineActive':''">
                            <div class="chatLine-inline">
                                <img :src="room.avatar" alt="64*64" width="50px" height="50px" style="border-radius: 50%; border: 2px solid rgb(217, 217, 217);">
                            </div>
                            <div class="chatLine-inline" style="width:45%;font-weight:600;font-size:14px;margin-top:-10px">
                                <span style="margin-top:-10px">{{room.name}}</span>
                            </div>
                            <span class="badge" style="background-color:rgb(245,108,108)" v-if="room.unread!=0">{{room.unread}}</span>
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
        chatRoomChat(data,vechar,room){
            this.active = data;
            this.btn_active = data;
            this.showName = vechar;
            this.roomId = data;
            console.log(this.roomId+"|");
            if(data==1){
                if(this.all_login == false){
                    this.ws.send(JSON.stringify({'type':'login','room_id':data,'client_name':this.user.name}));
                    this.all_login = true;
                }
            }else{
                if(this.rooms[room].login == false){
                    this.ws.send(JSON.stringify({'type':'login','room_id':data,'client_name':this.user.name}));
                    this.rooms[room].login = true;
                }
            }
            var ul = document.getElementById("chat_message");  
            while(ul.hasChildNodes()) 
            {  
                ul.removeChild(ul.firstChild);  
            }
            if(data == 1){
                this.unread_count = 0;
            }else{
                this.rooms[room].unread = 0;
            }
        },
        addRoom(data){
            console.log('addRoom');
            this.rooms.splice(1,0,data);
        },
        showSiderInfo(data){
            this.showSiderInfo01 = data;
        },
        websocketonmessage(e){ //数据接收
            e = JSON.parse(e.data);
            console.log(e);
            if(e.type == "login"){
                if(this.active == e.room_id){
                    document.getElementById("chat_message").innerHTML += " <li><div class='chat_login'><span class='chat_login_span'>" + e.client_name+"加入聊天室"+ "</span></div></li>";
                }else if(e.room_id == 1){
                    this.unread_count++;
                }else{
                    for(var i=0;i<this.rooms.length;i++){
                        if(this.rooms[i].id==e.room_id){
                            this.rooms[i].unread++;
                            break;
                        }
                    }
                }
            }else if(e.type=="logout"){
                if(this.active == e.room_id){
                    document.getElementById("chat_message").innerHTML += " <li><div class='chat_login'><span class='chat_login_span'>" + e.from_client_name+"离开聊天室"+ "</span></div></li>";
                }else if(e.room_id == 1){
                    this.unread_count++;
                }else{
                    for(var i=0;i<this.rooms.length;i++){
                        if(this.rooms[i].id==e.room_id){
                            this.rooms[i].unread++;
                            break;
                        }
                    }
                }
            }else{
                console.log(this.active+"||"+e.room_id)
                if(this.active == e.room_id){
                    document.getElementById("chat_message").innerHTML += "<li><p>"+e.from_client_name+" "+e.time+"</p><div class='chat_div'>"+this.unescapeHTML(e.content)+"</div></li>";
                }else if(e.room_id == 1){
                    this.unread_count++;
                }else{
                    for(var i=0;i<this.rooms.length;i++){
                        if(this.rooms[i].id==e.room_id){
                            this.rooms[i].unread++;
                            console.log("room:"+this.rooms[i].id+",unread_count:"+this.rooms[i].unread);
                            break;
                        }
                    }
                }
            }
            $('.showchat_body').scrollTop( $('.showchat_body')[0].scrollHeight);
        },
        websocketsend(msg){//数据发送
            console.log(msg);
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
            unread_count:0,
            all_login:false
        }
    },
    beforeMount () {
        // console.log(this.ws);
    },
    mounted(){
        this.ws.onmessage = this.websocketonmessage;
        if(this.user != null){
            this.axios.get('/api/v1/chatRoom/'+this.user.id).then((res) => {
                if(res.data.status == 'success'){
                    this.rooms = res.data.response;
                    for(var i=0;i<this.rooms.length;i++){
                        this.rooms[i].unread = 0;
                        this.rooms[i].login = false;
                        // console.log(this.rooms[i])
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
