import React from 'react';
import {
  Button,
  Icon,
  Table,
  Drawer,
  List,
  Avatar,
  Divider,
  Col,
  Row,
  DatePicker,
  Select,
} from 'antd';
import { connect } from 'dva';
import styles from '../basic/course.less';
const { Option } = Select;
class AllSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isopen: false,
      time: null,
      clazzId: null,
      userId: null,
    };
  }
  handlePanelChange = value => {
    this.setState({
      time: value,
      isopen: false,
    });

    this.props.dispatch({
      type: 'allSurvey/fetchAllSurvey',
      payload: { page: 0, pageSize: 10, statuses: '审核通过', year: value._d.getFullYear(),clazzId:this.state.clazzId,userId:this.state.userId },
    });
  };
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
    this.props.dispatch({
      type: 'allSurvey/fetchAllSurvey',
      payload: { page: 0, pageSize: 10, statuses: '审核通过' },
    });
    this.props.dispatch({ type: 'allSurvey/fetchAllTeacher' });
    this.props.dispatch({ type: 'allSurvey/fetchAllClazz' });
  }

  downloadSurvey(record) {
    window.open(
      (window.location.href =
        'http://134.175.154.93:9999/manager/result/downLoadSurveyResultById?id=' + record.id),
    );
  }
  deleteSurvey(id) {
    console.log(id);
    this.props.dispatch({ type: 'allSurvey/fetchDeleteSurvey', payload: id });
    //this.props.dispatch({type:"allSurvey/fetchAllSurvey"})
  }

  showDrawer(record) {
    this.props.dispatch({ type: 'allSurvey/setSurvey', payload: record.id });
    this.setState({
      visible: true,
    });
  }
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  onChange1 = record => {
    console.log(record, this.state.time._d.getFullYear());
    this.setState({
      clazzId: record,
    });
    this.props.dispatch({
      type: 'allSurvey/fetchAllSurvey',
      payload: {
        page: 0,
        pageSize: 10,
        statuses: '审核通过',
        year: this.state.time._d.getFullYear(),
        clazzId: record,
        userId:this.state.userId
      },
    });
  };
  onChange2 = record => {
    console.log(record, this.state.clazzId, this.state.time._d.getFullYear());
    this.props.dispatch({
      type: 'allSurvey/fetchAllSurvey',
      payload: {
        page: 0,
        pageSize: 10,
        statuses: '审核通过',
        year: this.state.time._d.getFullYear(),
        clazzId: this.state.clazzId,
        userId: record,
      },
    });
    this.setState({
      userId: record,
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
        dataIndex: 'user.nickname',
      },
      {
        title: '问卷',
        dataIndex: 'qnVM.name',
      },
      {
        title: '创建时间',
        dataIndex: 'surveydate',
      },
      {
        title: '平均分',
        dataIndex: 'average',
      },
      {
        title: '操作',
        dataIndex: '',
        render: (text, record) => {
          return (
            <div>
              <Icon type="eye" onClick={this.showDrawer.bind(this, record)} />
              <Icon
                type="download"
                onClick={this.downloadSurvey.bind(this, record)}
                style={{ marginLeft: '5px' }}
              />
              <Icon
                type="delete"
                style={{ marginLeft: '5px' }}
                onClick={this.deleteSurvey.bind(this, record.id)}
              />
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
    let { survey } = this.props.allSurvey;
    return (
      <div className={styles.content}>
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
        <Select
          style={{ width: 200, marginLeft: '1em' }}
          placeholder="请选择班级"
          onChange={this.onChange1}
          name="id"
        >
          {this.props.allSurvey.clazzs.map(item => {
            return <Option value={item.id}>{item.name}</Option>;
          })}
        </Select>
        <Select
          style={{ width: 200, marginLeft: '1em' }}
          placeholder="请选择老师"
          name="id"
          onChange={this.onChange2}
        >
          {this.props.allSurvey.teachers.map(item => {
            return (
              <Option key={item.id} value={item.id}>
                {item.nickname}
              </Option>
            );
          })}
        </Select>
        <Table
          bordered
          loading={this.props.allSurvey.loading}
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          size="small"
          dataSource={this.props.allSurvey.surveys}
          style={{ marginTop: '5px' }}
        />

        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          {/* {JSON.stringify(survey)} */}
          <p
            style={{
              ...pStyle,
              marginBottom: 24,
              fontWeight: 'bolder',
            }}
          >
            审核客调
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="班级" content={survey.surveyVM.clazzVM.grade.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="讲师" content={survey.surveyVM.user.nickname} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程" content={survey.surveyVM.course.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="问卷" content={survey.surveyVM.qnVM.name} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="平均分" content={survey.surveyVM.average} />
            </Col>
          </Row>
          <Divider />
            <Row>
              <Col >
                <DescriptionItem content={this.props.allSurvey.survey.answers.map(item=>{
                  return(
                    <p key={item.id} value={item.id}>{item.content}</p>
                  )
                })} />
              </Col>
            </Row>
            <Divider />
        </Drawer>
      </div>
    );
  }
}

export default connect(({ allSurvey }) => ({ allSurvey }))(AllSurvey);
