<template>
    <div style="height:100%;border-bottom:3px solid rgb(217,217,217)">
        <div class="chatHead_title">
            <span>{{showName}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['showName']
}
</script>

<style>
.chatHead_title{
    float: left;
}
</style>
