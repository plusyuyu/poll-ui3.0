import { query } from '@/services/school';


const SchoolModel = {
  namespace: 'school',
  state: {
    schools: {},
  },
  effects: {
    // 获取所有课程信息
    *fetchSchool(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'reloadSchool',
        payload: response,
      });
    },
  },
  reducers: {
    // 更新状态中的schools
    reloadSchool(state, action) {
      console.log(action.payload.data);
      return {
        ...state,
        schools: action.payload.data,
      };
    },
  },
};

export default SchoolModel;
