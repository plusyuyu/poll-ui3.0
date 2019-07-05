import React from 'react';
import { Input, Button, message } from 'antd';
import styles from './school.less';
import { connect } from 'dva';
const { TextArea } = Input;
  
// 保存按钮的点击事件
const info = () => {
  message.info('成功');
};


class School extends React.Component {

  componentWillMount() {
    this.props.dispatch({ type: 'school/fetchSchool' });
  }
  
  render() {
    return (
      <div>
        <div className={styles.Back}>
          <div>
            <span className={styles.one}>企业名称</span>
            <Input value={this.props.school.schools.name} className={styles.input} />
          </div>
          <div>
            <span>企业地址</span>
            <Input value={this.props.school.schools.address} className={styles.input} />
          </div>
          <div>
            <span>企业电话</span>
            <Input value={this.props.school.schools.telephone} className={styles.input} />
          </div>
          <div>
            <span>版权信息</span>
            <Input value={this.props.school.schools.copyright} className={styles.input} />
          </div>
          <div className="disc">
            <span style={{ marginTop: '2em' }}>企业介绍</span>
            <TextArea
              rows={2}
              className={styles.input}
              value="一家负责任的软件开发公司以及软件培训公司"
            />
          </div>
          <Button type="primary" onClick={info} className={styles.button}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(({ school }) => ({
  school,
}))(School);
