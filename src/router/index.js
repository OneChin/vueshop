import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home.vue'),
    children: [
      {
        // 用户列表，为什么不是 /home/users
        path: '/users',
        name: 'User',
        component: () => import('../views/manage/users.vue')
      },
      {
        // 用户列表，为什么不是 /home/users
        path: '/roles',
        name: 'Roles',
        component: () => import('../views/manage/roles.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/login.vue')
  },
]
const router = new VueRouter({
  routes
})
/**
 * to 将要访问的页面路径
 * from 从哪里来
 * next 放行函数
 */
router.beforeEach((to, from, next) => {
  // 如果用户访问登录页，直接放行
  if (to.path === '/login') return next()
  // 从 sessionStorage 中获取保存的 token 值
  const tokenStr = window.sessionStorage.getItem("token")
  console.log({ tokenStr })
  // 如果没有 token，强制跳转登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
