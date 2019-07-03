import request from '@/utils/request';
import qs from 'qs';

/* 封装所有的异步请求 */
export async function query() {
  return request('/api/manager/user/findAll');
}

export async function saveOrUpdate(param) {
  return request('/api/manager/user/register', {
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
  
  export async function deleteUsers(id) {
    return request('/api/manager/user/deleteById', { params: id });
  }
  export async function batchDelete(param){
      return request('/api/manager/user/batchDelete', {
      method: 'post',
      data: qs.stringify(param),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    });
  }

