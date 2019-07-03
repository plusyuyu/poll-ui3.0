import React from 'react';
import { Form, Input, Radio, Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;

class QuestionNaireForm extends React.Component {
  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    //将id添加到双向数据绑定里，并不做其他的修饰
    getFieldDecorator('id');
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="问卷名称">
          {getFieldDecorator('realname', {
            rules: [{ required: true, message: '请输入真实姓名!' }],
          })(<Input placeholder="请输入真实姓名" />)}
        </Form.Item>
        <Form.Item label="问卷简介">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(<Input type="TextArea " placeholder="请输入用户名" />)}
        </Form.Item>
        {/* <Form.Item label="问卷题目">
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>,
          )}
        </Form.Item>*/}
      </Form>
    );
  }
}
//设置表单数据的默认值
const mapPropsToFields = props => {
  let obj = {};
  for (let key in props.initData) {
    let val = props.initData[key];
    obj[key] = Form.createFormField({ value: val });
  }
  return obj;
};
// const WrappedQuestionNaireForm = Form.create({name: 'student_form',mapPropsToFields})(QuestionNaireForm);

export default connect()(
  Form.create({
    mapPropsToFields,
  })(QuestionNaireForm),
);
