import React from 'react';
import { connect } from 'dva';
import { Button, Table, Icon, Modal } from 'antd';
import styles from '../basic/course.less';
import CreateForm from './CreateForm';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      form: {},
    };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'create/fetchCreates' });
  }

  // 取消按钮的事件处理函数
  handleCancel = () => {
    this.props.dispatch({ type: 'create/changeVisible', payload: false });
  };

  // 确认按钮的事件处理函数
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch({ type: 'create/saveOrUpdateCreate', payload: values });
    });
  };

  // 添加
  toAdd = () => {
    this.props.dispatch({ type: 'create/changeVisible', payload: true });
    this.setState({ form: {} });
  };
  // 修改
  toEdit = record => {
    this.setState({
      form: record,
    });
    this.props.dispatch({ type: 'create/changeVisible', payload: true });
  };

  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  // 通过id删除
  deleteSurveyById = id => {
    Modal.confirm({
      title: '确认删除吗？',
      content: 'Are you sure that you want to delete it?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // 编写代码进行删除
        this.props.dispatch({ type: 'create/deleteSurveyById', payload: id });
      },
      onCancel() {},
    });
  };

  // 关闭课调
  stopSurvey = id => {
    // let vm = this;
    Modal.confirm({
      title: '确认关闭该课调吗？',
      content: 'Are you sure to close the survey?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // 编写代码进行关闭
        this.props.dispatch({ type: 'create/stopSurvey', payload: id });
      },
      onCancel() {},
    });
  };

  render() {
    const columns = [
      {
        title: '年级',
        dataIndex: 'clazzVM.grade.name',
      },
      {
        title: '班级',
        dataIndex: 'clazzVM.name',
      },
      {
        title: '课程',
        dataIndex: 'course.name',
      },
      {
        title: '讲师',
        dataIndex: 'clazzVM.charge.nickname',
      },
      {
        title: '问卷',
        dataIndex: 'qnVM.name',
      },
      {
        title: '创建时间',
        dataIndex: 'surveydate',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '编号',
        dataIndex: 'id',
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div>
              <a title="删除">
                <Icon type="delete" onClick={this.deleteSurveyById.bind(this, record.id)} />
              </a>
              &nbsp;
              <a title="编辑">
                <Icon type="edit" onClick={this.toEdit.bind(this, record.id)} />
              </a>
              &nbsp;
              <a title="关闭课调">
                <Icon type="poweroff" onClick={this.stopSurvey.bind(this, record.id)} />
              </a>
              &nbsp;
              <a title="预览">
                <Icon type="search" onClick={() => alert('预览课调')} />
              </a>
              &nbsp;
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
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <div className={styles.content}>
        {/* 按钮 */}
        <div>
          <Button className="btns" type="primary" onClick={this.toAdd}>
            添加
          </Button>
          &nbsp;
          <Button className="btns" type="danger" disabled>
            批量删除
          </Button>
        </div>
        {/* 表格内容 */}
        <div>
          <Table
            size="small"
            rowSelection={rowSelection}
            rowKey="id"
            columns={columns}
            dataSource={this.props.create.creates}
          />
        </div>
        {/* 模态框 */}
        <CreateForm
          initData={this.state.form}
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.create.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default connect(({ create }) => ({
  create,
}))(Create);
