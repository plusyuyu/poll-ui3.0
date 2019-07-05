import {
  findAll,
  deleteSurvey,
  downLoadSurveyResult,
  saveSurvey,
  previewSurvey,
  findAllClazz,
  findAllTeacher,
} from '@/services/allsurvey';

export default {
  namespace: 'allSurvey',
  state: {
    loading: true,
    surveys: [],
    survey: {
      surveyVM: {
        average: '',
        course: { name: '' },
        clazzVM: { grade: { name: '' }, charge: {} },
        user: { nickname: '' },
        qnVM: { name: '' },
      },
      answers: [''],
    },
    teachers: [],
    clazzs: [],
  },
  effects: {
    *fetchAllSurvey(_, { call, put }) {
      const response = yield call(findAll, _.payload);
      yield put({ type: 'reloadAllSurvey', payload: response.data.list });
    },
    *fetchAllTeacher(_, { call, put }) {
      const response = yield call(findAllTeacher);
      yield put({ type: 'loadAllTeachers', payload: response.data });
    },
    *fetchAllClazz(_, { call, put }) {
      const response = yield call(findAllClazz);
      yield put({ type: 'loadAllClazzs', payload: response.data });
    },
    *fetchDeleteSurvey(_, { call, put }) {
      const response = yield call(deleteSurvey, { id: _.payload });
      yield put({ type: 'fetchAllSurvey' });
    },
    *fetchdownLoadSurveyResult(_, { call, put }) {
      const response = yield call(downLoadSurveyResult, { id: _.payload });
    },
    *setSurvey(action, { call, put }) {
      const response = yield call(previewSurvey, { id: action.payload });
      yield put({ type: 'setSurveys', payload: response.data });
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
    loadAllTeachers(state, action) {
      return {
        ...state,
        teachers: action.payload,
      };
    },
    loadAllClazzs(state, action) {
      return {
        ...state,
        clazzs: action.payload,
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
