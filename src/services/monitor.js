import request from '@/utils/request';
/* 封装所有的异步请求 */

/* 查询符合条件的课调 */
export async function query() {
  const params = { page: 0, pageSize: 10, statuses: ['未审核','开启'] };
  return request('/api/manager/survey/querySurvey', {
    method: 'post',
    params: params,
    getResponse: true,
    // headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  });
}
/* 查询课调进度*/
export async function surveyProcess(id) {
  return request('/api/manager/survey/surveyProcess?id=' + id);
}
/* 关闭课调 */
export async function stopSurvey(id) {
  return request('/api/manager/survey/stopSurvey?id=' + id);
}
