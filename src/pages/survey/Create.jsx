import React from 'react';
import { connect } from 'dva';
import { Button, Table, Icon, Modal } from 'antd';
import styles from '../basic/course.less';
import CreateForm from './CreateForm';
import ReviseFrom from './ReviseFrom';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      form: {},
      ids: [],
    };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'create/fetchCreates' });
    this.props.dispatch({ type: 'create/findAllVM' });
    this.props.dispatch({ type: 'create/findAllCourse' });
    this.props.dispatch({ type: 'create/findAllQuestionnaire' });
    this.props.dispatch({ type: 'create/findAllEnabled' });
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
    console.log('修改课调', JSON.stringify(record));
    this.setState({
      form: record,
    });
    this.props.dispatch({ type: 'create/changeVisible', payload: true });
  };

  // 预览课调
  toLook = record => {
    this.props.dispatch({ type: 'create/changeVisible', payload: true });
    this.setState({ form: {} });
    console.log('预览课调', JSON.stringify(record));
  };

  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  // 批量删除
  batchDeleteSurveyById() {
    let ids = this.state.ids;
    Modal.confirm({
      title: '确认删除选中的数据吗？',
      content: 'Do you confirm deletion?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // 编写代码进行删除
        this.props.dispatch({ type: 'create/batchDeleteSurveyById', payload: ids });
      },
      onCancel() {},
    });
  }
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

  // 开启课调
  beginSurvey = id => {
    Modal.confirm({
      title: '确认开启该课调吗？',
      content: 'Are you sure to start the survey?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // 编写代码进行开启
        this.props.dispatch({ type: 'create/beginSurvey', payload: id });
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
        dataIndex: 'user.nickname',
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
                <Icon type="edit" onClick={this.toEdit.bind(this, record)} />
              </a>
              &nbsp;
              <a title="开启课调">
                <Icon type="poweroff" onClick={this.beginSurvey.bind(this, record.id)} />
              </a>
              &nbsp;
              <a title="预览">
                <Icon type="search" onClick={this.toLook.bind(this, record)} />
              </a>
              &nbsp;
            </div>
          );
        },
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ ids: selectedRowKeys });
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
          <Button className="btns" type="danger" onClick={this.batchDeleteSurveyById.bind(this)}>
            批量删除
          </Button>
        </div>
        {/* 表格内容 */}
        <div>
          <Table
            bordered
            rowKey="id"
            size="small"
            rowSelection={rowSelection}
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
