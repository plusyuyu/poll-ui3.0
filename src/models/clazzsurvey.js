import { querySurvey, findSurveyByClazzId, allClazz } from '@/services/clazzsurvey';

export default {
  namespace: 'clazzSurvey',
  state: {
    loading: true,
    clazzsurveys: { data: {} },
    cla: [],
    clazzs: [],
  },
  effects: {
    *fetchClazzSurvey(_, { call, put }) {
      const response = yield call(querySurvey, _.payload);
      yield put({ type: 'reloadClazzSurvey', payload: response.data });
    },
    *fetchAllClazz(_, { call, put }) {
      const response = yield call(allClazz);
      yield put({ type: 'reloadClazzs', payload: response.data });
    },
    *fetchSurveyClazzId(_, { call, put }) {
      const response = yield call(findSurveyByClazzId, { id: _.payload });
      //  response.data.forEach((item)=>{
      //   this.xdata.push(item.user.nickname);
      //   this.ydata.push(item.average);
      // })
      yield put({ type: 'findClazzSurvey', payload: response.data });
    },
  },
  reducers: {
    reloadClazzSurvey(state, action) {
      return {
        ...state,
        clazzsurveys: action.payload,
        loading: false,
        cla: [],
      };
    },
    findClazzSurvey(state, action) {
      return {
        ...state,
        cla: action.payload,
      };
    },
    reloadClazzs(state, action) {
      return {
        ...state,
        clazzs: action.payload,
      };
    },
  },
};
