import {
  fetchMySurveyStatistics,
  fetchSurveyDetails,
  fetchSurveyCard
} from '@/services/mySurveyStatistic';

const mySurveyStatisticModel = {
  namespace: 'mySurveyStatistic',
  state: {
    mySurveyStatistics: [],
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
    max:{
      average:'',
      clazzVM: { name: '' },
      user: { nickname: '' },
      course: { name: '' },
      qnVM: { name: '' },
    },
    min:{
      average:'',
      clazzVM: { name: '' },
      user: { nickname: '' },
      course: { name: '' },
      qnVM: { name: '' },
    }
  },
  effects: {
    //获取所有信息
    *fetchMySurveyStatistics(_, { call, put }) {
      const response = yield call(fetchMySurveyStatistics,_.payload);
      console.log(response)
      yield put({
        type: 'reloadMySurveyStatistics',
        payload: response.data.data.list,
      });
    },
    //卡片最大值信息
    *fetchSurveyCard(_, { call, put }) {
      // console.log('response', response);
      yield put({
        type: 'reloadSurveyCard',
        payload: _.payload,
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
    reloadSurveyCard(state, action) {
      return {
        ...state,
        max: action.payload.max,
        min: action.payload.min,
      };
    },
  },
};

export default mySurveyStatisticModel;
