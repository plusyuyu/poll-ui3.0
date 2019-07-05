import {
  fetchMySurveyStatistics,
  fetchSurveyMonth,
  fetchSurveyDetails,
} from '@/services/mySurveyStatistic';

const mySurveyStatisticModel = {
  namespace: 'mySurveyStatistic',
  state: {
    mySurveyStatistics: [],
    month:[],
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
  },
  effects: {
    //获取所有信息
    *fetchMySurveyStatistics(_, { call, put }) {
      const response = yield call(fetchMySurveyStatistics);
      console.log(response.data)
      yield put({
        type: 'reloadMySurveyStatistics',
        payload: response.data.data.list,
      });
    },
    //按月查询
    *fetchSurveyMonth(_, { call, put }) {
      const response = yield call(fetchSurveyMonth, { month: _.payload });
      console.log(response.data.data)
      yield put({
        type: 'reloadSurveyMonth',
        payload: response.data.data,

      });
    },
    //详细信息
    *fetchSurveyDetails(_, { call, put }) {
      const response = yield call(fetchSurveyDetails, { id: _.payload });
      console.log('response', response);
      yield put({
        type: 'reloadSurveyDetails',
        payload: response.data,
      });
    },
  },
  reducers: {
    // 更新状态中的mySurveyStatistic
    reloadMySurveyStatistics(state, action) {
      return {
        ...state,
        mySurveyStatistics: action.payload,
      };
    },
    reloadSurveyDetails(state, action) {
      return {
        ...state,
        survey: action.payload,
      };
    },
    reloadSurveyMonth(state, action) {
      return {
        ...state,
        mySurveyStatistics: action.payload,
      };
    },
  },
};

export default mySurveyStatisticModel;
