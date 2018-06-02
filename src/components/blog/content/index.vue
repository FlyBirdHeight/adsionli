<template>
    <div style="text-align:center">
        <el-container style="margin:auto;" :style="{width:maxWidth}" v-for="blog in blogs" :key="blog.id">
            <el-header style="height:100px">
                <h1 style="text-align:left"><a href="javascript:;" @click="seeAll(blog.id)" class="post-title-link">{{blog.title}}</a></h1>
                <div style="margin-top:5px;margin-bottom:20px;text-align:left;">
                    <span style="color:#999;font-size: 12px">
                        <span>发布于</span>
                        <time>{{blog.created_at}}</time>
                    </span>
                    <span style="margin-left:5px;margin-right:10px;">
                        <i style="border:1px solid #999"></i>
                    </span>
                    <span style="color:#999;font-size: 12px">
                        <span>分类于</span>
                        <a href="javascript:;" @click="select(tag.id)"  style="color:#999;font-size: 12px" v-for="tag in blog.tag" :key="tag.id"><span>{{tag.name}}</span></a>
                    </span>
                </div>
            </el-header>
            <el-main style="text-align:left;max-height:420px;overflow:hidden;text-overflow: ellipsis;margin-top:20px">
                <vue-markdown v-highlight :source="blog.content"></vue-markdown>
            </el-main>
            <el-footer style="text-align:right">
                <a class="btn_a" href="javascript:;" @click="seeAll(blog.id)">
                    阅读全文 »
                </a>
            </el-footer>
        </el-container>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="blogSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="blogTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
export default {
  methods:{
      select(id){
          console.log(id);
      },
      seeAll(id){
          this.$router.push('/blog/blogInfo/'+id);
      },
      blogsAll(page,size){
          this.axios.post('/api/v1/blog',{
              'page':page,'count':size
          }).then((res) => {
              if(res.data.status == 'success'){
                  this.blogs = res.data.response.blogs;
                  this.blogTotal = res.data.response.number;
              }
          }).catch((error) => {
              console.log(error);
          })
      },
      handleSizeChange(val){
        this.blogSize = val;
        this.blogsAll(this.currentPage4,this.blogSize);
      },
      handleCurrentChange(val){
        this.blogsAll(this.currentPage4,this.blogSize);
      },
  },
  data () {
      return {
        screenWidth:document.body.clientWidth,
        maxWidth:'755px',
        blogs:[],
        currentPage4: 1,
        blogTotal:20,
        blogSize:10,
      }
  },
  mounted () {
        this.blogsAll(this.currentPage4,this.blogSize);
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
    watch: {
        screenWidth (val) {
            this.screenWidth = val
            if(this.screenWidth<=755){
                this.maxWidth = "100%";
            }else{
                this.maxWidth = "755px";
            }
        }
    },
    components: {
        VueMarkdown
    }
}
</script>

<style>
.btn_a{
    color: #555;
    font-size: 14px;
    background: transparent;
    border-radius: 0;
    line-height: 2;
}
.h4_1{
    padding: 7px 6px 7px 7px;
    background: #ddd;
    border-left: 5px solid #ccc;
    font-size: 18px;
}
.post-title-link{
    display: inline-block;
    position: relative;
    color: #555;
    border-bottom: none;
    line-height: 1.2;
    vertical-align: top;
    text-decoration: none;
}
</style>
