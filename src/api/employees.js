import request from '@/utils/request'
/**
 * 获取员工列表
 * @returns promise
 */
export function getEmployeesApi() {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 * 获取
 * @param {*} params
 * @returns promise
 */
export function getEmployeesInfoApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}
