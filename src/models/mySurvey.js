import { query } from '@/services/mySurvey';

const mySurveyModel = {
  namespace: 'mySurvey',
  state: {
    mySurveys: [],
    survey: {
        average: '',
        course: { name: '' },
        clazzVM: { grade: { name: '' }, charge: {} },
        user: { nickname: '' },
        qnVM: { name: '' },
      },
  },
  effects: {
    //获取所有信息
    *fetchMySurveys(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'reloadMySurveys',
        payload: response.data,
      });
    },
    *setSurvey(action, { call, put }) {
        yield put({ type: 'setSurveys', payload: action.payload });
  },
  },
  reducers: {
    // 更新状态中的mySurvey
    reloadMySurveys(state, action) {
      return {
        ...state,
        mySurveys: action.payload,
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

export default mySurveyModel;
