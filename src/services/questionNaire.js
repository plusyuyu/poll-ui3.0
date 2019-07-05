import request from '@/utils/request';
import qs from 'qs';
/* 封装所有的异步请求 */
export async function query() {
  return request('/api/manager/questionnaire/findAllQuestionnaire');
}

export async function toDelete(id) {
  return request('/api/manager/questionnaire/deleteQuestionnaireById?id=' + id);
}
export async function toDeleteAll(param) {
  return request('/api/manager/questionnaire/batchDeleteQuestion', {
    method: 'post',
    data: qs.stringify(param, { arrayFormat: 'repeat' }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
export async function addOrupdate(param) {
  return request('/api/manager/questionnaire/saveOrUpdateQuestionnaire', {
    method: 'post',
    data: qs.stringify(param, { arrayFormat: 'repeat' }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
