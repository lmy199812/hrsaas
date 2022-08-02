import request from '@/utils/request'
/**
 * 
 * @param {object} data 
 * @returns promise
 */
export function login(data){
    return request({
        url:'/sys/login',
        method: 'POST',
        data,
    })
}