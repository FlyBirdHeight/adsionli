<template>
  <div id="app" :style="{'padding-right':right01}">
    <Header></Header>
    <sider-bar v-show="siderBarShow"></sider-bar>
    <div @click="showSiderbar" class="showSider">
      <span class="glyphicon glyphicon-align-justify"></span>
    </div>
    <transition name="el-fade-in-linear">
    
    <div id='goTop' @click='goTop' class="goTop" v-show="toTop">  
      <i class="el-icon-caret-top"></i>
    </div>  
    </transition>
    <router-view style="clear:both"/>
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
      siderBarShow:false
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
      if(this.siderBarShow == true){
        this.siderBarShow = false;
        this.right01 = '0px';
      }else{
        this.siderBarShow = true;
        this.right01 = '320px';
      }
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
  background-color: black;
  color: #f1f1f1;
  width:20px;
  z-index: 1050;
  text-align:center
}
</style>
