import React from 'react';
import style from './Question.less';
import { Button,Table,Icon,Card } from 'antd';
class Question extends React.Component {
  constructor(props){
		super(props)
	}
	edit=(data,event)=>{
		// alert(JSON.stringify(data))
		// console.log(data)
	}
  render(){
    return (
      <div className={style.question}>
			<Button type="primary">添加</Button>
			{/*<Button type="primary">批量删除</Button>*/}
			<div>
			    <Card className={style.card} title="Card title" extra={<span><Icon className={style.icon} type="edit" title="修改" onClick={this.edit.bind(this)} /> <Icon type="eye" title="详情" onClick={this.showModal} style={{color:'#F52222'}}/></span>} bordered style={{ width: 300 }}>
			      <p>Card content</p>
			      <p>Card content</p>
			      <p>Card content</p>
			    </Card>
			    <Card className={style.card} title="Card title" extra={<span><Icon className={style.icon} type="edit" title="修改"/> <Icon type="eye" title="详情" onClick={this.showModal} style={{color:'#F52222'}}/></span>} bordered style={{ width: 300 }}>
			      <p>Card content</p>
			      <p>Card content</p>
			      <p>Card content</p>
			    </Card>
			    <Card className={style.card} title="Card title" extra={<span><Icon className={style.icon} type="edit" title="修改"/> <Icon type="eye" title="详情" onClick={this.showModal} style={{color:'#F52222'}}/></span>} bordered style={{ width: 300 }}>
			      <p>Card content</p>
			      <p>Card content</p>
			      <p>Card content</p>
			    </Card>
			    <Card className={style.card} title="Card title" extra={<span><Icon className={style.icon} type="edit" title="修改"/> <Icon type="eye" title="详情" onClick={this.showModal} style={{color:'#F52222'}}/></span>} bordered style={{ width: 300 }}>
			      <p>Card content</p>
			      <p>Card content</p>
			      <p>Card content</p>
			    </Card>
			     <Card className={style.card} title="Card title" extra={<span><Icon className={style.icon} type="edit" title="修改"/> <Icon type="eye" title="详情" onClick={this.showModal} style={{color:'#F52222'}}/></span>} bordered style={{ width: 300 }}>
			      <p>Card content</p>
			      <p>Card content</p>
			      <p>Card content</p>
			    </Card>
			     <Card className={style.card} title="Card title" extra={<span><Icon className={style.icon} type="edit" title="修改"/> <Icon type="eye" title="详情" onClick={this.showModal} style={{color:'#F52222'}}/></span>} bordered style={{ width: 300 }}>
			      <p>Card content</p>
			      <p>Card content</p>
			      <p>Card content</p>
			    </Card>
			</div>
      </div>
    )
  }
}

export default Question;