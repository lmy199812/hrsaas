import request from '@/utils/request'
/**
 * 获取角色列表
 * @param {*} params
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}

export function addRoleApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
