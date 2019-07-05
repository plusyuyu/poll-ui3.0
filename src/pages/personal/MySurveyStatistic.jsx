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
    this.props.dispatch({ type: 'mySurveyStatistic/fetchMySurveyStatistics' });
  }

  downExcel(id) {
    window.open(
      (window.location.href =
        'http://134.175.154.93:9999/manager/result/downLoadSurveyResultById?id=' + id),
    );
  }

  showDrawer(record) {
    this.props.dispatch({ type: 'mySurveyStatistic/fetchSurveyDetails', payload: record.id });
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
    this.props.dispatch({ type: 'mySurveyStatistic/fetchSurveyMonth', payload: dateString });
  };

  onChangeMAX = value => {
    // this.props.mySurveyStatistic.mySurveyStatistics.forEach((item)=>{
    //   if(item.average>value){
    //     console.log(item)
    //   }
    // })
  };

  onChangeMIN = value => {
    // this.props.mySurveyStatistic.mySurveyStatistics.forEach((item)=>{
    //   if(item.average<value){
    //     console.log("----"+item)
    //   }
    // })
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
              <Icon type="download" onClick={this.downExcel.bind(this, record.id)} />
            </div>
          );
        },
      },
    ];

    const { MonthPicker } = DatePicker;
    function onChange(date, dateString) {
      console.log(date, dateString);
    }

    return (
      <div className={styles.content}>
        <div className="btns">
          <MonthPicker onChange={this.onChange} placeholder="Select month" />
          <br />
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
                fontWeight: 'bolder',
              }}
            >
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
              <Col span={12}>
                <DescriptionItem content={this.props.mySurveyStatistic.survey.answers.content} />
              </Col>
            </Row>
            <Divider />
          </Drawer>
        </div>
        <div style={{ padding: '10px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card style={{ backgroundColor: 'darkseagreen', borderRadius: 8 }}>
                <br />
                平均分:
                <br />
                <br />
                <br />
                <br />
              </Card>
            </Col>
            <Col span={8}>
              {/* onChange={this.onChangeMAX} */}
              <Card style={{ backgroundColor: 'darkseagreen', borderRadius: 8 }}>
                {/* {this.state.one.average} */}
                最高分:
                <br />
                班級：
                <br />
                讲师：
                <br />
                课程：
                <br />
                问卷：
                <br />
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ backgroundColor: 'darkseagreen', borderRadius: 8 }}>
                最低分：
                <br />
                班級：
                <br />
                讲师：
                <br />
                课程：
                <br />
                问卷：
                <br />
              </Card>
            </Col>
          </Row>
        </div>
        ,
        <div>
          <Table
            size="small"
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.mySurveyStatistic.mySurveyStatistics.list}
          />
          ,
        </div>
      </div>
    );
  }
}

export default connect(({ mySurveyStatistic }) => ({
  mySurveyStatistic,
}))(MySurveyStatistic);
