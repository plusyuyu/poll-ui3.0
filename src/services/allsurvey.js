import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function findAll(param) {
  return request('/api/manager/survey/querySurvey', { method: 'post', params: param });
}
export async function findAllTeacher() {
  return request('/api/manager/user/findAll');
}
export async function findAllClazz() {
  return request('/api/manager/clazz/findAllVM');
}
export async function deleteSurvey(id) {
  return request('/api/manager/survey/deleteSurveyById', { params: id });
}
export async function previewSurvey(id) {
  return request('/api/manager/survey/previewSurvey', { params: id });
}
