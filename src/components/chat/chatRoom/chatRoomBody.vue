<template>
    <div style="height:100%">
        <sider v-show="showSider"/>
        <div class="chatBody_something">
            <div class="showchat_body">
                123
            </div>
            <div class="showchat_input">
                <div class="showchat_setting">
                    123
                </div>
                <div>
                    456
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sider from '../header/sider';
export default {
    props: ['showSider'],
    components: {
        sider
    },
    data () {
        return {

        }
    },
    methods: {

    }   
}
</script>

<style>
.showchat_body{
    height: 450px;
    overflow-y: auto;
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: -15px;
    border-bottom: 1px solid rgb(217,217,217)
}
.showchat_input{

}
.showchat_setting{
    height: 30px;
}
</style>
