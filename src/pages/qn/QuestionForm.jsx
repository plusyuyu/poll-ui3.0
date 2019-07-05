import React from 'react';
import { Form, Input, Radio, Select, Modal, Table, Icon } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import { connect } from 'dva';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          label: '3',
          name: 'Joe Black',
          score: 32,
        },
      ],
    };
  }

  handleChange = value => {
    console.log(`selected ${value}`);
  };

  render() {
    const columns = [
      {
        title: '选项',
        dataIndex: 'label',
      },
      {
        title: '选项值',
        dataIndex: 'name',
      },
      {
        title: '分值',
        dataIndex: 'score',
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: '',
        render: (text, record) => {
          return (
            <div>
              <Icon type="delete" title="删除" style={{ color: '#F52222' }} />
            </div>
          );
        },
      },
    ];
    const { getFieldDecorator } = this.props.form;
    //将id添加到双向数据绑定里，并不做其他的修饰
    getFieldDecorator('id');
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="题目名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入真实姓名!' }],
          })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
        </Form.Item>
        <Form.Item label="题目类型">
          {getFieldDecorator('questionType', {
            rules: [{ required: true, message: '请输入题目类型!' }],
          })(
            <Select onChange={this.handleChange}>
              <Option value="单选题">单选题</Option>
              <Option value="多选题">多选题</Option>
              <Option value="简答题">简答题</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="题目选项">
          {getFieldDecorator('options', {
            rules: [{}],
          })(
            <Table
              size="small"
              pagination={false}
              rowKey="label"
              bordered
              columns={columns}
              dataSource={this.state.options}
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}
//设置表单数据的默认值
const mapPropsToFields = props => {
  let obj = {};
  for (let key in props.initData) {
    let val = props.initData[key];
    obj[key] = Form.createFormField({ value: val });
  }
  return obj;
};
export default connect()(
  Form.create({
    mapPropsToFields,
  })(QuestionForm),
);
