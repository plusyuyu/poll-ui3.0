import React from 'react';
import { List, Card,Pagination,Avatar, Icon} from 'antd';
import styles from '../basic/course.less';

import {connect} from 'dva';
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
class ClazzSurvey extends React.Component {
  constructor(props){
    super(props);
    
  }
  componentDidMount(){
    Highcharts.chart('container', {
      chart: {
        type: 'line'
      },
      title: {
        text: ''
      },
      xAxis: {
      },
      yAxis: {
        title: {
          text: 'Values'
        },
        floor: 0,
			  ceiling: 100,
        allowDecimals:false,
        categories:[3,4,5],
        series: [{
          data: [3,4,5]
        }]
      },
      plotOptions: {
        line: {
          dataLabels: {
            // 开启数据标签
            enabled: true          
          },
          // 关闭鼠标跟踪，对应的提示框、点击事件会失效
          enableMouseTracking: false
        }
      },
      series: [{
        name: '课调平均分',
        data: []
      }]
    });
  }
  componentWillMount(){
    this.props.dispatch({type:"clazzSurvey/fetchClazzSurvey",payload:{page:0,pageSize:4}});
   
  }
  clazzClick(item){
    this.props.dispatch({type:"clazzSurvey/fetchSurveyClazzId",payload:item.id});
    console.log(this.props.clazzSurvey.clazz)
    setTimeout(()=>{
      var xdata=[];
    var ydata=[];
    this.props.clazzSurvey.clazz.forEach((item)=>{
      xdata.push(item.user.nickname);
      ydata.push(item.average);
    })
    Highcharts.chart('container', {
      chart: {
        type: 'line'
      },
      title: {
        text:item.name+"班课调统计图"
      },
      subtitle: {
        text: '折线图'
      },
      xAxis: {
        categories: xdata
      },
      yAxis: {
        title: {
          text: 'Values'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            // 开启数据标签
            enabled: true          
          },
          // 关闭鼠标跟踪，对应的提示框、点击事件会失效
          enableMouseTracking: false
        }
      },
      series: [{
        name: '课调平均分',
        data: ydata
      }]
    });
    },500)
    
  }
  render(){
   let {list,total}=this.props.clazzSurvey.clazzsurveys.data;
    return (
      <div className={styles.content}>
        {/* {JSON.stringify(this.props.clazzSurvey.clazz)} */}
         <List
                grid={{ gutter: 16, column: 4 }}
                size="small"
                pagination={{
                  onChange: page => {
                    console.log(page)
                    let p=page-1;
                    console.log(p)
                    this.props.dispatch({type:"clazzSurvey/fetchClazzSurvey",payload:{page:p,pageSize:4}})
                  },
                  pageSize: 4,
                  total:total,
                  hideOnSinglePage:false,
                  itemRender:(current, type, originalElement)=>{
                    if (type === 'prev') {
                      return <a>Previous</a>;
                    }
                    if (type === 'next') {
                      return <a>Next</a>;
                    }
                    return originalElement;
                  }
                }}
                dataSource={list}
               
                renderItem={item => (
                
                  <List.Item onClick={this.clazzClick.bind(this,item)}>
                      <Card title={item.name}>总课调次数：{item.surveyNumber}</Card>
                  </List.Item>
                  
                )}
              >
            </List> 
          
            <div style={{display:"flex",justifyContent:"space-around"}}>
                  <div id="container" style={{height:"400px"}}></div>
                  <div style={{height:"400px",flex:"2",display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
                      <div style={{marginTop:"5px",padding:"1em",backgroundColor:"rgb(99,182,161)",flex:"1",borderRadius:"5px"}}></div>
                      <div style={{marginTop:"5px",backgroundColor:"rgb(120,138,182)",flex:"1",borderRadius:"5px"}}></div>
                  </div>
            </div>
           
      </div>
    )
  }
}

export default connect(state=>state)(ClazzSurvey);