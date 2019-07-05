import request from '@/utils/request';
import { func } from 'prop-types';

// 封装所有异步请求
export async function fetchMySurveyStatistics() {
  const params = { page: 0, pageSize: 10, statuses: ['审核通过'] };
  return request('/api/manager/survey/querySurvey', {
    method: 'post',
    params: params,
    getResponse: true,
  });
}

export async function fetchSurveyDetails(id) {
  return request('http://134.175.154.93:9999/teacher/previewSurvey', { params: id });
}

export async function fetchSurveyMonth(survey) {
  return request('/api/manager/survey/statisticsByMonth', {
    method: 'post',
    params: survey,
    getResponse: true,
  });
}
