import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function query() {
  return request('/api/manager/clazz/findAll');
}

export async function toDelete(id) {
  return request('/api/manager/clazz/deleteClazzById?id=' + id);
}
