import { querySurvey, findSurveyByClazzId } from "@/services/clazzsurvey";

export default {
    namespace: 'clazzSurvey',
    state: {
      loading: true,
      clazzsurveys: {data:{}},
      clazz:[],
    },
    effects: {
      *fetchClazzSurvey(_, { call, put }) {
        const response = yield call(querySurvey, { page: _.payload.page, pageSize: _.payload.pageSize });
        yield put({ type: 'reloadClazzSurvey',payload: response.data});
      },
      *fetchSurveyClazzId(_, { call, put }){
       
        const response = yield call(findSurveyByClazzId, {id:_.payload});
        //  response.data.forEach((item)=>{
        //   this.xdata.push(item.user.nickname);
        //   this.ydata.push(item.average);
        // })
        yield put({ type: 'findClazzSurvey',payload: response.data});
      }
    },
    reducers: {
      reloadClazzSurvey(state, action) {
        return {
          ...state,
          clazzsurveys: action.payload,
          loading: false,
          clazz:[]
        };
      },
      findClazzSurvey(state, action) {
        return {
          ...state,
          clazz:action.payload
        };
      },
    },
  };
  