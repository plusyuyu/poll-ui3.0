import React from 'react';
import {connect} from 'dva'
import {Button,Table} from 'antd'
import styles from './course.less'
import CourseForm from './CourseForm'

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      form:{}
    }
  }
  componentWillMount(){
    this.props.dispatch({type:"course/fetchCourses"})
  }
  // 取消按钮的事件处理函数
  handleCancel = () => {
    this.setState({ visible: false });
  };

  // 确认按钮的事件处理函数
  handleCreate = () => {
    this.setState({ visible: false });
  }

  // 添加
  toAdd = ()=>{
    this.setState({ visible: true });
  }


  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render(){
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
      },
      {
        title: '课程名称',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'description',
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
        {/* 按钮 */}
        <div className="btns">
          <Button type="primary" onClick={this.toAdd}>添加</Button>
        </div>
        {/* 表格内容 */}
        <div>
          <Table 
            size="small" 
            rowSelection={rowSelection} 
            rowKey="id" columns={columns} 
            dataSource={this.props.course.courses} />
        </div>
        {/* 模态框 */}
        <CourseForm
          initData={this.state.form}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}/>
      </div>
    )
  }
}

export default connect(({course})=>({
  course
}))(Course);