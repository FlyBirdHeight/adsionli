<template>
    <div class="bolg_login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="20%" class="demo-ruleForm" label-position="top" style="padding: 20px;" v-loading="loadingLogin">
            <el-form-item label="邮箱" prop="email" style="margin-top:-10px">
                <el-input type="email" v-model="ruleForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" style="margin-top:-10px">
                <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <div style="margin:auto;text-align:center">
                <a href="javascript:;" style="font-size:15px;margin-right:20%" @click="register()">
                    <img src="http://p53z0yfgy.bkt.clouddn.com/register-o.png" alt="20*20" width="20px" height="20px" style="margin-top:-5px">
                    <span>注册</span>
                </a>
                <a href="javascript:;">
                    <span><i class="el-icon-d-arrow-right" />  忘记密码</span>
                </a>
            </div>
            <div style="margin-top:20px;text-align:center;margin-bottom:20px"> 
                <a href="javascript:;" style="font-size:14px">
                    <img src="http://p53z0yfgy.bkt.clouddn.com/github.png" alt="20*20" width="20px" height="20px" style="margin-top:-5px">
                    <span>使用github登陆</span>
                </a>
            </div>
            <el-form-item style="text-align:center">
                <el-button type="primary" @click="submitForm2('ruleForm')">提交</el-button>
                <el-button @click="resetForm2('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Bus from '../Bus.js'
export default {
    data () {
        var loginPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        var loginEmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('邮箱不能为空'));
            }
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            setTimeout(() => {
                if (!reg.test(value)) {
                    callback(new Error('邮箱格式不正确'));
                } else {
                    callback();
                }
            }, 300);
        };
        return {
            ruleForm: {
                password: '',
                email:'',
            },
            rules: {
                password: [
                    { validator: loginPassword, trigger: 'blur' }
                ],
                email: [
                    {validator: loginEmail, trigger:'blur'}
                ],
            },
            loadingLogin:false,
        }
    },
    methods: {
        submitForm2(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loadingLogin = true;
                    let data = this.ruleForm;
                    this.axios.post('/api/v1/login',{
                        'email':data.email,'password':data.password
                    }).then((res) => {
                        if(res.data.status=="success"){
                            this.loadingLogin = false;
                            Bus.$emit('userInfo',true);
                            sessionStorage.setItem('user',JSON.stringify(res.data.userInfo));
                            this.axios.defaults.headers.common['Authorization'] = res.data.token_type + ' ' + res.data.access_token;
                            sessionStorage.setItem('token',res.data.token_type + ' ' + res.data.access_token);
                            this.$notify({
                                title: '登陆成功',
                                message: '欢迎来到AdsionLi的个人网站进行交流',
                                type: 'success',
                            });
                            this.$router.push('/');
                        }
                    }).catch((error) => {
                        console.log(error);
                        this.$notify.error({
                            title: '登陆失败',
                            message: '登陆失败，网络故障稍后再试！',
                        });
                        this.loadingLogin = false;
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm2(formName) {
            this.$refs[formName].resetFields();
        },
        register(){
            this.$router.push('/register');
        }
    }
}
</script>

<style>
.bolg_login{
    margin:auto;
    width:30%;
    border:1px solid rgb(217,217,217);
    box-shadow: 0 3px 6px rgba(0,0,0,.36);
}
</style>
