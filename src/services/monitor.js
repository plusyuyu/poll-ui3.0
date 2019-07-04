import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function query() {
  return request('/api/manager/survey/findAllSurveyVM');
}
/* 查询课调进度*/
export async function surveyProcess(id) {
  return request('/api/manager/survey/surveyProcess?id=' + id);
}
/* 关闭课调 */
export async function stopSurvey(id) {
  return request('/api/manager/survey/stopSurvey?id=' + id);
}
