import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function query() {
  return request('/api/manager/question/findAllQuestionVM');
}
export async function toDelete(id) {
   return request('/api//manager/question/deleteQuestionById?id='+id);
}