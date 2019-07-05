import React from 'react';
import { Form, Input, Radio, Select, Button, Modal, Checkbox } from 'antd';
import { connect } from 'dva';
import style from './Question.less';
const { Option } = Select;
const ids = [];
class QuestionNaireForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      questions: [],
      ids: [],
    };
  }
  componentWillMount() {
    this.reset();
  }
  reset = () => {
    this.setState({
      ids: [],
    });
  };
  handleSelectChange = value => {
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };
  showModal = () => {
    this.props.dispatch({ type: 'question/fetchQuestion' });
    this.setState({
      visible: true,
      questions: this.props.question.questions,
    });
    this.reset();
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  onChange = (id, e) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      ids.push(id);
      this.setState({
        ids: ids,
      });
    } else if (e.target.checked === false) {
      ids.forEach((item, index) => {
        if (item === id) {
          ids.pop(item);
          this.setState({
            ids: ids,
          });
        }
      });
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    //将id添加到双向数据绑定里，并不做其他的修饰
    getFieldDecorator('id');
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item label="问卷名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入问卷名称!' }],
            })(<Input placeholder="请输入问卷名称" />)}
          </Form.Item>
          <Form.Item label="问卷简介">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入问卷简介!' }],
            })(<Input type="TextArea " placeholder="请输入问卷简介" />)}
          </Form.Item>
          <Form.Item label="问卷题目">
            {getFieldDecorator('questionIds', {
              rules: [{}],
            })(
              <Button type="primary" onClick={this.showModal}>
                点击选择
              </Button>,
            )}
          </Form.Item>
        </Form>
        <Modal
          title="问卷"
          width={'700px'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.questions.map((item, index) => {
            return (
              <span key={index}>
                <Checkbox onChange={this.onChange.bind(this, item.id)}>{item.name}</Checkbox>
                <br />
              </span>
            );
          })}
        </Modal>
      </div>
    );
  }
}
//设置表单数据的默认值
const mapPropsToFields = props => {
  let obj = {};
  for (let key in props.questionNairee) {
    let val = props.questionNairee[key];
    obj[key] = Form.createFormField({ value: val });
  }
  return obj;
};
// const WrappedQuestionNaireForm = Form.create({name: 'student_form',mapPropsToFields})(QuestionNaireForm);

export default connect(({ question }) => ({
  question,
}))(
  Form.create({
    mapPropsToFields,
  })(QuestionNaireForm),
);
