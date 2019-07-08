import React from 'react';
import { connect } from 'dva';
import { Table, Button, DatePicker, Icon, message, Drawer , List, Avatar, Divider, Col, Row } from 'antd';
import styles from './mySurvey.less';


class MySurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isopen: false,
      time: null,
    };
  }

  handlePanelChange = value => {
    this.setState({
      time: value,
      isopen: false,
    });
    this.props.dispatch({
      type: 'mySurvey/fetchMySurveys',
      payload: { page: 0, pageSize: 10, statuses: '审核通过', year: value._d.getFullYear() },
    });
  }



  handleOpenChange = status => {
    // console.log(status)
    if (status) {
      this.setState({ isopen: true });
    } else {
      this.setState({ isopen: false });
    }
  };

  clearValue = () => {
    this.setState({
      time: null,
    });
  };

  componentWillMount() {
    this.props.dispatch({ type: 'mySurvey/fetchMySurveys',payload:{page:0,pageSize:10,statuses:"审核通过"}});
  }

  downExcel(record) {
    window.open(
      (window.location.href =
        'http://134.175.154.93:9999/manager/result/downLoadSurveyResultById?id=' + record.id),
      );
  }

  showDrawer (record) {
    this.props.dispatch({ type: 'mySurvey/fetchSurveyDetails', payload: record.id });
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
          {title}
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
        fixed:'right',
        width:50,
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
        <DatePicker
          value={this.state.time}
          open={this.state.isopen}
          mode="year"
          placeholder="请选择年份"
          format="YYYY"
          onOpenChange={this.handleOpenChange}
          onPanelChange={this.handlePanelChange}
          onChange={this.clearValue}
        />
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
            fontWeight:'bolder',
             }}
             >课调预览
             </p>
    
          <Row>
            <Col span={12}>
              <DescriptionItem title="班级" content={survey.surveyVM.clazzVM.name}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="讲师" content={survey.surveyVM.user.nickname} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程" content={survey.surveyVM.course.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="问卷" content={survey.surveyVM.qnVM.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="平均分" content={survey.surveyVM.average} />
            </Col>
          </Row>
          <Divider />
          <Row>
              <Col >
                <DescriptionItem content={survey.answers.map(item=>{
                  return(
                    <p key={item.id} value={item.id}>{item.content}</p>
                  )
                })} />
              </Col>
            </Row>
            <Divider />
        </Drawer>
        </div>
        <div>
          <Table
            bordered
            size="small"
            rowKey="id"
            rowSelection={{rowSelection,fixed:'left'}}
            columns={columns}
            scroll={{ x: 1300 }}
            dataSource={this.props.mySurvey.mySurveys}
          />
        </div>
      </div>
    );
  }
}

export default connect(({ mySurvey }) => ({
  mySurvey,
}))(MySurvey);
