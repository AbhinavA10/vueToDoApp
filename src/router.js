// router is basically just navigation
import Vue from 'vue'
import Router from 'vue-router'
import ListAppPage from './components/ListAppPage.vue'
import About from './components/About.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'todoApp',
            component: ListAppPage
        },
        {
            path: '/about/:name', // the file path?
            name: 'about',
            component: About
        }
    ]
})