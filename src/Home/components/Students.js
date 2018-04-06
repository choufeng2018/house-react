import React,{Component} from 'react';
import {Card} from 'antd'
import echarts from 'echarts'
import './Students.less'
export class Students extends Component{

    render(){
        return (
            <Card title = '学生周况' >
                <div id="main" style={{height:'350px', width: '600px'}}></div>
            </Card>
        )
    }
    componentDidMount(){
         var myChart = echarts.init(document.getElementById('main'));
         myChart.setOption({
             tooltip: {},
             xAxis: {
                 data: ["周一", "周二", "周三", "周四", "周五", "周六", '周日'],
                 axisTick: {
                     show:false
                 }
             },
             yAxis: {
                 axisTick:{
                     show:false
                 }
             },
             grid: {
                 top: '5',
                 bottom: '25',
                 left:'23'
             },
             barWidth: 30,
             yAxis: {
                 axisTick:{
                     show:false
                 }
             },
             series: [{
                 name: '外出',
                 type: 'bar',
                 data: [5, 20, 36, 10, 10, 20,30],
                 itemStyle: {
                     barBorderRadius:10
                 }
             }]
         })
    }
}
