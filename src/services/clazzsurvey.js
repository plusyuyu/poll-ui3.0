import request from '@/utils/request';

export async function querySurvey(survey) {
  return request('/api/manager/clazz/queryClazzVM', {
    method: 'get',
    params: survey,
    getResponse: true,
  });
}

export async function allClazz() {
  return request('/api/manager/grade/findAll');
}

export async function findSurveyByClazzId(id) {
  return request('/api/manager/survey/findSurveyByClazzId', { params: id });
}
