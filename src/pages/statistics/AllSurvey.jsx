import React from 'react';
import { Button, Icon, Table, Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import { connect } from 'dva';
import styles from '../basic/course.less';
class AllSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  componentWillMount() {
    this.props.dispatch({ type: 'allSurvey/fetchAllSurvey' });
  }

  downloadSurvey(record) {
    console.log(record);
    this.props.dispatch({ type: 'allSurvey/fetchdownLoadSurveyResult', payload: record.id });
  }
  deleteSurvey(id) {
    console.log(id);
    this.props.dispatch({ type: 'allSurvey/fetchDeleteSurvey', payload: id });
    //this.props.dispatch({type:"allSurvey/fetchAllSurvey"})
  }

  showDrawer(record) {
    this.props.dispatch({ type: 'allSurvey/setSurvey', payload: record });
    this.setState({
      visible: true,
    });
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
        <Table
          bordered
          loading={this.props.allSurvey.loading}
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.props.allSurvey.surveys}
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
        </Drawer>
      </div>
    );
  }
}

export default connect(({ allSurvey }) => ({ allSurvey }))(AllSurvey);
