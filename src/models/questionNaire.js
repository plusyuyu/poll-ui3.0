import { query, toDelete, toDeleteAll, addOrupdate } from '@/services/questionNaire';

const QuestionNaireModel = {
  namespace: 'questionNaire',
  state: {
    questionNaires: [],
    visible: false,
  },
  effects: {
    // 获取所有课程信息
    *fetchQuestionNaire(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'reloadQuestionNaire',
        payload: response,
      });
    },
    *deleteQuestionNaire(_, { call, put }) {
      const response = yield call(toDelete, _.payload);
      yield put({ type: 'fetchQuestionNaire' });
    },
    *deleteAllQuestionNaire(_, { call, put }) {
      const response = yield call(toDeleteAll, _.payload);
      yield put({ type: 'fetchQuestionNaire' });
    },
    *addOrUpdate(_, { call, put }) {
      const response = yield call(addOrupdate, _.payload);
      yield put({ type: 'fetchQuestionNaire' });
    },
  },
  reducers: {
    // 更新状态中的courses
    reloadQuestionNaire(state, action) {
      return {
        ...state,
        questionNaires: action.payload.data,
      };
    },
  },
};

export default QuestionNaireModel;
