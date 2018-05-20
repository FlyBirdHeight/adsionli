<template>
    <div class="siderbar">
        <h1>123456</h1>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            isCollapse: true
        };
    },
    methods: {
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
        console.log(key, keyPath);
        }
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
</style>
