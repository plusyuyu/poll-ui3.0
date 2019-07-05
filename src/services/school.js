import request from '@/utils/request';
/* 封装所有的异步请求 */

export async function query() {
  return request('/api/manager/school/findById?id=1');
}
   
