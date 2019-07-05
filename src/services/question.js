import request from '@/utils/request';
import qs from 'qs';

/* 封装所有的异步请求 */
export async function query() {
  return request('/api/manager/question/findAllQuestionVM');
}
export async function toDelete(id) {
   return request('/api//manager/question/deleteQuestionById?id='+id);
}
export async function addOrupdate(param) {
  return request('/api/manager/question/saveOrUpdateQuestion', {
    method: 'post',
    data: qs.stringify(param,{ allowDots: true }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
