import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function findAll() {
  return request('/api/manager/survey/findAllSurveyVM');
}
export async function deleteSurvey(id) {
  return request('/api/manager/survey/deleteSurveyById', { params: id });
}
