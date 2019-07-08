import { queryClazz, toDelete, batchDelete,toSaveOrUpdate,queryClazzVM} from '@/services/clazz';

const ClazzModel = {
  namespace: 'clazz',
  state: {
    clazzs: [],
  },
  effects: {
    // 获取所有班级信息
    *fetchClazz(_, { call, put }) {
      const response = yield call(queryClazz);
      yield put({
        type: 'reloadClazz',
        payload: response,
      });
    },
    // 筛选班级
    *queryC(_, { call, put }) {
      const response = yield call(queryClazzVM, _.payload);
      yield put({
        type: 'findClazz',
        payload:response
      });
    },
    // 删除单个班级
    *deleteClazz(_, { call, put }) {
      const response = yield call(toDelete, _.payload);
      yield put({
        type: 'fetchClazz',
      });
    },
    // 批量删除
    *batchClazz(_, { call, put }) {
      const response = yield call(batchDelete, _.payload);
      yield put({
        type: 'fetchClazz',
      });
    },
    // 保存或更新
    *saveClazz(_, { call, put }) {
      const response = yield call(toSaveOrUpdate, _.payload);
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
    findClazz(state, action) {
      console.log(action.payload.data.list,'-----');
      return {
        ...state,
        clazzs: action.payload.data.list,
      };
    },
  },
};

export default ClazzModel;
