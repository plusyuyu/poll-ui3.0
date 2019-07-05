import { teacherSurvey } from '@/services/teacher';

export default {
  namespace: 'teacherSurvey',
  state: {
    teacher: [],
  },
  effects: {
    *fetchTeacherSurvey(_, { call, put }) {
      const response = yield call(teacherSurvey, {
        month: _.payload,
        page: 0,
        pageSize: 100,
        status: '审核通过',
      });
      yield put({ type: 'reloadTeacherSurvey', payload: response.data.data });
    },
  },
  reducers: {
    reloadTeacherSurvey(state, action) {
      return {
        ...state,
        teacher: action.payload,
      };
    },
  },
};
