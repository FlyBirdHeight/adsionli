<template>
    <div style="height:50px;border-bottom:3px solid rgb(217,217,217)">
        <div class="chatHead_title">
            <span>{{showName}}</span>
        </div>
        <div class="chatHead_something">
            <el-button-group>
                <el-tooltip class="item" effect="dark" content="语音通话" placement="top-start">
                    <el-button size="mini" style="height:30px;width:30px" plain><i class="glyphicon glyphicon-headphones" style="left: -6px;"></i></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="添加群聊" placement="bottom-start">
                    <el-button  size="mini" style="height:30px;width:30px" plain><i class="glyphicon glyphicon-plus-sign" style="left: -6px;"></i></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="设置" placement="bottom-start">
                    <el-button  size="mini" style="height:30px;width:30px" plain @click="showSiderSetting"><i class="glyphicon glyphicon-cog" style="left: -6px;"></i></el-button>
                </el-tooltip>
            </el-button-group>
        </div>
    </div>
</template>

<script>
import Bus from '../../Bus.js'
export default {
    props: ['showName'],
    data () {
        return {
            showSider:false 
        }
    },
    methods: {
        showSiderSetting(){
            this.showSider = !this.showSider;          
            this.$emit('showSiderInfo',this.showSider);
        }
    }
}
</script>

<style>
.chatHead_title{
    display: inline-block;
    line-height: 50px;
    font-size: 19px;
    font-weight: 600;
    margin-left: 20px;
}
.chatHead_something{
    display: inline-block;
    float: right;
    line-height: 50px;
    margin-right: 10px
}
</style>
