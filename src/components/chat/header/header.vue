<template>
    <div style="height:50px;border-bottom:3px solid rgb(217,217,217)">
        <div class="chatHead_title">
            <span>{{showName}}</span>
        </div>
        <div class="chatHead_something">
            <el-button-group>
                <el-tooltip class="item" effect="dark" content="语音通话" placement="top-start">
                    <el-button size="mini" style="height:30px;width:30px" plain><i class="glyphicon glyphicon-headphones" style="left: -6px;"></i></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="添加群聊" placement="bottom-start">
                    <el-button  size="mini" style="height:30px;width:30px" plain @click="addRoom()"><i class="glyphicon glyphicon-plus-sign" style="left: -6px;"></i></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="设置" placement="bottom-start">
                    <el-button  size="mini" style="height:30px;width:30px" plain @click="showSiderSetting"><i class="glyphicon glyphicon-cog" style="left: -6px;"></i></el-button>
                </el-tooltip>
            </el-button-group>
        </div>
        <el-dialog title="添加聊天室" :visible.sync="dialogFormAddRoom" :width="width">
            <el-form ref="form" :model="form" label-width="30%" :rules="rules" status-icon v-loading="loadingAddRoom">
                <el-form-item label="房间名：" prop="name">
                    <el-input v-model="form.name" auto-complete="off" style="width:70%"></el-input>
                </el-form-item>
                <el-form-item label="聊天室人数：" prop="maxUser">
                    <el-input-number v-model="form.max_user_count" :min="2" :max="500"></el-input-number>
                </el-form-item>
                <el-form-item label="需要同意加入：" prop="agree">
                    <el-switch
                        v-model="form.agree"
                        active-text="是"
                        inactive-text="否">
                    </el-switch>
                </el-form-item>
                <el-form-item label="群头像：">
                    <el-upload
                        class="avatar-uploader"
                        action="/api/v1/upload/picture"
                        :on-success="handleAvatarSuccess"
                        name="picture"
                        :show-file-list="false"
                        >
                        <img v-if="form.image" :src="form.image" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAddRoom = false">取 消</el-button>
                <el-button type="primary" @click="submitEdit('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Bus from '../../Bus.js'
export default {
    props: ['showName'],
    data () {
        var name = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('名字不能为空'));
            }else{
                callback();
            }
        };
        return {
            showSider:false,
            form:{
                user_id:JSON.parse(sessionStorage.getItem('user')).id,
                name:'',
                max_user_count:2,
                agree:false,
                image:''
            },
            rules: {
                name: [ 
                    { validator: name, trigger: 'blur' }
                ],
            },
            dialogFormAddRoom:false,
            loadingAddRoom:false,
            width:'50%',
        }
    },
    methods: {
        showSiderSetting(){
            this.showSider = !this.showSider;          
            this.$emit('showSiderInfo',this.showSider);
        },
        addRoom(){
            this.dialogFormAddRoom = true;
            let w = document.body.clientWidth;
            if(w>=1335){
                this.width = "30%"
            }else if(w<1335&&w>=875){
                this.width = "40%"
            }else if(w<875&&w>=500){
                this.width = "60%"
            }else{
                this.width = "80%"
            }
        },
        handleAvatarSuccess(res, file){
            this.form.image = res.response;
        },
        submitEdit(formName){
            this.loadingAddRoom = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = this.form;
                    this.axios.post('/api/v1/add/room',{
                        'name':data.name,'max_user_count':data.max_user_count,'user_id':data.user_id,'agree':data.agree==true?'1':'0','avatar':data.image
                    }).then((res) => {
                        if(res.data.status=='success'){
                            this.$notify({
                                title: '创建成功',
                                message: '快邀请其他人一起来交流吧！',
                                type: 'success',
                            });
                            this.dialogFormAddRoom = false;
                            this.loadingAddRoom = false;
                            this.$emit('addRoom',res.data.response);
                        }
                    }).catch((error) => {
                        console.log(error);
                        this.$notify.error({
                            title: '创建失败',
                            message: '创建失败，网络故障稍后再试！',
                        });
                        this.dialogFormAddRoom = false;
                        this.loadingAddRoom = false;
                    })
                } else {
                    this.$notify.error({
                        title: '创建失败',
                        message: '创建失败，请确认信息填写完全！',
                    });
                    this.loadingAddRoom = false;
                    return false;
                }
            });
        }
    }
}
</script>

<style>
.chatHead_title{
    display: inline-block;
    line-height: 50px;
    font-size: 19px;
    font-weight: 600;
    margin-left: 20px;
}
.chatHead_something{
    display: inline-block;
    float: right;
    line-height: 50px;
    margin-right: 10px
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.el-upload .el-upload--text input[type=file] {
    display: none;
}
</style>
