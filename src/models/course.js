import {query} from "@/services/course"

const CourseModel = {
  namespace:"course",
  state: {
    courses: [],
  },
  effects: {
    // 获取所有课程信息
    *fetchCourses(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'reloadCourses',
        payload: response,
      });
    }
  },
  reducers:{
    // 更新状态中的courses
    reloadCourses(state, action) {
      return {
        ...state,
        courses:action.payload.data
      }
    }
  }
}

export default CourseModel;