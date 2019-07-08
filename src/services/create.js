import request from '@/utils/request';
import qs from 'qs';
/* 封装所有的异步请求 */

/* 查询符合条件的课调 */
export async function query() {
  const params = { page: 0, pageSize: 10, statuses: ['未开启', '开启'] };
  return request('/api/manager/survey/querySurvey', {
    method: 'post',
    params: params,
    getResponse: true,
    // headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  });
}

/* 保存或更新课调 */
export async function saveOrUpdateCreate(param) {
  return request('/api/manager/survey/saveOrUpdateSurvey', {
    method: 'post',
    data: qs.stringify(param),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

export async function findAllClazzVM() {
  return request('/api/manager/clazz/findAllVM');
}

/* 通过ID批量删除课调 */
export async function batchDeleteSurveyById(ids) {
  const params = { ids: ids };
  return request('/api/manager/survey/batchDeleteSurveyById', {
    method: 'post',
    params: params,
    getResponse: true,
  });
}

/* 通过ID删除课调 */
export async function deleteSurveyById(id) {
  return request('/api/manager/survey/deleteSurveyById?id=' + id);
}

/* 开启课调 */
export async function beginSurvey(id) {
  return request('/api/manager/survey/beginSurvey?id=' + id);
}

/* 查询所有班级 */
export async function findAllVM() {
  return request('/api/manager/clazz/findAllVM');
}

/* 查询所有课程信息 */
export async function findAllCourse() {
  return request('/api/manager/course/findAllCourse');
}

/* 查询所有问卷 */
export async function findAllQuestionnaire() {
  return request('/api/manager/questionnaire/findAllQuestionnaire');
}

/* 查询有效用户 */
export async function findAllEnabled() {
  return request('/api/manager/user/findAllEnabled');
}
