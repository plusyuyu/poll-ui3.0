import { teacherSurvey, queryTeacherSurvey } from '@/services/teacher';

export default {
  namespace: 'teacherSurvey',
  state: {
    teacher: [],
    list: { data: {} },
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
    *fetchQuerySurvey(_, { call, put }) {
      const response = yield call(queryTeacherSurvey, {
        userId: _.payload.userId,
        month: _.payload.month,
        page: 0,
        pageSize: 100,
        statuses: '审核通过',
      });
      yield put({ type: 'reloadQuerySurvey', payload: response.data });
    },
  },
  reducers: {
    reloadTeacherSurvey(state, action) {
      return {
        ...state,
        teacher: action.payload,
      };
    },
    reloadQuerySurvey(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
