<template>
    <div>
        <el-container style="margin:auto;" :style="{width:maxWidth}">
            <el-header style="height:100px">
                <h1 style="text-align:center">{{blog.title}}</h1>
                <div style="margin-top:5px;margin-bottom:30px;text-align:center;">
                    <span style="color:#999;font-size: 12px">
                        <span>发布于</span>
                        <time>{{blog.created_at}}</time>
                    </span>
                    <span style="margin-left:5px;margin-right:10px;">
                        <i style="border:1px solid #999"></i>
                    </span>
                    <span style="color:#999;font-size: 12px">
                        <span>分类于</span>
                         <a href="javascript:;" @click="seeTag(tag.id)"  style="color:#999;font-size: 12px" v-for="tag in blog.tag" :key="tag.id"><span>{{tag.name}}</span></a>
                    </span>
                </div>
            </el-header>
            <el-main style="text-align:left;margin-top:20px">
                <vue-markdown v-highlight :source="blog.content"></vue-markdown>
            </el-main>
            <el-footer>
                <a href="javascript:;" @click="seeTag(tag.id)"  style="color:#999;font-size: 12px" v-for="tag in blog.tag" :key="tag.id"><el-tag size="mini">#{{tag.name}}</el-tag></a>
                <div style="border-top:1px solid rgb(217,217,217);margin-top:10px;padding: 10px;white-space:nowrap;overflow: hidden;width:100%" :style="{width:maxWidth}">
                    <div style="display:inline-block;width:50%;white-space:normal">
                        <a href="javascript:;" @click="changeContent(1)" class="navItem"><i class="glyphicon glyphicon-chevron-left" />123</a>
                    </div>
                    <div style="display:inline-block;width:50%;white-space:normal;text-align: right;">
                        <a href="javascript:;" @click="changeContent(2)" class="navItem">456<i class="glyphicon glyphicon-chevron-right" /></a>
                    </div>
                </div>
                <div style="width:100%;padding:10px;text-align:center" v-if="showTextArea==false">
                    <el-button type="success" style="box-shadow: 5px 5px 5px #888888;" @click="login()">登陆并参与评论</el-button>
                </div>
                <div style="width:100%;padding:10px;text-align:center" v-else>
                    <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="欢迎评论，支持markdown语法"
                        v-model="comment"
                        style="margin-left:2%"
                        >
                    </el-input>
                    <el-button type="primary" style="float:right;margin-top:15px" @click="addComment()">评论</el-button>
                </div>
                <div style="width:100%;margin-top:40px;padding:10px;text-align:center">
                    <el-container style="margin-top:15px;margin-bottom:30px" v-for="comment in blog.comment" :key="comment.id">
                        <el-aside width="20%">
                            <img :src="comment.user.avatar" alt="64*64" width="60px" height="60px" style="border-radius:50%;border: 2px solid rgb(217,217,217);">
                        </el-aside>
                        <el-container>
                            <el-header style="text-align:left;height:30px">
                                <a href="javascript:;"><span style="color:rgb(103,197,58);font-size:1.2em;font-weight:600">{{comment.user.name}}</span></a>
                                <div style="display: inline-block;margin-left: 0.5em;color: rgba(0, 0, 0, 0.4);font-size: 0.875em;font-weight:600">
                                    {{comment.created_at}}
                                </div>
                            </el-header>
                            <el-main style="text-align:left;padding-top:0px;height:auto;border:1px solid rgb(217,217,217);border-radius:5px;background-color: #fff;box-shadow: 5px 5px 5px #f1f2f3;">
                                <vue-markdown v-highlight :source="comment.body"></vue-markdown>
                            </el-main>
                        </el-container>
                    </el-container>
                </div>
            </el-footer>
        </el-container>
  </div>

</template>


<script>
import Bus from '../../Bus.js'
import VueMarkdown from 'vue-markdown';
export default {
    components: {
        VueMarkdown
    },
    data () {
        return {
            screenWidth:document.body.clientWidth,
            maxWidth:'755px',
            showTextArea:false,
            comment:'',
            blog:[]
        }
    },
    mounted () {
        this.blogInfo();
        if(sessionStorage.getItem('user')!=null){
            this.showTextArea = true;
        }else{
            this.showTextArea = false;
        }
        const that = this;
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }
        if(this.screenWidth<=755){
            this.maxWidth = "100%";
        }else{
            this.maxWidth = "755px";
        }
    },
    methods: {
        seeTag(id){
            console.log("123456");
        },
        changeContent(id){
            console.log(id);
        },
        login(){
            this.$router.push('/login');
        },
        bus(){
            Bus.$on('userInfo',(e) => {
                this.showTextArea = e;
            })
        },
        blogInfo(){
            this.axios.get('/api/v1/blog/'+this.$route.params.id).then((res) => {
                this.blog = res.data.response;
            }).catch((error) => {
                console.log(error);
            })
        },
        addComment(){
            this.axios.post('/api/v1/add/comment',{
                'blog_id':this.$route.params.id,'user_id':JSON.parse(sessionStorage.getItem('user')).id,'body':this.comment
            }).then((res) => {
                if(res.data.status=='success'){
                    this.blog.comment.splice(0,0,res.data.response);
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    },
    watch: {
        screenWidth (val) {
            this.screenWidth = val
            if(this.screenWidth<=755){
                this.maxWidth = "100%";
            }else{
                this.maxWidth = "755px";
            }
        }
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.navItem{
    position: relative;
    display: inline-block;
    line-height: 25px;
    font-size: 14px;
    color: #555;
    border-bottom: none;
    text-decoration: none
}
.navItem:visited{
    position: relative;
    display: inline-block;
    line-height: 25px;
    font-size: 14px;
    color: #333;
    border-bottom: none;
    text-decoration: none
}
.navItem:hover{
    position: relative;
    display: inline-block;
    line-height: 25px;
    font-size: 14px;
    color: #333;
    border-bottom: none;
    text-decoration: none
}
.navItem:active{
    position: relative;
    display: inline-block;
    line-height: 25px;
    font-size: 14px;
    color: #333;
    border-bottom: none;
    text-decoration: none
}

</style>
