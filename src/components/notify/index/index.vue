<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="height: auto;margin-top:30px;margin-left:100px">
      <el-tab-pane label="未读消息">
          <unreadNotify :userId="user.id"></unreadNotify> 
      </el-tab-pane>
      <el-tab-pane label="已读消息">
          <readNotify :userId="user.id"></readNotify>      
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import readNotify from '../readNotify/readNotify';
import unreadNotify from '../unreadNotify/unreadNotify';
export default {
  components: {
    readNotify,
    unreadNotify,
  },
  data () {
    return {
      tabPosition:'left',
      user:[],
      showNotify:false
    }
  },
  methods: {
    
  },
  mounted () {
      if(sessionStorage.getItem('user') == null){
          this.showNotify = false;
      }else{
          this.showNotify = true;
          this.user = JSON.parse(sessionStorage.getItem('user'));
      }
      console.log(this.user);
  }
}
</script>

<style>
.el-tabs--left .el-tabs__item.is-left {
    height: 150px;
    line-height: 150px;
}
</style>

