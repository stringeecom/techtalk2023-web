import {createRouter, createWebHistory} from 'vue-router'
import {ROUTES, ROUTES_PATH, ROUTES_SIDEBAR} from './routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: ROUTES_PATH.HOME,
            meta: {
                layout: 'dashboard-layout',
                requiresAuth: true
            }
        },
        ...ROUTES,
        ...ROUTES_SIDEBAR
    ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const user = localStorage.getItem('user')
    let isAuthenticated = true
    if (user === undefined || user == null) {
        isAuthenticated = false
    }
    if (requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router
