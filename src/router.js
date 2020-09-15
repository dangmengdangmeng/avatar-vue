import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'ModelCreate',
            component: () => import('./views/model/Create')
        },
        {
            path: '/model/show',
            name: 'ModelShow',
            component: () => import('./views/model/Show')
        },
        {
            path: '/model/test',
            name: 'ModelTest',
            component: () => import('./views/model/Test')
        },
        {
            path: '/script/',
            name: 'ScriptIndex',
            component: () => import('./views/script/Index')
        },
    ]
})
