import {query,toDelete,addOrupdate} from "@/services/question"

const CourseModel = {
  namespace:"question",
  state: {
    questions: [],
  },
  effects: {
    // 获取所有课程信息
    *fetchQuestion(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'reloadQuestion',
        payload: response,
      });
    },
     *deleteQuestion(_, { call, put }) {
      const response = yield call(toDelete, _.payload);
      yield put({ type: 'fetchQuestion' });
    },
     *addOrUpdate(_, { call, put }) {
      const response = yield call(addOrupdate, _.payload);
      yield put({ type: 'fetchQuestion' });
    },
  },
  reducers:{
    // 更新状态中的courses
    reloadQuestion(state, action) {
      return {
        ...state,
        questions:action.payload.data
      }
    }
  }
}

export default CourseModel;