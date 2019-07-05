import React from 'react';
import styles from '../basic/course.less';
import { DatePicker, Table, Icon, Select } from 'antd';
import { connect } from 'dva';
const { MonthPicker } = DatePicker;
const { Option } = Select;
class TeacherSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      list2: [],
    };
  }
  onChange = (date, dateString) => {
    this.props.dispatch({ type: 'teacherSurvey/fetchTeacherSurvey', payload: dateString });
  };
  onChange1 = value => {
    this.props.teacherSurvey.teacher.forEach(item => {
      if (item.average > value) {
        console.log(item);
      } else if (item.average < value) {
        console.log('----' + item);
      }
    });
  };

  lookDetails = () => {};

  render() {
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
        <MonthPicker onChange={this.onChange} placeholder="Select month" />
        <Select
          showSearch
          style={{ width: 200, marginLeft: '10px' }}
          placeholder="请选择"
          optionFilterProp="children"
          onChange={this.onChange1}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="4.0">4.0以上</Option>
          <Option value={[3.5, 4.0]}>3.5~4.0</Option>
          <Option value="3.5">3.5一下</Option>
        </Select>
        {/* {JSON.stringify(this.props.teacherSurvey.teacher)} */}

        <Table
          bordered
          size="small"
          rowKey="id"
          rowSelection={{ rowSelection, fixed: 'left' }}
          columns={columns}
          dataSource={this.props.teacherSurvey.teacher}
          style={{ marginTop: '10px' }}
        />
      </div>
    );
  }
}

export default connect(state => state)(TeacherSurvey);
