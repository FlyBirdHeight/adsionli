<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">博客首页</el-menu-item>
    <el-menu-item index="2">聊天室</el-menu-item>
    <el-menu-item index="3">消息中心</el-menu-item>
    <el-menu-item index="4">个人页</el-menu-item>
    </el-menu>
</template>

<script>
export default {
   data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key);
        switch(key){
          case "1":
            this.$router.push('/blog');
            break;
          case "2":
            this.$router.push('/chat');
            break;
          case "3":
            this.$router.push('/notify');
            break;
          default:
            this.$router.push('/person');
            break;
        }
      }
    },
    mounted(){

    }
}
</script>

<style>

</style>
