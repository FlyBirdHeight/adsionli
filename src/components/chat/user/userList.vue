<template>
    <el-table
        :data="userList"
        style="width: 100%;height:450px;overflow-y:auto"
        >
        <el-table-column
            label="成员"
            width="150"
            >
            <template slot-scope="scope">
                <div @click="showUserInfo(scope.row.id)" style="cursor: pointer">
                    <img :src="scope.row.avatar" alt="50*50" width="35" height="35" style="border-radius:50%">
                    <span style="margin-left: 5px">{{ scope.row.name }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            prop="pivot.nick_name"
            label="群名片"
            >
        </el-table-column>
        <el-table-column
            label="等级">
            <template slot-scope="scope">
                <span>{{ scope.row.id == roomInfo.user_id ? "成员":"群主" }}</span>
            </template>
        </el-table-column>
    </el-table>    
</template>

<script>
export default {
    props: ['userList','roomInfo'],
    methods: {
        showUserInfo(id){
            console.log(id)
        }
    }
}
</script>

<style>

</style>
