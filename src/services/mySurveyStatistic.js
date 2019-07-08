import request from '@/utils/request';
import { func } from 'prop-types';

// 封装所有异步请求
export async function fetchMySurveyStatistics(param) {
  return request('/api/manager/survey/querySurvey', {
    method: 'post',
    params: param,
    getResponse: true,
  });
}

export async function fetchSurveyDetails(id) {
  return request('http://134.175.154.93:9999/teacher/previewSurvey', { params: id });
}

export async function fetchSurveyCard(id) {
  return request('/api/manager/survey/findSurveyVMById', { params: id });
}

