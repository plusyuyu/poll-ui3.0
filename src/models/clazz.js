import { query, toDelete } from '@/services/clazz';

const ClazzModel = {
  namespace: 'clazz',
  state: {
    clazzs: [],
  },
  effects: {
    // 获取所有班级信息
    *fetchClazz(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'reloadClazz',
        payload: response,
      });
    },
    *deleteClazz(_, { call, put }) {
      const response = yield call(toDelete, _.payload);
      yield put({
        type: 'fetchClazz',
      });
    },
  },
  reducers: {
    // 更新状态中的clazzs
    reloadClazz(state, action) {
      console.log(action.payload.data);
      return {
        ...state,
        clazzs: action.payload.data,
      };
    },
  },
};

export default ClazzModel;
