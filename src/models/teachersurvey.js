import { teacherSurvey, queryTeacherSurvey } from '@/services/teacher';

export default {
  namespace: 'teacherSurvey',
  state: {
    teacher: [],
    user:[],
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
    *fetchUserSurvey(_, { call, put }) {
      const response = yield call(teacherSurvey, {
        month: _.payload,
        page: 0,
        pageSize: 100,
        status: '审核通过',
      });
      yield put({ type: 'reloadUserSurvey', payload: response.data.data });
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
    *setTeacher(action,{call,put}){
      yield put({type:'reloadTeacherSurvey',payload:action.payload});
    },
    *setUser(action,{call,put}){
      yield put({type:'reloadUserSurvey',payload:action.payload});
    }
  },
  reducers: {
    reloadTeacherSurvey(state, action) {
      return {
        ...state,
        teacher: action.payload,
      };
    },
    reloadUserSurvey(state, action) {
      return {
        ...state,
        user: action.payload,
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
