import React from 'react';
import { Form, Input, Radio, Select, Modal, Table, Icon, Button } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import { connect } from 'dva';
var count = 0;
var arr = [];
var arr2 = [];
var data = {};
class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      name: '',
    };
  }
  componentWillMount() {
    this.setState({
      options: data.options,
    });
  }
  handleChange = value => {
    console.log(`selected ${value}`);
  };

  addOption = () => {
    let obj = {};
    if (count === 0) {
      let obj = {
        label: 'A',
        name: '',
        score: 5,
      };
      arr.push(obj);
      this.setState({
        options: arr,
      });
    } else if (count === 1) {
      let obj = {
        label: 'B',
        name: '',
        score: 4,
      };
      arr.push(obj);
      this.setState({
        options: arr,
      });
    } else if (count === 2) {
      let obj = {
        label: 'C',
        name: '',
        score: 3,
      };
      arr.push(obj);
      this.setState({
        options: arr,
      });
    } else if (count === 3) {
      let obj = {
        label: 'D',
        name: '',
        score: 2,
      };
      arr.push(obj);
      this.setState({
        options: arr,
      });
    } else if (count === 4) {
      let obj = {
        label: 'E',
        name: '',
        score: 1,
      };
      arr.push(obj);
      this.setState({
        options: arr,
      });
    }
    count = count + 1;
  };
  name = () => {};
  changeName = (record, e) => {
    var arr3 = [];
    record.name = e.target.value;
    arr2.forEach((item, index) => {
      arr3.push(item.label);
    });
    // arr2.push(record)
    if (arr3.indexOf(record.label) == -1) {
      arr2.push(record);
      // console.log(arr2)
    }
    this.setState({
      options: arr2,
    });
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
        render: (text, record) => {
          return (
            <div>
              <Input value={this.state.name} onChange={this.changeName.bind(this, record)} />
            </div>
          );
        },
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
        <Button type="primary" onClick={this.addOption}>
          添加选项
        </Button>
      </Form>
    );
  }
}
//设置表单数据的默认值
const mapPropsToFields = props => {
  let obj = {};
  data = props.initData;
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
