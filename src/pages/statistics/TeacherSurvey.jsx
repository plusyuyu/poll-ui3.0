import React from 'react';
import styles from '../basic/course.less';
import { DatePicker, Table, Icon, Select, Modal, Button } from 'antd';
import { connect } from 'dva';
const { MonthPicker } = DatePicker;
const { Option } = Select;
class TeacherSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',

    };
  }
  onChange = (date, dateString) => {
    this.props.dispatch({ type: 'teacherSurvey/fetchTeacherSurvey', payload: dateString });
    this.props.dispatch({ type: 'teacherSurvey/fetchUserSurvey', payload: dateString });
    this.setState({
      date: dateString,
    });
  };
  onChange1 = value => {
    var arr1=[];
    var arr2=[];
    var arr3=[];
    if(this.state.date!="")
    {
        this.props.teacherSurvey.teacher.forEach((item)=>{

          if(item.min>=4.0){
       
          
            arr1.push(item);
            //this.props.dispatch({ type: 'teacherSurvey/setTeacher', payload: arr });
            
           }else if(item.max<=3.5){
             
             arr2.push(item);
            //this.props.dispatch({ type: 'teacherSurvey/setTeacher', payload: arr });
           }else{
             arr3.push(item);
           }


        })
    }
    
    if(value>=4.0){
       
      
      this.props.dispatch({ type: 'teacherSurvey/setUser', payload: arr1 });
      
     }else if(value<=3.5){

      this.props.dispatch({ type: 'teacherSurvey/setUser', payload: arr2 });
     }else{
      this.props.dispatch({ type: 'teacherSurvey/setUser', payload: arr3 });
     }
};

  lookDetails = record => {
    this.setState({
      visible: true,
    });
    let { date } = this.state;
    console.log(this.state.date);
    this.props.dispatch({
      type: 'teacherSurvey/fetchQuerySurvey',
      payload: { userId: record.userId, month: date },
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const columns2 = [
      {
        title: '方向',
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
    ];
    const columns = [
      {
        title: '姓名',
        dataIndex: 'username',
      },
      {
        title: '平均分',
        dataIndex: 'average',
      },
      {
        title: '最高分',
        dataIndex: 'max',
      },
      {
        title: '最低分',
        dataIndex: 'min',
      },
      {
        title: '操作',
        dataIndex: '',
        fixed: 'right',
        render: (text, record) => {
          return <Icon type="eye" onClick={this.lookDetails.bind(this, record)} />;
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
        {/* {JSON.stringify(this.props)} */}
        <MonthPicker onChange={this.onChange} placeholder="Select month" />
        <Select
          showSearch
          style={{ width: 200, marginLeft: '1em' }}
          placeholder="请选择"
          optionFilterProp="children"
          onChange={this.onChange1}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="4.0">4.0以上</Option>
          <Option value={[3.5, 4.0]}>3.5~4.0</Option>
          <Option value="3.5">3.5以下</Option>
        </Select>
        {/* {JSON.stringify(this.props.teacherSurvey.teacher)} */}

        <Table
          bordered
          size="small"
          rowKey="id"
          rowSelection={{ rowSelection, fixed: 'left' }}
          columns={columns}
          dataSource={this.props.teacherSurvey.user}
          style={{ marginTop: '10px' }}
        />
        <Modal
          title="课调详细情况"
          width="400"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          forceRender={true}
        >
          <Table
            bordered
            rowKey="id"
            size="small"
            rowSelection={{ rowSelection, fixed: 'left' }}
            columns={columns2}
            dataSource={this.props.teacherSurvey.list.data.list}
          />
          <Button style={{ marginLeft: '95%' }} slot="footer" onClick={this.handleCancel}>
            关闭
          </Button>
        </Modal>
      </div>
    );
  }
}

export default connect(state => state)(TeacherSurvey);
