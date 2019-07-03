import request from '@/utils/request';
import qs from 'qs';
/* 封装所有的异步请求 */
export async function query() {
  return request('/api/manager/survey/findAllSurveyVM');
}

export async function findAllClazzVM() {
  return request('/api/manager/clazz/findAllVM');
}

/* 通过ID删除课调 */
export async function deleteSurveyById(id) {
  return request('/api/manager/survey/deleteSurveyById?id=' + id);
}

/* 关闭课调 */
export async function stopSurvey(id) {
  return request('/api/manager/survey/stopSurvey?id=' + id);
}

/* 保存或更新课调 */
export async function saveOrUpdateCreate(param) {
  return request('/api/manager/survey/saveOrUpdateSurvey', {
    method: 'post',
    data: qs.stringify(param),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
