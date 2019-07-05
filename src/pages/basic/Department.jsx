import React from 'react';
import { connect } from 'dva';
import { Modal, Button, Input, Table, Icon, message, Form } from 'antd';
import DepartmentForm from './DepartmentForm';

// hello wor
// hello world

const { confirm } = Modal;
class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      ids: [],
      department: {},
    };
  }

  // ref函数，使子组件能拿到父组件的值
  departmentFromRefs = form => {
    this.form = form;
  };

  // 模态框的确认按钮
  handleOk = e => {
    // 1.获取表单数据
    e.preventDefault();
    this.form.validateFields((err, values) => {
      if (!err) {
        // 如果没有错误，则打印填入输入框的内容，为values
        // console.log(values);
        this.props.dispatch({ type: 'department/saveDepartment', payload: values });
      }
    });
    // 2.与后台交互完成保存或者更新
    // 3.关闭模态框,刷新页面
    this.setState({
      visible: false,
    });
  };

  // 模态框的取消按钮
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  // 点击添加按钮
  toAdd = () => {
    this.setState({
      visible: true,
      department: {},
    });
  };

  // 修改，record为当前行所有数据
  toEdit(record) {
    this.setState({
      visible: true,
      department: record,
    });
  }

  componentWillMount() {
    this.props.dispatch({ type: 'department/fetchDepartment' });
  }

  // 删除
  toDelete = (id, event) => {
    confirm({
      title: '确认删除该行数据么？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({ type: 'department/deleteDepartment', payload: id });
      },
    });
  };

  // 批量删除
  batchDelete(ids) {
    // message.success(this.state.ids);
    // message.success(JSON.stringify(this.state.ids));
    this.props.dispatch({ type: 'department/batchDepartment', payload: this.state.ids });
  }

  render() {
    // 定义表格的头部
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
      {
        width: 60,
        align: 'center',
        title: '操作',
        render: (text, record) => {
          return (
            <div>
              <a>
                <Icon
                  type="delete"
                  style={{ marginRight: '1em' }}
                  onClick={this.toDelete.bind(this, record.id)}
                />
              </a>
              <a>
                <Icon type="edit" onClick={this.toEdit.bind(this, record)} />
              </a>
            </div>
          );
        },
      },
    ];

    // 选中table前的选中框时，将该行的id赋值给ids
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys,'-----');
        this.setState({ ids: selectedRowKeys });
      },
    };

    return (
      <div>
        <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '1em' }}>
          <Button type="primary" onClick={this.toAdd}>
            添加
          </Button>
          <Button
            type="danger"
            onClick={this.batchDelete.bind(this)}
            style={{ marginBottom: '0.5em', marginLeft: '0.5em' }}
          >
            批量删除
          </Button>
          {/* 表格 */}
          <div>
            <Table
              bordered
              size="small"
              rowSelection={rowSelection}
              columns={columns}
              rowKey="id"
              dataSource={this.props.department.departments}
            />
          </div>
          {/* 添加模态框 */}
          <Modal
            width="700px"
            title="添加年级"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <DepartmentForm initData={this.state.department} ref={this.departmentFromRefs} />
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect(({ department }) => ({
  department,
}))(Department);
