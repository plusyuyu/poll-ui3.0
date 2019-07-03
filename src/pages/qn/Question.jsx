import React from 'react';
import style from './Question.less';
import { connect } from 'dva';
import { Button,Table,Icon,Card,Checkbox,Modal } from 'antd';
const confirm = Modal.confirm;
class Question extends React.Component {
  constructor(props){
		super(props)
	}
	edit=(data,event)=>{
		 console.log(this.props.question.questions)
	}
	componentWillMount() {
    this.props.dispatch({ type: 'question/fetchQuestion' });
   
  	}
  onChange=(e)=> {
	  console.log(e.target.checked);
	}
	deleteQuerstion=(id)=>{
		 confirm({
      title: '提示',
      content: '确定删除吗？',
      okText: '确认',
      cancelText: '取消',
      // 改成箭头函数
      onOk: () => {
        // message.success('id：'+id);
        //提交数据给后台进行删除
        this.props.dispatch({ type: 'question/deleteQuestion', payload: id });
      },
    });

	}
  render(){
    return (
      <div className={style.question}>
			<Button type="primary">添加</Button>
			{/*<Button type="primary">批量删除</Button>*/}
			<div>
				{
					this.props.question.questions.map((item,index)=>{
						return (

							<Card className={style.card} key={index} title={item.name} extra={<span><Icon className={style.icon} type="edit" title="修改" onClick={this.edit.bind(this)} /> <Icon  type="delete" title="删除" onClick={this.deleteQuerstion.bind(this,item.id)} style={{color:'#F52222'}}/></span>} bordered style={{ width: 300 }}>
						      	{
						      		item.options.map((ite,inde)=>{
										return (
											<p key={ite.id}>{ite.label}：{ite.name}</p>
											)
						      		})
						      	}
						    </Card>
							)
					})
				}
			    
			   
			</div>
      </div>
    )
  }
}
export default connect(({ question }) => ({
  question,
}))(Question);