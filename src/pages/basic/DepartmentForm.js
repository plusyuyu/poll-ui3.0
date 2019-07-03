import React from 'react';
import { Form, Input } from 'antd';
const { TextArea } = Input;
class DepartmentForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator('id');
    return (
      <div>
        <Form className="login-form">
          <Form.Item label="年级名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入年级名称!' }],
            })(<Input placeholder="年级名称" />)}
          </Form.Item>
          <Form.Item label="年级简介">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入年级简介!' }],
            })(<TextArea rows={2} />)}
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
})(DepartmentForm);
