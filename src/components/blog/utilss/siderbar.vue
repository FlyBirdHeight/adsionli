<template>
    <div class="siderbar">
        <div id="sidebar-dimmer" v-show="showDimmer" @click="showSiderBarInfo()"></div>
        <div style="z-index: 1050;transform: translateX(0);color: #fff;text-align: center;" v-show="siderBarShow">
            <div style="padding-top:10px"> 
                <img src="http://p53z0yfgy.bkt.clouddn.com/cat.gif" alt="64*64" width="150px" height="150px" style="border-radius:50%;border: 2px solid rgb(217,217,217);">
                <p class="site-author-name">AdsionLi</p>
                <p class="site-description">Enjoy code · Unique</p>
                <p class="site-description">这就是我，钟情痴迷于代码并拥有着天马行空想象力的程序员</p>
            </div>
            <div style="padding-top:20px">
                <span>
                    <a href="https://github.com/FlyBirdHeight" class="spanIcon" target="_blank">
                        <img src="http://p53z0yfgy.bkt.clouddn.com/github%20%281%29.png" alt="20*20" width="20px" height="20px"> Github
                    </a>
                </span>
                <span style="margin-left:5px">
                    <i style="border:1px solid #999"></i>
                </span>
                <span style="margin-left:5px">
                    <a href="https://coding.net/u/Adsionli" class="spanIcon" target="_blank"> 
                        <img src="http://p53z0yfgy.bkt.clouddn.com/CN_coding.net.png" alt="20*20" width="20px" height="20px">Coding
                    </a>
                </span>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['showDimmer','siderBarShow'],
    data() {
        return {
            isCollapse: true,
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        showSiderBarInfo(){
            this.$emit('showSiderBar',false);
        }
    },
    mounted(){
        console.log(this.showDimmer)
    }
}
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .siderbar{
        display: block;
        width: 320px;
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1040;
        box-shadow: inset 0 2px 6px #000;
        background: #222;
    }
    #sidebar-dimmer{
        position: fixed;
        width: 200%;
        height: 100%;
        left: 0;
        top: 0;
        background: #333;
        opacity: 0.5;
    }
    .site-author-name{
        margin: 5px 0 0;
        text-align: center;
        color: #f5f5f5;
        font-weight: normal;
        font-size: 20px;
    }
    .site-description{
        margin-top: 5px;
        text-align: center;
        font-size: 14px;
        color: #999;
    }
    .spanIcon{
        color:#fff;
        text-decoration: none;
    }
    .spanIcon:hover{
        color:#fff;
        text-decoration: none;
    }
</style>
