import request from '@/utils/request'
export function getCompanyApi(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
