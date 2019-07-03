import {query} from "@/services/mySurvey"

const mySurveyModel={
    namespace:"mySurvey",
    state:{
        mySurveys:[],
    },
    effects:{
        //获取所有信息
        *fetchMySurveys(_,{call ,put}){
            const response=yield call(query);
            yield put({
                type:'reloadMySurveys',
                payload:response,
            });
        }  
    },
    reducers:{
        // 更新状态中的mySurvey
        reloadMySurveys(state, action) {
          return {
            ...state,
            mySurveys:action.payload.data
          }
        }       
    }
}

export default mySurveyModel;