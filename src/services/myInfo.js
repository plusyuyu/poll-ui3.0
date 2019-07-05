import request from '@/utils/request';
import qs from 'qs';

/* 封装所有的异步请求 */
export async function query() {
  return request('/api/manager/user/findAll');
}

export async function saveUsers(param) {
  return request('/api/manager/user/saveOrUpdate', {
    method: 'post',
    params:param, },
  );
}
 


