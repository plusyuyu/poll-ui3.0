import React from 'react';
import { connect } from 'dva';
import { Modal, Button, Input, Table, Icon, Select, message } from 'antd';
const { Option } = Select;
const { confirm } = Modal;
import ClazzForm from './ClazzForm';

function handleChange(value) {
  console.log(`selected ${value}`);
}
class Clazz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
    };
  }
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
    e.preventDefault();
    this.form.validateFields((err, values) => {
      if (!err) {
        // 如果没有错误，则打印填入输入框的内容，为values
        // console.log(values);
        this.props.dispatch({ type: 'clazz/saveClazz',payload:values });
      }
    });
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  // 删除
  toDelete = (id, event) => {
    confirm({
      title: '确认删除该行数据么？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({ type: 'clazz/batchClazz', payload: id });
      },
    });
  };

  // 批量删除
  batchDelete(ids) {
    // message.success(JSON.stringify(this.state.ids))
    this.props.dispatch({ type: 'clazz/batchClazz', payload: this.state.ids });
  }

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
        this.setState({ ids: selectedRowKeys });
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    return (
      <div>
        <div style={{backgroundColor:'white',borderRadius:'5px',padding:'1em'}}>
          <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Button type="default" onClick={this.showModal} style={{ margin: '1em' }}>
            添加
          </Button>
          <Button type="danger" onClick={this.batchDelete.bind(this)}>
            批量删除
          </Button>

          {/* 模态框 */}
          <Modal
            width="700px"
            height="500px"
            title="添加班级"
            
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <ClazzForm />
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
      </div>
    );
  }
}

export default connect(({ clazz }) => ({
  clazz,
}))(Clazz);
