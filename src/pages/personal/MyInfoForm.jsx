import React from 'react';
import { Form, Modal, Input, Radio, Select } from 'antd';
import { connect } from 'dva';

// 修改密码表单
class MyInfoForm extends React.Component {
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
    const { Option } = Select;
    // 将表单中没有出现的值做一个双向数据绑定
    getFieldDecorator('id');
    getFieldDecorator('password');
    return (
      <Modal visible={visible} title="更改密码" okText="提交" onCancel={onCancel} onOk={onCreate}>
        <Form layout="vertical" {...formLayout}>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入新密码',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请重复输入密码',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
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
  })(MyInfoForm),
);
