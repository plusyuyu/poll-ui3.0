import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
import MyInfoForm from './MyInfoForm';
import styles from './MyInfo.less';
import { connect } from 'dva';

class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
    };
  }
  componentWillMount() {
    this.props.dispatch({ type: 'user/fetchUsers' });
  }
  // 取消按钮的事件处理函数
  handleCancel = () => {
    this.props.dispatch({ type: 'MyInfo/changeVisible', payload: false });
  };

  // 确认按钮的事件处理函数
  handleCreate = () => {
    // const form = this.formRef.props.form;
    // form.validateFields((err, values) => {
    //   if (err) {
    //     return;
    //   }
    //   this.props.dispatch({ type: 'user/saveOrUpdateUser', payload: values });
    // });
  };
  // 更改头像
  editPhoto = () => {};
  // 更改密码
  editPwd = (record) => {
   this.props.dispatch({ type: 'MyInfo/changeVisible', payload: true});
  
  }
  // 更新
  update() {}

  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

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

    return (
      <div className={styles.content}>
        <div style={{ marginTop: '10px' }}>
          <Button type="primary">更换头像</Button> &nbsp;
          <Button type="primary" onClick={this.editPwd}>
            修改密码
          </Button>
        </div>

        <div className={styles.left}></div>

        <div className={styles.right}>
          <Form layout="inline">
            <Form.Item label="用&nbsp;户&nbsp;名&nbsp;">
              <Input value="lichunyu" disabled />
            </Form.Item>
            <br></br>
            <Form.Item label="真实姓名">
              <Input value="lichunyu" disabled />
            </Form.Item>
            <br></br>
            <Form.Item label="&nbsp;性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别&nbsp;" className="gender">
              <Radio.Group>
                <Radio initialValue="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
            </Form.Item>
            <br></br>
            <Form.Item label="&nbsp;邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱&nbsp;">
              <Input value="licy@briup.com" />
            </Form.Item>
            <br></br>
            <Form.Item label="&nbsp;角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色&nbsp;">
              &nbsp;&nbsp;普通用户
            </Form.Item>
          </Form>

          <Button type="primary" onClick={this.update} style={{ marginLeft: '150px' }}>
            更新
          </Button>
        </div>

        {/* <div className={styles.btn2}>
              <Button type="primary">更新</Button>
            </div> */}

        <div>
          <MyInfoForm
            initData={this.state.form}
            wrappedComponentRef={this.saveFormRef}
            visible={this.props.MyInfo.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      </div>
    );
  }
}

export default connect(({ MyInfo }) => ({
  MyInfo,
}))(MyInfo);
