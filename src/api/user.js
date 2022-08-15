import request from '@/utils/request'
/**
 *
 * @param {object} data
 * @returns promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
/**
 * 获取用户信息
 * @returns promise
 */
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 获取某个用户的基本信息
 * @param {*} id
 * @returns
 */
export function getUserDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
