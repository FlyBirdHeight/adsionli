<template>
    <div>
        <div class="register">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="20%" class="demo-ruleForm" label-position="top" style="padding: 20px;" v-loading="loading">
                <el-form-item label="用户名" prop="name" >
                    <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" style="margin-top:-10px">
                    <el-input type="email" v-model="ruleForm2.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass" style="margin-top:-10px">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" style="margin-top:-10px">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="text-align:center;margin-top:10px">
            <div style="color:#747474;font-weight:400">已经拥有账户？</div>
            <div><a href="javascript:;" style="font-family:gotham,helvetica,arial,sans-serif;font-style:normal;font-size:16px;font-weight:400;text-decoration:none;color:#15b982">登录</a></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var email = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('邮箱不能为空'));
        }else {
            callback();
        }
      };
      var email = (rule, value, callback) => {
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
      var name = (rule, value, callback) => {
        if(value === ''){
        callback(new Error('用户名不能为空'));
        }
        var jmz = {};
        jmz.GetLength = function(str) {
            return str.replace(/[\u0391-\uFFE5]/g,"aa").length;  //先把中文替换成两个字节的英文，在计算长度
        };
        setTimeout(() => {
            if (jmz.GetLength(value)>20) {
                callback(new Error('用户名长度不超过20个字符'));
            } else {
                callback();
            }
        }, 300);
      }
      return {
        ruleForm2: {
          password: '',
          checkPass: '',
          age: '',
          email:'',
          name:''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
          email: [
              {validator: email, trigger:'blur'}
          ],
          name: [
              {validator:name, trigger:'blur'}
          ]
        },
        loading:false,
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            let data = this.ruleForm2;
            this.axios.post('/api/v1/add/user',{
                'name':data.name,'email':data.email,'password':data.password
            }).then((res) => {
                console.log(res.data);
                if(res.data.status=="success"){
                    this.loading = false;
                    this.$notify({
                        title: '注册成功',
                        message: '注册成功，请前往邮箱进行验证',
                        type: 'success',
                        duration: 0
                    });
                }
            }).catch((error) => {
                console.log(error);
                this.$notify.error({
                    title: '注册失败',
                    message: '注册失败，网络故障稍后再试！',
                    duration: 0
                });
                this.loading = false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>
.register{
    margin:auto;
    width:30%;
    border:1px solid rgb(217,217,217);
    box-shadow: 0 3px 6px rgba(0,0,0,.36);
}
</style>
