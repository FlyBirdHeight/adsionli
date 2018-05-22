<template>
  <div id="app" :style="{'padding-right':right01}">
    <Header></Header>
    <transition name="fade" mode="out-in">
      <router-view style="clear:both"/>
    </transition>
    <transition name="slide-fade">
      <sider-bar v-show="siderBarShow" :siderBarShow="siderBarShow" :showDimmer="showDimmer" @showSiderBar="showSiderBar"></sider-bar>
    </transition>
    <div @click="showSiderbar" class="showSider">
        <span class="glyphicon glyphicon-align-justify" v-if="showIcon"></span>
        <span class="glyphicon glyphicon-remove wrapper" v-if="!showIcon"></span>
    </div>
    <transition name="el-fade-in-linear">
      <div id='goTop' @click='goTop' class="goTop" v-show="toTop">  
        <i class="el-icon-caret-top"></i>
      </div>  
    </transition>
    <div id="aplayer">
    </div>
  </div>
</template>

<script>
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';
import Header from './components/blog/utilss/header';
import siderBar from './components/blog/utilss/siderbar';                           
export default {
  name: 'App',
  data () {
    return {
      ap: Object,
      toTop: false,
      right01:'0px',
      siderBarShow:false,
      show02:false,
      showDimmer:false,
      showIcon:true
    }
  },
  mounted () {
    this.axios.get('/api/v1/music').then((response) => {
      if(response.data.response!=0){
        var data = response.data.response;
        if(data.length!=0){
          this.ap = new APlayer({
            container: document.getElementById('aplayer'),
            listFolded: false,
            listMaxHeight: '90px',
            theme:'',
            fixed: true,
            audio: []
          })
          this.ap.list.add([{
                name: '没有理想的人不伤心',
                artist: '新裤子乐队',
                url: 'http://p53z0yfgy.bkt.clouddn.com/%E6%96%B0%E8%A3%A4%E5%AD%90%E4%B9%90%E9%98%9F%20-%20%E6%B2%A1%E6%9C%89%E7%90%86%E6%83%B3%E7%9A%84%E4%BA%BA%E4%B8%8D%E4%BC%A4%E5%BF%83.mp3',
                cover: 'http://p53z0yfgy.bkt.clouddn.com/music.jpg',
                lrc:'http://127.0.0.1:8000/lrc/没有理想的人不伤心.lrc'
            }])
          for(var i=0;i<data.length;i++){
            this.ap.list.add({'name':data[i].name,'artist':data[i].artist,'url':data[i].path,'cover':data[i].cover})
          }
          this.ap.lrc.show();
        }else{
          this.ap = new APlayer({
            container: document.getElementById('aplayer'),
            listFolded: false,
            listMaxHeight: '90px',
            theme:'',
            fixed: true,
            audio: [{
                name: '没有理想的人不伤心',
                artist: '新裤子乐队',
                url: 'http://p53z0yfgy.bkt.clouddn.com/%E6%96%B0%E8%A3%A4%E5%AD%90%E4%B9%90%E9%98%9F%20-%20%E6%B2%A1%E6%9C%89%E7%90%86%E6%83%B3%E7%9A%84%E4%BA%BA%E4%B8%8D%E4%BC%A4%E5%BF%83.mp3',
                cover: 'http://p53z0yfgy.bkt.clouddn.com/music.jpg'
            }]
          })
        }
        
      }
    }).catch((error) => {
      console.log(error);
    })
    this.$nextTick(function () {  
        window.addEventListener('scroll', this.needToTop);  //滚动事件监听  
    });  
    const that = this;
  },
  components: {
    APlayer,
    Header,
    siderBar
  },
  methods: {
    goTop: function() {               // 回到顶部方法  
      var gotoTop= function(){
        var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        currentPosition -= 10;
        if (currentPosition > 0) {
          window.scrollTo(0, currentPosition);
        }
        else {
          window.scrollTo(0, 0);
          clearInterval(timer);
          timer = null;
        }
      }
      var timer=setInterval(gotoTop,1);
    },  
    needToTop: function() {  
      let curHeight = document.documentElement.scrollTop || document.body.scrollTop;  
      let viewHeight = document.documentElement.clientHeight;  
      if (curHeight >0) {  
        this.toTop = true;                         //赋值是为了按钮的v-show='toTop'  
      }  
      else  
      {  
        this.toTop = false;  
      }   
    },
    showSiderbar(){
      let width = document.body.clientWidth;
      if(this.siderBarShow == true){
        this.showDimmer = false;
        this.show02 = false;
        this.siderBarShow = false;
        this.showIcon = true;
        this.right01 = '0px';
      }else{
        this.show02 = true;
        this.siderBarShow = true;
        this.showIcon = false;
        if(width>=1175){
          this.right01 = '320px';
        }else{
          this.right01 = '0px';
          if(width < 755){
            this.showDimmer = true;
          }
        }
      }
    },
    showSiderBar(val){
      this.showIcon = true;
      this.showDimmer = false;
      this.show02 = false;
      this.siderBarShow = false;
      this.right01 = '0px';

    }
  }
}
</script>

<style>
.goTop{
  position: fixed;
  right: 30px;
  bottom: 35px;
  background-color: black;
  color: #f1f1f1;
  width:20px;
  z-index: 1050;
  text-align:center
}
.showSider{
  position: fixed;
  right: 30px;
  bottom: 60px;
  background-color: #000;
  color: #f1f1f1;
  width:20px;
  z-index: 1050;
  text-align:center;
  border-radius: 25%
}
.slide-fade-enter-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.fade-enter-active {
  transition: all .2s ease;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
} 
@keyframes fade-in {  
  0% {opacity: 0;}
  40% {opacity: 0;}
  100% {opacity: 1;}
}  
@-webkit-keyframes fade-in {/*针对webkit内核*/  
  0% {opacity: 0;}  
  40% {opacity: 0;}  
  100% {opacity: 1;}  
}  
.wrapper {    
  animation: fade-in 0.5s infinite;
  -webkit-animation:fade-in 0.5s; 
}  
</style>
