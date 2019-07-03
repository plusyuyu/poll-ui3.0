import request from '@/utils/request';

// 封装所有异步请求
export async function query() {
  return request('/api/manager/survey/findAllSurveyVM');
}