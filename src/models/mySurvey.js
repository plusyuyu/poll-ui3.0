import { fetchMySurveys,fetchSurveyDetails} from '@/services/mySurvey';

const mySurveyModel = {
  namespace: 'mySurvey',
  state: {
    mySurveys: [],
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
    *fetchMySurveys(_, { call, put }) {
      const response = yield call(fetchMySurveys,_.payload);
      yield put({
        type: 'reloadMySurveys',
        payload: response.data.data.list,
      });
    },
    // 下载
    *fetchdownLoadSurveyResult(_, { call, put }) {
      const response = yield call(downLoadSurveyResult, { id: _.payload });
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
    // 更新状态中的mySurvey
    reloadMySurveys(state, action) {
      return {
        ...state,
        mySurveys: action.payload,
      };
    },
    reloadSurveyDetails(state, action) {
      return {
        ...state,
        survey: action.payload,
      };
    },
    },
};

export default mySurveyModel;
