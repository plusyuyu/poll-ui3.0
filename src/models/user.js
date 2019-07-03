import { message } from 'antd';
import { query, saveOrUpdate, deleteUsers } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    users: [],
    visible: false,
  },
  effects: {
    // 获取所有用户信息
    *fetchUsers(_, { call, put }) {
      const response = yield call(query);
      // alert(JSON.stringify(response.data))
      yield put({
        type: 'reloadUsers',
        payload: response.data,});
    },
    *saveOrUpdateUser(_, { call, put }) {
      const response = yield call(saveOrUpdate, _.payload);
      message.success(response.message);
      yield put({ type: 'changeVisible', payload: false });
      yield put({ type: 'fetchUsers'});
  },
  *fetchDeleteUsers(_, { call, put }) {
    yield call(deleteUsers, {id: _.payload});
    yield put({ type: 'fetchUsers' });
  },

  *batchDeleteUser(_, { call, put }) {
    const response = yield call(batchDelete, _.payload);
    message.success(response.message);
    yield put({ type: 'batchDelete', payload: false });
    yield put({ type: 'fetchUsers' });
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
    // 更新状态中的users
    reloadUsers(state, action) {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
};
export default UserModel;
