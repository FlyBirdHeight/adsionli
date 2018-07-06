<template>
    <div>
        <div style="text-align:center">
            <img :src="userInfo.avatar" alt="100*100" width="100" height="100" style="border-radius:50%">
        </div>
        <div style="color:rgb(167,167,167);font-size:13px;text-align:center;margin-top:15px">
            <p>{{userInfo.description==""?"这个人有那么点点懒，没有自我介绍呢~":userInfo.description}}</p>
        </div>
        <div style="text-align:center;margin-top:15px;font-size:13px">
            <ul style="list-style-type:none;">
                <li style="margin-left:-40px;margin-top:10px">
                    <span style="color:rgb(167,167,167)">昵称：<font style="color:black">{{userInfo.name}}</font></span>
                </li>
                <li style="margin-left:-40px;margin-top:10px">
                    <span style="color:rgb(167,167,167)">邮箱：<font style="color:black">{{userInfo.email}}</font></span>
                </li>
                <li style="margin-left:-40px;margin-top:10px">
                    <span style="color:rgb(167,167,167)">性别：<font style="color:black">{{userInfo.sex}}</font></span>
                </li>
                <li style="margin-left:-40px;margin-top:10px">
                    <span style="color:rgb(167,167,167)">年龄：<font style="color:black">{{userInfo.age}}</font></span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    props: ['userInfo'],
    methods: {
        setChat(id){
            console.log(id);
        },
        follower(id){
            console.log(id)
        }
    }
}
</script>

<style>

</style>
