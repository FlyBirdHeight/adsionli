<template>
    <el-dialog
        title="群昵称设置"
        :visible.sync="setNickName"
        width="30%"
        :modal="false"
        :before-close="beforeClose"
        center>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="群昵称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="hindle">取 消</el-button>
            <el-button type="primary" @click="updateNickName">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: ['setNickName','roomId','userId','nickName'],
    methods: {
        hindle(){
            this.$emit('showNickName',false);
        },
        updateNickName(){
            if(this.form.name!=""){
                this.axios.patch('/api/v1/room/nickName',{
                    userId:this.userId,roomId:this.roomId,name:this.form.name
                }).then((res) => {
                    if(res.data.status == "success"){
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.$emit('showNickName',false);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }else{
                this.$message({
                    message: '昵称不能为空！',
                    type: 'warning'
                });
            }
        },
        beforeClose(done){
            this.$emit('showNickName',false);
        }
    },
    data () {
        return {
            form:{
                name:''
            }
        }
    },
    mounted(){
        // this.form.name = this.nickName;
        // console.log(123)
    }
}
</script>

<style>

</style>
