<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <div id="aplayer"></div>
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
                cover: 'http://p53z0yfgy.bkt.clouddn.com/music.jpg'
            }])
            console.log(data);
          for(var i=0;i<data.length;i++){
            this.ap.list.add({'name':data[i].name,'artist':data[i].artist,'url':data[i].path,'cover':data[i].cover})
          }
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

  },
  components: {
    APlayer,
    Header,
    siderBar
  }
}
</script>

<style>
</style>
