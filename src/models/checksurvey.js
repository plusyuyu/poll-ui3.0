import { findCheckSurvey, saveSurvey } from '@/services/checksurvey';
import qs from 'qs';

export default {
  namespace: 'checkSurvey',
  state: {
    loading: true,
    checksurveys: [],
    survey: {
      average: '',
      course: { name: '' },
      clazzVM: { grade: { name: '' }, charge: {} },
      user: { nickname: '' },
      qnVM: { name: '' },
    },
  },
  effects: {
    *fetchCheckSurvey(_, { call, put }) {
      const response = yield call(findCheckSurvey);

      yield put({ type: 'reloadCheckSurvey', payload: response.data.data });
    },
    *fetchSaveSurvey(_, { call, put }) {
      const response = yield call(saveSurvey, { id: _.payload.id, status: _.payload.status });
      yield put({ type: 'fetchAllSurvey' });
    },
    *setSurvey(action, { call, put }) {
      yield put({ type: 'setSurveys', payload: action.payload });
    },
  },
  reducers: {
    reloadCheckSurvey(state, action) {
      return {
        ...state,
        checksurveys: action.payload,
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
