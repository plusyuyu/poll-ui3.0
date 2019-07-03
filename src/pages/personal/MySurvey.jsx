import React from 'react';
import { connect } from 'dva';
import { Table, Button, DatePicker, Icon, message, Drawer , List, Avatar, Divider, Col, Row } from 'antd';
import styles from './mySurvey.less';


class MySurvey extends React.Component {
  state = { visible: false};

  componentWillMount() {
    this.props.dispatch({ type: 'mySurvey/fetchMySurveys' });
  }

  downExcel(id) {}

  showDrawer (record) {
    this.props.dispatch({ type: 'mySurvey/setSurvey', payload: record });
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const pStyle = {
      fontSize: 16,
      color: 'rgba(0,0,0,0.85)',
      lineHeight: '24px',
      display: 'block',
      marginBottom: 16,
    };
    
    const DescriptionItem = ({ title, content }) => (
      <div
        style={{
          fontSize: 14,
          lineHeight: '22px',
          marginBottom: 7,
          color: 'rgba(0,0,0,0.65)',
        }}
      >
        <p
          style={{
            marginRight: 8,
            display: 'inline-block',
            color: 'rgba(0,0,0,0.85)',
          }}
        >
          {title}:
        </p>
        {content}
      </div>
    );
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    const columns = [
      { title: '年级', dataIndex: 'clazzVM.grade.name' },
      { title: '班级', dataIndex: 'clazzVM.name' },
      { title: '课程', dataIndex: 'course.name' },
      { title: '讲师', dataIndex: 'user.nickname' },
      { title: '问卷', dataIndex: 'qnVM.name' },
      { title: '创建时间', dataIndex: 'surveydate' },
      { title: '平均分', dataIndex: 'average' },

      {
        title: '操作',
        render: (text, record) => {
          return (
            <div>
              <Icon type="eye" onClick={this.showDrawer.bind(this, record)} />
              &nbsp;
              <Icon type="download" onClick={this.downExcel.bind(this, record)} />
            </div>
          );
        },
      },
    ];

    const { MonthPicker } = DatePicker;
    function onChange(date, dateString) {
      console.log(date, dateString);
    }

    let { survey } = this.props.mySurvey;
    return (
      <div className={styles.content}>
        <div className="btns">
          {/* <Button >选择年度</Button><br/>   */}
          <MonthPicker onChange={onChange} placeholder="Select month" /><br />
          {/* <Button type="primary" onClick={this.downExcel}>导出</Button> */}
          <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p 
          style={{ 
            ...pStyle, 
            marginBottom: 24,
            // marginTop:'5%',
            fontWeight:'bolder',
             }}
             >课调预览
             </p>
    
          <Row>
            <Col span={12}>
              <DescriptionItem title="班级" content={survey.clazzVM.name}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="讲师" content={survey.user.nickname} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程" content={survey.course.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="问卷" content={survey.qnVM.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="平均分" content={survey.average} />
            </Col>
          </Row>
          <Divider />
        </Drawer>
        </div>
        <div>
          <Table
            size="small"
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.mySurvey.mySurveys}
          />
          ,
        </div>
      </div>
    );
  }
}

export default connect(({ mySurvey }) => ({
  mySurvey,
}))(MySurvey);
