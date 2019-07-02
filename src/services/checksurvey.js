import request from '@/utils/request';
/* 封装所有的异步请求 */
export async function findCheckSurvey() {
  const params = { page: 0, pageSize: 10, statuses: ['未审核', '审核通过', '审核不通过'] };
  return request('/api/manager/survey/querySurvey', {
    method: 'post',
    params: params,
    getResponse: true,
  });
}

export async function saveSurvey(survey) {
  return request('/api/manager/survey/checkSurvey', {
    method: 'get',
    params: survey,
    getResponse: true,
  });
}
