import Vue from 'vue'
import Router from 'vue-router'
import helloworld from '@/helloworld'
import index from '@/index'
import love from '@/love'
import file from '@/file'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloword',
      name: 'helloword',
      component: helloworld
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/love',
      name: 'love',
      component: love
    },
    {
      path: '/file',
      name: 'file',
      component: file
    }
  ]
})
