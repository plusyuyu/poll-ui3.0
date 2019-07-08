import request from '@/utils/request';

export async function teacherSurvey(survey) {
  return request('/api/manager/survey/statisticsByMonth', {
    method: 'post',
    params: survey,
    getResponse: true,
  });
}
export async function queryTeacherSurvey(survey) {
  return request('/api/manager/survey/querySurvey', {
    method: 'post',
    params: survey,
    getResponse: true,
  });
}
