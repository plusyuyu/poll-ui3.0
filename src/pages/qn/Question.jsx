import React from 'react';
import style from './Question.less';
import { connect } from 'dva';
import QuestionForm from './QuestionForm';

import { Button, Table, Icon, Card, Checkbox, Modal } from 'antd';
const confirm = Modal.confirm;
class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      form: {},
    };
  }

  edit = (data, event) => {
    // console.log('=========',data)
    this.setState({
      visible: true,
      form: this.props.question.questions[data],
    });

    // console.log(this.props.question.questions);
  };

  componentWillMount() {
    this.props.dispatch({ type: 'question/fetchQuestion' });
    console.log('======', this.props.question.questions);
  }

  onChange = e => {
    console.log(e.target.checked);
  };

  deleteQuerstion = id => {
    confirm({
      title: '提示',
      content: '确定删除吗？',
      okText: '确认',
      cancelText: '取消',
      // 改成箭头函数
      onOk: () => {
        // message.success('id：'+id);
        //提交数据给后台进行删除
        this.props.dispatch({ type: 'question/deleteQuestion', payload: id });
      },
    });
  };

  handleOk = e => {
    e.preventDefault();
    const newForm = this.formRef.props.form;
    newForm.validateFields((err, values) => {
      if (!err) {
        var a = this.formRef.state.options;
        values.options = a;
        this.props.dispatch({ type: 'question/addOrUpdate', payload: values });
      }
    });
    this.setState({
      visible: false,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      form: {},
    });
  };

  //获取表单子组件的DOM
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <div className={style.question}>
        <Button type="primary" onClick={this.showModal}>
          添加
        </Button>
        {/*<Button type="primary">批量删除</Button>*/}
        <div>
          {this.props.question.questions.map((item, index) => {
            return (
              <Card
                className={style.card}
                key={index}
                title={
                  <span>
                    {item.name}
                    <span className={style.qType}>{item.questionType}</span>
                  </span>
                }
                extra={
                  <span>
                    <Icon
                      className={style.icon}
                      type="edit"
                      title="修改"
                      onClick={this.edit.bind(this, index)}
                    />{' '}
                    <Icon
                      type="delete"
                      title="删除"
                      onClick={this.deleteQuerstion.bind(this, item.id)}
                      style={{ color: '#F52222' }}
                    />
                  </span>
                }
                bordered
                style={{ width: 300 }}
              >
                {item.options.map((ite, inde) => {
                  return (
                    <p key={ite.id}>
                      {ite.label}：{ite.name}
                    </p>
                  );
                })}
              </Card>
            );
          })}
          <Modal
            title="题库"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={'900px'}
          >
            <QuestionForm initData={this.state.form} wrappedComponentRef={this.saveFormRef} />
          </Modal>
        </div>
      </div>
    );
  }
}
export default connect(({ question }) => ({
  question,
}))(Question);
