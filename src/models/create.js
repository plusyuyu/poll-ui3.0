import { message } from 'antd';
import {
	query,
	deleteSurveyById,
	beginSurvey,
	saveOrUpdateCreate,
	batchDeleteSurveyById,
	findAllVM,
	findAllCourse,
	findAllQuestionnaire,
	findAllEnabled,
} from '@/services/create';

const CreateModel = {
	namespace: 'create',
	state: {
		creates: [],
		allVM: [],
		allCourse: [],
		allQuestionnaire: [],
		allEnabled: [],
	},
	effects: {
		// 获取所有课调信息
		*fetchCreates(_, { call, put }) {
			const response = yield call(query);
			var arr = new Array();
			var data = response.data.data.list;
			if (data) {
				for (var i = 0; i < data.length; i++) {
					var item = data[i];
					arr.push({
						grade: item.clazzVM.grade.name,
						clazz: item.clazzVM.name,
						coursename: item.course.name,
						teacher: item.user.nickname,
						survey: item.qnVM.name,
						date: item.surveydate,
						status: item.status,
						id: item.id,
						userID:item.user.id,
						courseID:item.course.id,
						gradeID:item.clazzVM.grade.id,
						questionnaireId:item.qnVM.id,
						clazzVM:item.clazzVM,
						course:item.course,
						user:item.user,
						qnVM:item.qnVM	
					});
				}
			}
			yield put({
				type: 'reloadCreates',
				payload: arr,
			});
		},
		* saveOrUpdateCreate(_, { call, put }) {
			const response = yield call(saveOrUpdateCreate, _.payload);
			message.success(response.message);
			yield put({ type: 'changeVisible', payload: false });
			yield put({ type: 'fetchCreates' });
		},
		* batchDeleteSurveyById(_, { call, put }) {
			const response = yield call(batchDeleteSurveyById, _.payload);
			message.success(response.data.message);
			yield put({ type: 'changeVisible', payload: false });
			yield put({ type: 'fetchCreates' });
		},
		* deleteSurveyById(_, { call, put }) {
			const response = yield call(deleteSurveyById, _.payload);
			message.success(response.message);
			yield put({
				type: 'fetchCreates',
				payload: response,
			});
		},
		* beginSurvey(_, { call, put }) {
			const response = yield call(beginSurvey, _.payload);
			message.success(response.message);
			yield put({
				type: 'fetchCreates',
				payload: response,
			});
		},
		* findAllVM(_, { call, put }) {
			const response = yield call(findAllVM);
			yield put({
				type: 'reloadAllVM',
				payload: response.data,
			});
		},
		* findAllCourse(_, { call, put }) {
			const response = yield call(findAllCourse);
			yield put({
				type: 'reloadAllCourse',
				payload: response.data,
			});
		},
		* findAllQuestionnaire(_, { call, put }) {
			const response = yield call(findAllQuestionnaire);
			yield put({
				type: 'reloadAllQuestionnaire',
				payload: response.data,
			});
		},
		* findAllEnabled(_, { call, put }) {
			const response = yield call(findAllEnabled);
			yield put({
				type: 'reloadAllEnabled',
				payload: response.data,
			});
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
				creates: action.payload,
			};
		},
		reloadAllVM(state, action) {
			return {
				...state,
				allVM: action.payload,
			};
		},
		reloadAllCourse(state, action) {
			return {
				...state,
				allCourse: action.payload,
			};
		},
		reloadAllQuestionnaire(state, action) {
			return {
				...state,
				allQuestionnaire: action.payload,
			};
		},
		reloadAllEnabled(state, action) {
			return {
				...state,
				allEnabled: action.payload,
			};
		},
	},
};

export default CreateModel;
