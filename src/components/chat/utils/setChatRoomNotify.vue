<template>
    <el-dialog
        title="群消息设置"
        :visible.sync="setNotify"
        width="30%"
        :modal="false"
        :before-close="beforeClose"
        center>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="群消息提醒">
                <el-switch
                    v-model="form.notify"
                    active-text="关闭"
                    inactive-text="开启">
                </el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="hindle">取 消</el-button>
            <el-button type="primary" @click="updateNotify">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: ['setNotify','roomId','userId','nickName'],
    methods: {
        hindle(){
            this.$emit('showNotify',false);
        },
        updateNotify(){
            this.axios.patch('/api/v1/room/notify',{
                userId:this.userId,roomId:this.roomId,name:this.form.name
            }).then((res) => {
                if(res.data.status == "success"){
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.$emit('showNotify',false);
                }
            }).catch((error) => {
                console.log(error);
            })
        },
        beforeClose(done){
            this.$emit('showNotify',false);
        }
    },
    data () {
        return {
            form:{
                notify:false
            }
        }
    },
    watch: {
        nickName(val){
            this.form.name = val;
        }
    }
}
</script>

<style>

</style>
