import router from '@/router'
import store from '@/store'
// 全局路由前置守卫
// 进入路由前调用
// to : 去哪的路由
// from : 来自于哪个路由
// next : 是否进入
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  //  进行权限控制
  //  调用了next进入该路由，不调用无法进入
  const token = store.state.user.token
  if (token) {
    // 获取用户信息
    if (!store.state.user.userInfo.userId) {
      await store.dispatch('user/getUserInfo')
    }
    //  1 登录
    //  是否进入登录页
    if (to.path === '/login') {
      //  1.1 是 跳到首页
      next('/')
    } else {
      //  1.2 不是，直接进入
      next()
    }
  } else {
    //  2未登录
    //  访问是否在白名单内
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      //  2.1 在白名单 方行
      next()
    } else {
      //  2.2 不在白名单(不等录不能访问) 跳到登录页
      next('/login')
    }
  }
})
