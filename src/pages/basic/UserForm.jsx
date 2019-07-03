import React from 'react';
import { Form, Modal, Input,Radio } from 'antd';
import { connect } from 'dva';

// 课程表单
class UserForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    // 父组件传递给子组件值
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    // 将表单中没有出现的值做一个双向数据绑定
    getFieldDecorator('id');
    getFieldDecorator('password');
    

    return (
      <Modal
        visible={visible}
        title="添加用户信息"
        okText="提交"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical" {...formLayout}>
          <Form.Item label="账号">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账号!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="姓名">
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入姓名！' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="性别" className="collection-create-form_last-form-item">
          {getFieldDecorator('gender', {
            initialValue: '男',
          })(
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="状态">
            {getFieldDecorator('enabled', {
              rules: [{  message: '请输入状态！' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="e-mail">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱！' }],
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
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

export default connect()(
  Form.create({
    mapPropsToFields,
  })(UserForm),
);
