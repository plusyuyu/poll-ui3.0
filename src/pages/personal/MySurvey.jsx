import React from 'react';
import {connect} from 'dva'
import { Table, Button, DatePicker,Icon, message,Drawer} from 'antd';
import styles from './mySurvey.less'

class MySurvey extends React.Component {

  state = { visible: false, childrenDrawer: false };

  componentWillMount() {
   this.props.dispatch({type:"mySurvey/fetchMySurveys"})
  }

  toDown(id){
    
  }

  showDrawer = () => {
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
      { title: '年级', dataIndex: 'clazzVM.grade.name', },
      { title: '班级', dataIndex: 'clazzVM.name', },
      { title: '课程', dataIndex: 'course.name', },
      { title: '讲师', dataIndex: 'user.nickname', },
      { title: '问卷', dataIndex: 'qnVM.name', },
      { title: '创建时间', dataIndex: 'surveydate', },
      { title: '平均分', dataIndex: 'average', },

      {
        title: '操作',
        render: (text, record) => {
          return (
            <div>
              <Icon type="eye" onClick={this.showDrawer.bind(this, record)} />&nbsp;
              <Icon type="download" onClick={this.toDown.bind(this, record)} />
            </div>
          )
        }
      }
    ];

    const { MonthPicker } = DatePicker;
    function onChange(date, dateString) {
      console.log(date, dateString);
    }

   

    return (
      <div className={styles.content}>
        <div className="btns">
          {/* <Button >选择年度</Button><br/>   */}
          <MonthPicker onChange={onChange} placeholder="Select month" /><br /><br />
            <Drawer
              title="课调预览"
              width={520}
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  borderTop: '1px solid #e8e8e8',
                  padding: '10px 16px',
                  textAlign: 'right',
                  left: 0,
                  background: '#fff',
                  borderRadius: '0 0 4px 4px',
                }}
              >
                <Button
                  style={{
                    marginRight: 8,
                  }}
                  onClick={this.onClose}
                >
                  Cancel
                </Button>
              </div>
            </Drawer>
          </div>
        <div>
          <Table
            size="small"
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.mySurvey.mySurveys} />,
        </div>
      </div>
    )
  }
}

export default connect(({mySurvey})=>({
  mySurvey
}))(MySurvey);