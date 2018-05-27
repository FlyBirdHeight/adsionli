<template>
    <div>
        <div style="margin-top: 20px;margin-left:10%">
            <el-button @click="delNotify()">删除选中消息</el-button>
            <el-button @click="delAllNotify()">删除全部消息</el-button>
            <el-button @click="init()">刷新</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="readData"
            v-loading="loading"
            tooltip-effect="dark"
            style="width: 806px;margin-left:10%;margin-top:30px"
            border
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="日期"
            width="200">
            <template slot-scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
            <el-table-column
            prop="user.name"
            label="发送人"
            width="150">
            </el-table-column>
            <el-table-column
            prop="type"
            label="类型"
            width="150"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="250">
              <template slot-scope="scope">
                <el-button type="success" icon="el-icon-search" circle  @click="seeList(scope.$index, scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle  @click="delList(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
        </el-table>

        <el-dialog title="通知信息详情" :visible.sync="dialogReadVisible">
        <div>
          <div style="border-bottom:2px solid #f0f1f2;margin-bottom:20px">
            <span style="font-size:20px">下单人：{{data.name}}</span>
          </div>
          <div style="border-bottom:2px solid #f0f1f2;margin-bottom:20px">
            <span style="font-size:20px">消息类型：{{data.type}}</span>
          </div>
          <div style="border:2px solid #f0f1f2;border-radius:3px">
            <span style="font-size:20px">消息内容：{{data.content}}</span>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogReadVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['userId'],
    data() {
        return {
            readData: [],
            multipleSelection: [],
            shop:[],
            dialogReadVisible:false,
            data:{
                name:"",
                content:"",
                type:""
            },
            loading:true
        }
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delNotify(){
            var arr = [];
            for(var i=0;i<this.multipleSelection.length;i++){
                arr.splice(0,0,{'id':this.multipleSelection[i].id});
            }
            this.axios.delete('/api/v1/del/notify',{
                'delNotify':arr
            }).then((res) => {
                if(res.data.status == "success"){
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                });
                this.init();
                }
            }).catch((error) => {
                console.log(error);
                this.$notify.error({
                title: '错误',
                message: '网络问题，请确认网络是否连接'
                });
            });
        },
        delAllNotify(){
            var arr = [];
            for(var i=0;i<this.readData.length;i++){
                arr.splice(0,0,{'id':this.readData[i].id});
            }
            this.axios.delete('/api/v1/del/notify',{
                'delNotify':arr
            }).then((res) => {
                if(res.data.status == "success"){
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                });
                this.readData.splice(0,this.readData.length);
                }
            }).catch((error) => {
                console.log(error);
                this.$notify.error({
                title: '错误',
                message: '网络问题，请确认网络是否连接'
                });
            });
        },
        seeList(index,row){
            this.dialogReadVisible = true;
            this.data.name = this.readData[index].user.name;
            this.data.content = this.readData[index].body;
            this.data.type = this.readData[index].type;
            },
            delList(index,row){
            var arr = [];
            arr.splice(0,0,{'id':this.readData[index].id});
            this.axios.delete('/api/v1/del/notify',{
                'delNotify':arr
            }).then((res) => {
                if(res.data.status == "success"){
                this.$notify({
                    title: '成功',
                    message: '删除消息成功',
                    type: 'success'
                });
                this.readData.splice(index,1);
                }
            }).catch((error) => {
                console.log(error);
                this.$notify.error({
                title: '错误',
                message: '网络问题，请确认网络是否连接'
                });
            });
        },
        init(){
            this.axios.get('/api/v1/readNotify/'+this.userId).then((res) => {
                if(res.data.status!='success'){
                this.readData = [];
                this.loading = false;
                }else{
                this.readData = res.data.response;
                this.loading = false;
                }
            }).catch((error) => {
                console.log(error);
                this.$notify.error({
                title: '错误',
                message: '网络问题，请确认网络是否连接'
                });
            })
        }
    },
    mounted () {
        this.loading = false;
    }
}
</script>

<style>

</style>

