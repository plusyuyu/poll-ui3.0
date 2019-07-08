import request from '@/utils/request';

// 封装所有异步请求
export async function fetchMySurveys(param) {
  return request('/api/teacher/querySurvey', {
    method: 'post',
    params: param,
    getResponse: true,
  });
}

export async function fetchSurveyDetails(id) {
  return request('http://134.175.154.93:9999/teacher/previewSurvey', { params: id });
}