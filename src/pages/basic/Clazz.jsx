import React from 'react';
import { connect } from 'dva';
import { Modal, Button, Input, Table, Icon, Select, message } from 'antd';
const { Option } = Select;
const { confirm } = Modal;

function handleChange(value) {
  console.log(`selected ${value}`);
}
class Clazz extends React.Component {
  componentWillMount() {
    this.props.dispatch({ type: 'clazz/fetchClazz' });
  }
  // 模态框
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  toDelete = (id, event) => {
    confirm({
      title: '确认删除该行数据么？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({ type: 'clazz/deleteClazz', payload: id });
      },
    });
  };

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
      },
      {
        title: '班级名称',
        dataIndex: 'name',
      },
      {
        title: '班级简介',
        dataIndex: 'description',
      },
      {
        width: 200,
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
                <Icon type="edit" />
              </a>
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
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    return (
      <div>
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Button type="primary" onClick={this.showModal} style={{ margin: '1em' }}>
          添加
        </Button>
        <Modal
          size="lg"
          title="添加年级"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          *年级名称
          <Input type="text" />
          *年级简介
          <Input type="text" />
        </Modal>
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            rowKey="id"
            dataSource={this.props.clazz.clazzs}
          />
        </div>
      </div>
    );
  }
}

export default connect(({ clazz }) => ({
  clazz,
}))(Clazz);
