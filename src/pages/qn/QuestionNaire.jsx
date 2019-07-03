import React from 'react';
import style from './Question.less';
import { connect } from 'dva';
import QuestionNaireForm from './QuestionNaireForm';
import { Button, Table, Icon, Modal, Form, Input, Radio } from 'antd';
const confirm = Modal.confirm;
{
  /*import axios from '../../http'*/
}
class QuestionNaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      form: {},
      selectedRowKeys: [],
    };
  }

  edit = (data, event) => {
    alert(1);
    console.log(data);
  };

  showModal = () => {
    this.setState({
      visible: true,
      form: {},
    });
  };

  handleOk = e => {
    e.preventDefault();
    this.form.validateFields((err, values) => {
      if (!err) {
        console.log('表单绑定的数据：', values);
      }
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  componentWillMount() {
    this.props.dispatch({ type: 'questionNaire/fetchQuestionNaire' });
  }
  //获取表单子组件的DOM
  getForm = form => {
    this.form = form;
  };
  toDelete = (id, event) => {
    confirm({
      title: '提示',
      content: '确定删除吗？',
      okText: '确认',
      cancelText: '取消',
      // 改成箭头函数
      onOk: () => {
        // message.success('id：'+id);
        //提交数据给后台进行删除
        this.props.dispatch({ type: 'questionNaire/deleteQuestionNaire', payload: id });
      },
    });
  };
  onSelectChange = (selectedRowKeys, e) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
    });
  };

  deleteAll = () => {
    this.props.dispatch({
      type: 'questionNaire/deleteAllQuestionNaire',
      payload: { ids: this.state.selectedRowKeys },
    });
  };
  render() {
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
    };

    const columns = [
      {
        title: '问卷名称',
        align: 'center',
        dataIndex: 'name',
      },
      {
        title: '问卷描述',
        align: 'center',
        dataIndex: 'description',
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: '',
        render: (text, record) => {
          return (
            <div>
              <Icon
                className={style.icon}
                type="edit"
                onClick={this.edit.bind(this, record)}
                title="修改"
              />
              <Icon
                type="delete"
                title="删除"
                onClick={this.toDelete.bind(this, record.id)}
                style={{ color: '#F52222' }}
              />
            </div>
          );
        },
      },
    ];

    return (
      <div className={style.questionNaire}>
        <Button type="primary" onClick={this.showModal}>
          添加
        </Button>
        <Button type="primary" onClick={this.deleteAll}>
          批量删除
        </Button>

        <Table
          rowSelection={rowSelection}
          size="small"
          rowKey="id"
          bordered
          pagination={false}
          columns={columns}
          dataSource={this.props.questionNaire.questionNaires}
        ></Table>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <QuestionNaireForm student={this.state.student} ref={this.getForm} />
        </Modal>
      </div>
    );
  }
}
export default connect(({ questionNaire }) => ({
  questionNaire,
}))(QuestionNaire);
