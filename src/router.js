// router is basically just navigation
import Vue from 'vue'
import Router from 'vue-router'
import Skills from './components/Skills.vue'
import About from './components/About.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'skills',
            component: Skills
        },
        {
            path: '/about/:name', // the file path?
            name: 'about',
            component: About
        }
    ]
})