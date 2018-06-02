<template>
    <div class="chat_siderbar">
        <div style="z-index: 1050;transform: translateX(0);color: #fff;text-align: center;">
            
        </div>
    </div>
</template>

<script>
export default {
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
</style>
