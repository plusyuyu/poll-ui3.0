import React from 'react';
import { Form, Input,Select } from 'antd';
const { TextArea } = Input;
class ClazzForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator('id');
    return (
      <div>
        <Form className="login-form">
          <Form.Item label="班级名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入班级名称!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="所属年级">
            {getFieldDecorator('description')(<Select></Select>)}
          </Form.Item>
          <Form.Item label="所属班主任">
            {getFieldDecorator('description')(<Select></Select>)}
          </Form.Item>
          <Form.Item label="班级简介">
            {getFieldDecorator('description')(<TextArea rows={2} />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

// 将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = props => {
  let obj = {};
  for (let key in props.initData) {
    let val = props.initData[key];
    obj[key] = Form.createFormField({ value: val });
  }
  return obj;
};  

export default Form.create({
  mapPropsToFields,
})(ClazzForm);
