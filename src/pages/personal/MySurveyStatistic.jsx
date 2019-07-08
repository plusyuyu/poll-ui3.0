import React from 'react';
import { connect } from 'dva';
import {
  Table,
  Button,
  DatePicker,
  Icon,
  message,
  Drawer,
  List,
  Avatar,
  Divider,
  Col,
  Row,
  Input,
  Card,
} from 'antd';
import styles from './MySurveyStatistic.less';

class MySurveyStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentWillMount() {
    this.props.dispatch({ 
      type: 'mySurveyStatistic/fetchMySurveyStatistics',payload:{page:0,pageSize:10,statuses:"审核通过"}});
      // this.props.dispatch({type: 'mySurveyStatistic/fetchSurveyCard' , payload:id }); 
  }

  downExcel(record) {
    window.open(
      (window.location.href =
        'http://134.175.154.93:9999/manager/result/downLoadSurveyResultById?id=' + record.id),
    );
  }

  showDrawer(record) {
    this.props.dispatch({ 
      type: 'mySurveyStatistic/fetchSurveyDetails',
       payload: record.id 
      });
    this.setState({
      visible: true,
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = (date, dateString) => {
    this.props.dispatch({ 
      type: 'mySurveyStatistic/fetchMySurveyStatistics',
      payload: { page: 0, pageSize: 10, statuses: '审核通过', month:dateString },
    });
  };

  onCloseX = () => {
    this.props.dispatch({ 
      type: 'mySurveyStatistic/fetchMySurveyStatistics' 
    }); 
    this.setState({
      visible: false,
    });
  };

  loadCard=(id)=>{
    // this.props.dispatch({ 
    //   type: 'mySurveyStatistic/fetchSurveyCard' ,
    //   payload:id 
    // }); 

    var max=0;
    var min;
    var maxId;
    var minId;
    var array=this.props.mySurveyStatistic.mySurveyStatistics;

    for(let i=0;i<array.length;i++){
      if(max<array[i].average){
        max=array[i].average;
        maxId=array[i].id;
      }
      min=array[i].average;
      minId=array[i].id;
    }
   
    for(let j=array.length-1;j>array.length;j--){
      if(min>array[j].average){
        min=array[j].average;
        minId=array[i].id;     
      }
    }
  
    var obj=[max,min]
    // console.log(maxId,minId)
    return obj;
  };

 
  loadAverage(){
    var sum=0;
    var array1=this.props.mySurveyStatistic.mySurveyStatistics;
    for(let i=0;i<array1.length;i++){
      sum+=array1[i].average;
    }
    return (sum/array1.length).toFixed(2);
  }

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
          }}>
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
        fixed: 'right',
        width: 50,
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
    const sum=0;
    return (
      <div className={styles.content}>
        <div className="btns">
          {/* 按月查询 */}
          {/* {JSON.stringify(this.props.mySurveyStatistic.mySurveyStatistics)} */}
          <MonthPicker 
            onChange={this.onChange} 
            onCloseX={this.onCloseX} 
            placeholder="Select month" 
            />
          <br />
          {/* 抽屉 */}
          <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <p style={{
                ...pStyle,
                marginBottom: 24,
                fontWeight: 'bolder',
              }}>
                课调预览
            </p>

            {/* {JSON.stringify(this.props.mySurveyStatistic.survey)} */}
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="班级"
                  content={this.props.mySurveyStatistic.survey.surveyVM.clazzVM.name}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="讲师"
                  content={this.props.mySurveyStatistic.survey.surveyVM.user.nickname}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="课程"
                  content={this.props.mySurveyStatistic.survey.surveyVM.course.name}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="问卷"
                  content={this.props.mySurveyStatistic.survey.surveyVM.qnVM.name}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="平均分"
                  content={this.props.mySurveyStatistic.survey.surveyVM.average}
                />
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col >
                <DescriptionItem content={this.props.mySurveyStatistic.survey.answers.map(item=>{
                  return(
                    <p key={item.id} value={item.id}>{item.content}</p>
                  )
                })} />
              </Col>
            </Row>
            <Divider />
          </Drawer>
        </div>
        {/* 卡片 */}
        <div style={{ padding: '10px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card style={{ backgroundColor: 'darkseagreen', borderRadius: 8 }}>
                <br />平均分：{this.loadAverage()}
                <br /><br /><br /><br />
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ backgroundColor: 'darkseagreen', borderRadius: 8 }}>
                最高分:{this.loadCard()[0]}<br />
                班級：{this.props.mySurveyStatistic.max.clazzVM.name}<br />
                讲师：<br />
                课程：<br />
                问卷：<br />
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ backgroundColor: 'darkseagreen', borderRadius: 8 }}>
                最低分：{this.loadCard()[1]}<br />
                班級：<br />
                讲师：<br />
                课程：<br />
                问卷：<br />
              </Card>
            </Col>
          </Row>
        </div>
        {/* 表格 */}
        <div>
          <Table
            bordered
            size="small"
            rowKey="id"
            rowSelection={{rowSelection,fixed:'left'}}
            columns={columns}
            scroll={{ x: 1300 }}
            dataSource={this.props.mySurveyStatistic.mySurveyStatistics}
          />
        </div>
      </div>
    );
  }
}

export default connect(({ mySurveyStatistic }) => ({
  mySurveyStatistic,
}))(MySurveyStatistic);
