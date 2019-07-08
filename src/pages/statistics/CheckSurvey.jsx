import React from 'react';
import { Table, Button, Icon, Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import { connect } from 'dva';
import styles from '../basic/course.less';
class CheckSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  componentDidMount() {
    this.props.dispatch({ type: 'checkSurvey/fetchCheckSurvey' });
  }
  showDrawer(record) {
    this.props.dispatch({ type: 'checkSurvey/setSurvey', payload: record });
    this.setState({
      visible: true,
    });
  }
  passSurvey(survey) {
    this.setState({
      visible: false,
    });
    survey.status = '审核通过';
    let s = { id: survey.id, status: 1 };
    this.props.dispatch({ type: 'checkSurvey/fetchSaveSurvey', payload: s });
  }
  noPassSurvey(survey) {
    this.setState({
      visible: false,
    });
    survey.status = '审核不通过';
    let s = { id: survey.id, status: 0 };
    this.props.dispatch({ type: 'checkSurvey/fetchSaveSurvey', payload: s });
  }
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
          fontSize: 30,
          lineHeight: '22px',
          marginBottom: 40,
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
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '操作',
        dataIndex: '',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          if (record.status === '审核通过') {
            return (
              <div>
                <span style={{ cursor: 'not-allowed', disabled: 'true' }}>审核</span>
              </div>
            );
          } else if (record.status === '未审核') {
            return (
              <div>
                <span style={{ cursor: 'pointer' }} onClick={this.showDrawer.bind(this, record)}>
                  审核
                </span>
              </div>
            );
          } else {
            return (
              <div>
                <span style={{ cursor: 'not-allowed', disabled: 'true' }}>审核</span>
              </div>
            );
          }
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
    let { survey } = this.props.checkSurvey;
    return (
      <div className={styles.content}>
        <Table
          bordered
          rowKey="id"
          size="small"
          rowSelection={{ rowSelection, fixed: 'left' }}
          columns={columns}
          dataSource={this.props.checkSurvey.checksurveys.list}
          scroll={{ x: 1300 }}
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
              fontSize: '40px',
              marginTop: '5%',
              fontWeight: 'bolder',
            }}
          >
            审核客调
          </p>
          <Row style={{ marginTop: '20%' }}>
            <Col span={12}>
              <DescriptionItem title="班级" content={survey.clazzVM.grade.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="讲师" content={survey.user.nickname} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程" content={survey.course.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="问卷" content={survey.qnVM.name} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="平均分" content={survey.average} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                style={{ marginLeft: '60%', width: '80px' }}
                onClick={this.passSurvey.bind(this, survey)}
              >
                通过
              </Button>
              <Button
                type="danger"
                style={{ marginLeft: '30px', width: '80px' }}
                onClick={this.noPassSurvey.bind(this, survey)}
              >
                不通过
              </Button>
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}
export default connect(state => state)(CheckSurvey);
