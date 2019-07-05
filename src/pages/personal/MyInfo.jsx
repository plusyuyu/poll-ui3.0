import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import MyInfoForm from './MyInfoForm';
import styles from './MyInfo.less'
import { connect } from 'dva';

class MyInfo extends React.Component {

  render(){
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };
}

  render(){
    // const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.content}>
        <Form.Item  label="用户名">
         <Input />
        </Form.Item>
        <Form.Item label="真实姓名">
          <Input />
        </Form.Item>
      </div>
    )
  }
}

export default MyInfo;
// export default connect(({ myInfo }) => ({
//   myInfo,
// }))(MyInfo);