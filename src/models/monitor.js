import { message } from 'antd';
import { query, surveyProcess } from '@/services/monitor';

const MonitorModel = {
  namespace: 'monitor',
  state: {
    monitors: [],
    surveyProcessData: [],
  },
  effects: {
    // 获取所有课调信息
    *fetchMonitors(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'reloadMonitors',
        payload: response,
      });
    },
    // 查询课调进度
    *surveyProcess(_, { call, put }) {
      const response = yield call(surveyProcess, _.payload);
      message.success('已经有' + response.data + '人已经提交了答卷');
      yield put({
        type: 'reloadMonitors',
        surveyprocessdata: response.data,
      });
    },
    *stopSurvey(_, { call, put }) {
      const response = yield call(stopSurvey, _.payload);
      message.success(response.message);
      yield put({
        type: 'fetchCreates',
        payload: response,
      });
    },
  },
  reducers: {
    // 更新状态中的monitors
    reloadMonitors(state, action) {
      return {
        ...state,
        monitors: action.payload.data,
        surveyProcessData: action.payload.surveyprocessdata,
      };
    },
  },
};

export default MonitorModel;
