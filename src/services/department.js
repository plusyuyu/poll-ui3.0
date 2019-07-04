import request from '@/utils/request';
/* 封装所有的异步请求 */
// 查询接口
export async function query() {
  return request('/api/manager/grade/findAll');
}

// 删除接口
export async function toDelete(id) {
  return request('/api/manager/grade/deleteById?id=' + id);
}

// 批量删除接口
export async function batchDelete(ids) {
  return request('/api/manager/grade/batchDelete?ids=' + ids, {
    method: 'get',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 保存或更新接口
export async function toSaveOrUpdate(parma) {
  return request('/api/manager/grade/saveOrUpdate', {
    method: 'post',
    params:parma
  });
}
