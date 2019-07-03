import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function query() {
  return request('/api/manager/grade/findAll');
}

export async function toDelete(id) {
  return request('/api/manager/grade/deleteById?id=' + id);
}

export async function toSaveOrUpdate() {
  return request('/api/manager/grade/saveOrUpdate', {
    method: 'post',
  });
}
