import Vue from 'vue'
import VueRouter from 'vue-router'

import UserLayout from "@/Layouts/UserLayout";
import BasicLayout from "@/Layouts/BasicLayout";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/welcome',
        component: BasicLayout,
        children: [
            {
                path: 'welcome',
                name: 'welcome',
                component: () => import(/* webpackChunkName: "about" */ '../components/exam/Welcome')
            },
            {
                path: 'questionList',
                name: 'questionList',
                component: () => import(/* webpackChunkName: "about" */ '../components/exam/QuestionList')
            },
            {
                path: 'examList',
                name: 'examList',
                component: () => import(/* webpackChunkName: "about" */ '../components/exam/ExamList')
            },
            {
                path: 'myExam',
                name: 'myExam',
                component: () => import(/* webpackChunkName: "about" */ '../components/exam/MyExam')
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import(/* webpackChunkName: "about" */ '../components/user/Settings')
            }
        ]
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        name: 'user',
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import(/* webpackChunkName: "user" */ '../components/user/Login')
            },
        ]
    },
    {
        path: '/exam/:id',
        component: () => import(/* webpackChunkName: "fail" */ '../components/exam/ExamDetail')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//??????????????????????????????????????????????????????????????????????????????
router.beforeEach((to, from, next) => {
    if (to.path === '/user/login') {
        var token1 = localStorage.getItem('Authorization');
        //??????token???token???????????????????????????,????????????welcome??????????????????login
        if (token1 === null || token1 === '') {
            next();
        } else {
            next('/welcome');
        }
    } else {
        var token = localStorage.getItem('Authorization');
        //??????token???token???????????????????????????
        if (token === null || token === '') {
            next('/user/login');
        } else {
            next();
        }
    }
})


export default router
