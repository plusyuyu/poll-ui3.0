import { query } from '@/services/mySurveyStatistic';


const mySurveyStatisticModel = {
    namespace: 'mySurveyStatistic',
    state: {
      mySurveyStatistics: [],
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
      *fetchMySurveyStatistics(_, { call, put }) {
        const response = yield call(query);
        yield put({
          type: 'reloadMySurveyStatistics',
          payload: response.data,
        });
      },
      *setSurvey(action, { call, put }) {
          yield put({ type: 'setSurveys', payload: action.payload });
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
      setSurveys(state, action) {
          return {
            ...state,
            survey: action.payload,
          };
        },
      },
  };
  
  export default mySurveyStatisticModel;
  