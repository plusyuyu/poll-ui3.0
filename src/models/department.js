import { query, toDelete, toSaveOrUpdate, batchDelete } from '@/services/department';

const DepartmentModel = {
  namespace: 'department',
  state: {
    departments: [],
  },
  effects: {
    // 获取所有学校信息
    *fetchDepartment(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'reloadDepartment',
        payload: response,
      });
    },
    // 单个删除
    *deleteDepartment(_, { call, put }) {
      const response = yield call(toDelete, _.payload);
      // 将type设置为fetchDepartment，即删除一次后，再次获取一次数据
      yield put({
        type: 'fetchDepartment',
      });
    },
    // 批量删除
    *batchDepartment(_, { call, put }) {
      const response = yield call(batchDelete, _.payload);
      // 将type设置为fetchDepartment，即删除一次后，再次获取一次数据
      yield put({
        type: 'fetchDepartment',
      });
    },
    // 保存或修改
    *saveDepartment(_, { call, put }) {
      const response = yield call(toSaveOrUpdate, _.payload);
      yield put({
        type: 'fetchDepartment',
      });
    },
  },
  reducers: {
    // 更新状态中的schools
    reloadDepartment(state, action) {
      console.log(action.payload.data);
      return {
        ...state,
        departments: action.payload.data,
      };
    },
  },
};
export default DepartmentModel;
