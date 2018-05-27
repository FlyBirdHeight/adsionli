import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/blog',
    },
    {
      path:'/register',
      name:"register",
      component: resolve => require(['../components/register/register.vue'], resolve),
    },
    {
      path:'/success/:token',
      name:'success',
      component: resolve => require(['../components/register/success.vue'], resolve),
    },
    {
      path: '/blog',
      redirect: '/blog/content',
      component: resolve => require(['../components/blog/index/index.vue'], resolve),
      children:[{
        path: 'content',
        name: 'content',
        component: resolve => require(['../components/blog/content/index.vue'], resolve),
      },{
        path: 'personInfo',
        name: 'personInfo',
        component: resolve => require(['../components/blog/person/personInfo.vue'], resolve),
      },{
        path: 'blogInfo/:id',
        name: 'blogContent',
        component: resolve => require(['../components/blog/content/contentInfo.vue'], resolve),
      }]
    },{
      path:'/chat',
      component: resolve => require(['../components/chat/index/index.vue'], resolve),
      children:[{
        path:'chatRoom',
        name:'chatRoom',
        component: resolve => require(['../components/chat/chatRoom/chatRoom.vue'], resolve)
      }]
    },{
      path:'/admin',
      redirect: '/admin/index',
      component: resolve => require(['../components/admin/index.vue'], resolve),
      children:[{
        path:'index',
        name:"index",
        component: resolve => require(['../components/admin/index/index.vue'], resolve)
      },{
        path:'chat',
        name:'adminChat',
        component: resolve => require(['../components/admin/chat/chat.vue'], resolve)
      },{
        path:'music',
        name:'music',
        component: resolve => require(['../components/admin/music/music.vue'], resolve)
      },{
        path:'blog',
        name:'blog',
        component: resolve => require(['../components/admin/content/content.vue', resolve])
      }]
    },{
      path:'/login',
      name:'blogLogin',
      component: resolve => require(['../components/login/blogLogin.vue'], resolve)
    },{
      path:'/adminLogin',
      name:'adminLogin',
      component: resolve => require(['../components/login/adminLogin.vue'], resolve)
    },{
      path:'/chatLogin',
      name:'chatLogin',
      component: resolve => require(['../components/login/chatLogin.vue'], resolve)
    },{
      path:'/person',
      name:'person',
      component: resolve => require(['../components/blog/person/personInfo.vue'],resolve)
    },{
      path:'/notify',
      name:'notify',
      component: resolve => require(['../components/notify/index/index.vue'],resolve),
    }
  ]
})

