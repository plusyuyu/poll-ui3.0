import React from 'react';
import { Form, Modal, Input, Select } from 'antd';
import { connect } from 'dva';
const { Option } = Select;

// 编辑课调表单
class ReviseFrom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        // 父组件传递给子组件值
        const { visible, onCancel, onCreate, form, create } = this.props;
        const { getFieldDecorator } = form;
        // 将表单中没有出现的值做一个双向数据绑定
        getFieldDecorator('id');
        return (
            <Modal visible={visible} title="编辑课调" okText="提交" onCancel={onCancel} onOk={onCreate}>
                <Form layout="vertical" {...formLayout}>
                    <Form.Item label="班级">
                        {getFieldDecorator('clazzId', {
                            rules: [{ required: true, message: '该项不能为空!' }],
                        })(
                            <Select>
                                {create.allVM.map(item => {
                                    return (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    );
                                })}
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="课程">
                        {getFieldDecorator('courseId', {
                            rules: [{ required: true, message: '该项不能为空!' }],
                        })(
                            <Select>
                                {create.allCourse.map(item => {
                                    return (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    );
                                })}
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="问卷">
                        {getFieldDecorator('questionnaireId', {
                            rules: [{ required: true, message: '该项不能为空!' }],
                        })(
                            <Select>
                                {create.allQuestionnaire.map(item => {
                                    return (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    );
                                })}
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="讲师">
                        {getFieldDecorator('userId', {
                            rules: [{ required: true, message: '该项不能为空!' }],
                        })(
                            <Select>
                                {create.allEnabled.map(item => {
                                    return (
                                        <Option key={item.id} value={item.id}>
                                            {item.nickname}
                                        </Option>
                                    );
                                })}
                            </Select>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
// 将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = props => {
    let obj = {};
    for (let key in props.initData) {
        let val = props.initData[key];
        obj[key] = Form.createFormField({ value: val });
    }
    return obj;
};

export default connect(({ create }) => ({
    create,
}))(
    Form.create({
        mapPropsToFields,
    })(ReviseFrom),
);
