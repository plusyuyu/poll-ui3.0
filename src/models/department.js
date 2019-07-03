import { query, toDelete, toSaveOrUpdate } from '@/services/department';

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
    *deleteDepartment(_, { call, put }) {
      const response = yield call(toDelete, _.payload);
      // 将type设置为fetchDepartment，即删除一次后，再次获取一次数据
      yield put({
        type: 'fetchDepartment',
      });
    },
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
