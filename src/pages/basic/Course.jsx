import React from 'react';
import {connect} from 'dva'
import {Button,Table} from 'antd'
import styles from './course.less'

class Course extends React.Component {
  componentWillMount(){
    this.props.dispatch({type:"course/fetchCourses"})
  }

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
          <Button type="primary">添加</Button>
        </div>
        {/* 表格内容 */}
        <div>
          <Table 
            size="small" 
            rowSelection={rowSelection} 
            rowKey="id" columns={columns} 
            dataSource={this.props.course.courses} />
        </div>
      </div>
    )
  }
}

export default connect(({course})=>({
  course
}))(Course);