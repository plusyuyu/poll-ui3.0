import React from 'react';
import { Button,Table,message,Icon,Radio,Modal} from 'antd';
import { connect } from 'dva';
// import {connect} from 'react-redux'
import styles from './user.less';
import UserForm from './UserForm';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state={
      visible:false,
      form:{},
    };
  }
  componentWillMount(){
    this.props.dispatch({type:"user/fetchUsers"})
  }
  // 取消按钮的事件处理函数
  handleCancel = () => {
    this.props.dispatch({ type: 'user/changeVisible', payload: false });
  };

  // 确认按钮的事件处理函数
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values)
      this.props.dispatch({ type: 'user/saveOrUpdateUser', payload: values });
    });
  };
  addHandle = () => {
    this.props.dispatch({ type: 'user/changeVisible', payload: true });
    this.setState({ form: {} });
  };
  delHandle(id) {
    Modal.confirm({
      title: '确认删除吗？',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk:()=> {
    this.props.dispatch({ type: 'user/fetchDeleteUsers', payload: id });
  }
})
  }
  
  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render(){
    const columns = [
      {
        title: '账号',
        dataIndex: 'username',
      },
      {
        title: '姓名',
        dataIndex: 'nickname',
      },
      {
        title: '性别',
        dataIndex: 'gender',
      },
      {
        title: '状态',
        dataIndex: 'enabled',
      },
      {
        title: 'e-mail',
        dataIndex: 'email',
      },
      {
        title: '操作',
        width:100,
        align:'center',
        render:(text,record)=>{
          return(
            <div>
              <Icon type="delete" onClick={this.delHandle.bind(this,record.id)} />  
            </div>
            
            );
          },
        },
      ];
    
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', 
        name: record.name,
      }),
    };

    return (
      <div className={styles.content}>
        <div className="btns">
          <Button type="primary" onClick={this.addHandle}>添加</Button>&nbsp;
          <Button type="danger" onClick={this.batchDel}>批量删除</Button>
        </div>
        <Table
            bordered
            rowKey="id"
            size="small"
            rowSelection={rowSelection}
            columns={columns} dataSource={this.props.user.users}/>
       <UserForm
            initData={this.state.form}
            wrappedComponentRef={this.saveFormRef}
            visible={this.props.user.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
      />
      </div>
  
    );
  }
}

export default connect(({ user }) => ({
  user,
}))(User);