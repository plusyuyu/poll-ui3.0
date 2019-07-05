import React from 'react';
import { connect } from 'dva';
import { Modal, Button, Table, Icon } from 'antd';
import styles from '../basic/course.less';

class Monitor extends React.Component {
  componentWillMount() {
    this.props.dispatch({ type: 'monitor/fetchMonitors' });
    this.props.dispatch({ type: 'monitor/surveyProcessData' });
  }

  // 查看课调进度
  surveyProcess = id => {
    this.props.dispatch({ type: 'monitor/surveyProcess', payload: id });
    // Modal.confirm({
    //     title: '课调进度',
    //     content: '已经有 '+ this.props.monitor.surveyProcessData +'人已经提交了答卷',
    //     // okText: 'Yes',
    //     // okType: 'danger',
    //     cancelText: 'No',
    //     onOk: () => {
    //         // 编写代码进行删除
    //     },
    //     onCancel() {
    //     },
    // });
  };

  // 关闭课调
  stopSurvey = id => {
    // let vm = this;
    Modal.confirm({
      title: '确认关闭该课调吗？',
      content: 'Are you sure to close the survey?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // 编写代码进行关闭
        this.props.dispatch({ type: 'monitor/stopSurvey', payload: id });
      },
      onCancel() {},
    });
  };

  render() {
    const columns = [
      {
        title: '年级',
        dataIndex: 'clazzVM.grade.name',
      },
      {
        title: '班级',
        dataIndex: 'clazzVM.name',
      },
      {
        title: '课程',
        dataIndex: 'course.name',
      },
      {
        title: '讲师',
        dataIndex: 'clazzVM.charge.nickname',
      },
      {
        title: '问卷',
        dataIndex: 'qnVM.name',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '编号',
        dataIndex: 'id',
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div>
              <a title="查看进度">
                <Icon type="search" onClick={this.surveyProcess.bind(this, record.id)} />
              </a>
              &nbsp;
              <a title="关闭课调">
                <Icon type="poweroff" onClick={this.stopSurvey.bind(this, record.id)} />
              </a>
              &nbsp;
            </div>
          );
        },
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <div className={styles.content}>
        {/* 表格内容 */}
        <div>
          <Table
            size="small"
            rowSelection={rowSelection}
            rowKey="id"
            columns={columns}
            dataSource={this.props.monitor.monitors}
          />
        </div>
      </div>
    );
  }
}

export default connect(({ monitor }) => ({
  monitor,
}))(Monitor);
