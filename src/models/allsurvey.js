import { findAll, deleteSurvey, downLoadSurveyResult, saveSurvey } from '@/services/allsurvey';

export default {
  namespace: 'allSurvey',
  state: {
    loading: true,
    surveys: [],
    survey: {
      average: '',
      course: { name: '' },
      clazzVM: { grade: { name: '' }, charge: {} },
      user: { nickname: '' },
      qnVM: { name: '' },
    },
  },
  effects: {
    *fetchAllSurvey(_, { call, put }) {
      const response = yield call(findAll);
      yield put({ type: 'reloadAllSurvey', payload: response.data });
    },
    *fetchDeleteSurvey(_, { call, put }) {
      const response = yield call(deleteSurvey, { id: _.payload });
      yield put({ type: 'fetchAllSurvey' });
    },
    *fetchdownLoadSurveyResult(_, { call, put }) {
      const response = yield call(downLoadSurveyResult, { id: _.payload });
    },
    *setSurvey(action, { call, put }) {
      yield put({ type: 'setSurveys', payload: action.payload });
    },
  },
  reducers: {
    reloadAllSurvey(state, action) {
      return {
        ...state,
        surveys: action.payload,
        loading: false,
      };
    },
    setSurveys(state, action) {
      return {
        ...state,
        survey: action.payload,
      };
    },
  },
};
