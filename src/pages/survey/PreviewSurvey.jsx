import React from 'react';
import style from './Question.less';
import { connect } from 'dva';
import QuestionForm from './QuestionForm';

import { Button, Table, Icon, Card, Checkbox, Modal } from 'antd';
const confirm = Modal.confirm;
class PreviewSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      form: {},
    };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'question/fetchQuestion' });
  }

  onChange = e => {
    console.log(e.target.checked);
  };

  handleOk = e => {
    e.preventDefault();
    const newForm = this.formRef.props.form;
    newForm.validateFields((err, values) => {
      if (!err) {
      }
    });
    this.setState({
      visible: false,
    });
  };

  //获取表单子组件的DOM
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <div>
        <div>
          {this.props.question.questions.map((item, index) => {
            return (
              <Card
                className={style.card}
                key={index}
                title={
                  <span>
                    {item.name}
                    <span className={style.qType}>{item.questionType}</span>
                  </span>
                }
                bordered
                style={{ width: 300 }}
              >
                {item.options.map((ite, inde) => {
                  return (
                    <p key={ite.id}>
                      {ite.label}：{ite.name}
                    </p>
                  );
                })}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}
export default connect(({ question }) => ({
  question,
}))(PreviewSurvey);
