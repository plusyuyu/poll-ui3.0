import { message } from 'antd';
import { query, deleteSurveyById, stopSurvey, saveOrUpdateCreate } from '@/services/create';

const CreateModel = {
  namespace: 'create',
  state: {
    creates: [],
  },
  effects: {
    // 获取所有课调信息
    *fetchCreates(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'reloadCreates',
        payload: response,
      });
    },
    *fetchAllClazzVM(_, { call, put }) {
      const response = yield call(findAllClazzVM);
      yield put({
        type: 'reloadAllClazzVM',
        payload: response,
      });
    },
    *deleteSurveyById(_, { call, put }) {
      const response = yield call(deleteSurveyById, _.payload);
      message.success(response.message);
      yield put({
        type: 'fetchCreates',
        payload: response,
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
    *saveOrUpdateCreate(_, { call, put }) {
      const response = yield call(saveOrUpdateCreate, _.payload);
      message.success(response.message);
      yield put({ type: 'changeVisible', payload: false });
      yield put({ type: 'fetchCourses' });
    },
  },
  reducers: {
    // 更改模态框的显示状态
    changeVisible(state, action) {
      return {
        ...state,
        visible: action.payload,
      };
    },
    // 更新状态中的creates
    reloadCreates(state, action) {
      return {
        ...state,
        creates: action.payload.data,
      };
    },
    // reloadAllClazzVM(state, action) {
    //     return {
    //         ...state,
    //         creates: action.payload.data1
    //     }
    // }
  },
};

export default CreateModel;
