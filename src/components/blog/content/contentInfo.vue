<template>
    <div>
        <el-container style="margin:auto;" :style="{width:maxWidth}">
            <el-header style="height:100px">
                <h1 style="text-align:center">手动排查Linux磁盘占用</h1>
                <div style="margin-top:5px;margin-bottom:30px;text-align:center;">
                    <span style="color:#999;font-size: 12px">
                        <span>发布于</span>
                        <time>2018-05-15</time>
                    </span>
                    <span style="margin-left:5px;margin-right:10px;">
                        <i style="border:1px solid #999"></i>
                    </span>
                    <span style="color:#999;font-size: 12px">
                        <span>分类于</span>
                        <a href="javascript:;" @click="select()"  style="color:#999;font-size: 12px"><span>Linux</span></a>
                    </span>
                </div>
            </el-header>
            <el-main style="text-align:left;margin-top:20px">
                <div class="post-body" itemprop="articleBody">
                    <p>全面解析.gitignore文件中的模式匹配。</p>
                    <p>.gitignore文件里的模式匹配有时真的让人很无语，看似非常简单，实则到处是坑，  本文我们来个彻底解析。本文来自git文档加上自己的理解，以及总结了一些常用实例，git文档可以参考文末的链接。</p>
                    <h3 id="语法-pattern-format"><a href="#语法-pattern-format" class="headerlink" title="语法(pattern format)"></a>语法(pattern format)</h3><h4 id="第一部分语法规则" class="h4_1"><a href="#第一部分语法规则" class="headerlink" title="第一部分语法规则"></a>第一部分语法规则</h4><ol>
                    <li>空行被忽略</li>
                    <li>以<code>#</code>开头的行视为注释，需要<code>#</code>的地方要进行转意</li>
                    <li>其余每行表示一个pattern</li>
                    <li><strong>行尾</strong> 的空格被忽略，需要行尾空格的地方要进行转意</li>
                    <li><code>!</code>意味着<code>取反</code>，即原本被匹配上的文件被忽略，加上<code>!</code>后，这些文件则被包含进来，需要<code>!</code>的地方要要进行转意。但是<strong>如果一个文件的parent directory被忽略，则该文件不会被包含进来</strong>。</li>
                    <li>以<code>/</code>结尾的pattern，<code>/</code>将会被移除，然后按照<strong>下面</strong>的规则进行匹配，但是<strong>只匹配目录</strong></li>
                    <li>如果pattern中没有<code>/</code>，则git把该pattern当作一个shell glob去匹配文件路径</li>
                    <li>如果pattern中包含<code>/</code>，则git把该pattern当作一个<strong>受限</strong>的shell glob去匹配文件路径：此时wildcards(<code>*</code>)<strong>不能</strong>匹配<code>/</code>符号</li>
                    <li>以<code>/</code>开头的pattern，<code>/</code>匹配文件路径的开始，如<code>/*.c</code>匹配<code>cat.c</code>而不匹配<code>mozilla/cat.c</code></li>
                    </ol>
                </div>
            </el-main>
            <el-footer>
                <a href="javascropt:;" @click="seeTag(1)"><el-tag size="mini">#Linux</el-tag></a>
            </el-footer>
        </el-container>
  </div>

</template>

<script>
export default {
    data () {
        return {
            screenWidth:document.body.clientWidth,
            maxWidth:'755px'
        }
    },
    mounted () {
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
        }
    },
    watch: {
        screenWidth (val) {
            this.screenWidth = val
            // console.log(this.screenWidth);
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
</style>
