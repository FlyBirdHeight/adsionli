<template>
    <div>
        <el-container class="el-container_chat">
            <el-aside style="width:20%" class="el-aside_chat">
                <div class="charLine_text">
                    <div style="width:60%;padding-left:10px;display:inline-block">
                        <el-input
                            placeholder="查找好友或群聊"
                            prefix-icon="el-icon-search"
                            v-model="search">
                        </el-input>
                    </div>
                    <div style="width:30%;display:inline-block;padding-left:5px">
                        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini">添加群聊</el-button>
                    </div>
                </div>
                <div class="charLine_out">
                    <div class="charLine" @click="chatRoomChat(1,'PUBG吃鸡小分队')" :class="active==1?'charLineActive':''">
                        <div class="chatLine-inline">
                            <img src="http://p53z0yfgy.bkt.clouddn.com/cat.gif" alt="64*64" width="50px" height="50px" style="border-radius: 50%; border: 2px solid rgb(217, 217, 217);">
                        </div>
                        <div class="chatLine-inline" style="width:60%;font-weight:600;font-size:14px;margin-top:-10px">
                            <span style="margin-top:-10px">PUBG吃鸡小分队</span>
                        </div>
                        <el-button type="info" icon="el-icon-close" circle style="right:-10px;width: 15px;height: 15px;margin-left: -10px;position: relative;top: -5px;" :class="btn_active==1?'':'showButton'"></el-button>
                    </div>
                    <div class="charLine" @click="chatRoomChat(2,'猪猪')" :class="active==2?'charLineActive':''">
                        <div class="chatLine-inline">
                            <img src="http://p53z0yfgy.bkt.clouddn.com/cat.gif" alt="64*64" width="50px" height="50px" style="border-radius: 50%; border: 2px solid rgb(217, 217, 217);">
                        </div>
                        <div class="chatLine-inline" style="width:60%;font-weight:600;font-size:14px;margin-top:-10px">
                            <span style="margin-top:-10px">猪猪</span>
                        </div>
                        <el-button type="info" icon="el-icon-close" circle style="right:-10px;width: 15px;height: 15px;margin-left: -10px;position: relative;top: -5px;" :class="btn_active==2?'':'showButton'"></el-button>
                    </div>
                </div>
            </el-aside>
            <el-container>
                <el-header style="height:50px;padding:0 0">
                    <charHeader :showName="showName"></charHeader>
                </el-header>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import charHeader from '../header/header'
export default {
    methods: {
        chatRoomChat(data,vechar){
            this.active = data;
            this.btn_active = data;
            this.showName = vechar;
        }
    },
    data () {
        return {
            active: 0,
            btn_active:0,
            active_num:'active',
            search:'',
            showName:"公频"
        }
    },
    components: {
        charHeader
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
    width: 100%;
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
