import request from '@/utils/request';
/* 封装所有的异步请求 */
// 查询接口
export async function query() {
  return request('/api/manager/clazz/findAll');
}

// 删除接口
export async function toDelete(id) {
  return request('/api/manager/clazz/deleteClazzById?id=' + id);
}

// 批量删除接口
export async function batchDelete(ids) {
  return request('/api/manager/clazz/batchDeleteClazz?ids=' + ids, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
