import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async getToken(connext, payload) {
      // 发送请求得来
      const res = await login(payload)
      // console.log(res)
      connext.commit('setToken', res)
    }
  }
}
