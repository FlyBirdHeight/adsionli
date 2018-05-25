<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" style="margin-top:17px" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <p class="navbar-text" style="font-size:28px;font-weight:600">AdsionLi</p>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" style="margin-left:20%">
        <ul class="nav navbar-nav" style="margin-top:10px">
          <li :class="{active: isActive1}" ><a href="javascript:;" @click="handleClick('0')">adsionli博客 <span class="sr-only">(current)</span></a></li>
          <li :class="{active: isActive2}"><a href="javascript:;" @click="handleClick('1')">聊天 <span class="sr-only">(current)</span></a></li>
          <li :class="{active: isActive3}"><a href="javascript:;" @click="handleClick('2')">消息通知 <span class="sr-only">(current)</span></a></li>
          <li :class="{active: isActive4}"><a href="javascript:;" @click="handleClick('3')">个人页 <span class="sr-only">(current)</span></a></li>
        </ul>
        <form class="navbar-form navbar-left" style="margin-top:17px">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
          </div>
          <button type="submit" class="btn btn-info">查找 </button>
        </form>
        <ul class="nav navbar-nav navbar-right" v-show="!showUser">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img class="user-logo" src="http://onasmniwj.bkt.clouddn.com/avatars/f94a76806a6c142145300d55543adcbc.jpg"> <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">个人中心</a></li>
              <li><a href="#">消息中心</a></li>
              <li><a href="#">注销</a></li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right" v-show="showUser" style="margin-top: 10px;">
          <li>
            <button type="button" class="btn btn-success navbar-btn" @click="login()">登陆</button>
            <button type="button" style="margin-left:15px" class="btn btn-info navbar-btn" @click="register()">注册</button>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
export default {
   data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        activeName:'first',
        isActive1:true,
        isActive2:false,
        isActive3:false,
        isActive4:false,
        showUser:false
      };
    },
    methods: {
      handleClick(id) {
        this.isActive1=false;
        this.isActive2=false;
        this.isActive3=false;
        this.isActive4=false;
        switch(id){
          case "0":
            this.isActive1 = true;
            this.$router.push('/blog');
            break;
          case "1":
            this.isActive2 = true;
            this.$router.push('/chat');
            break;
          case "2":
            this.isActive3 = true;
            this.$router.push('/notify');
            break;
          default:
            this.isActive4 = true;
            this.$router.push('/person');
            break;
        }
      },
      handleCommand(command) {
          if(command == 'loginout'){
              localStorage.removeItem('ms_username')
              this.$router.push('/login');
          }
      },
      login(){
        this.$emit('showLogin',true);
      },
      register(){
        this.$router.push('/register');
      }
    },
    mounted(){
      if(sessionStorage.getItem('user')!=null){
        console.log(123);
        this.showUser = false;
      }else{
        console.log(456)
        this.showUser = true;
      }
    }
}
</script>

<style>
.header {
        position: relative;
        box-sizing: border-box;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        background-color: #f1f2f3;
    }
    .header .logo{
        text-align: center;
        color: black
    }
    .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: black;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-logo{
      width:40px;
      height:40px;
      border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
