import React,{Component} from 'react';
import {Card} from 'antd'
import echarts from 'echarts'
import './Students.less';
import moment from 'moment';
export class Students extends Component{

    render(){
        return (
            <Card title = '近五天登录人数' >
                <div id="main" style={{height:'350px', width: '600px'}}></div>
            </Card>
        )
    }
    componentDidMount(){
         var myChart = echarts.init(document.getElementById('main'));
         console.log(moment().format('MM/DD'));
         myChart.setOption({
             tooltip: {},
             xAxis: {
                 data: [moment().subtract(4, 'days').format('MM/DD'), moment().subtract(3, 'days').format('MM/DD'), moment().subtract(2, 'days').format('MM/DD'), moment().subtract(1, 'days').format('MM/DD'), moment().format('MM/DD')],
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
                 name: '登录人数',
                 type: 'bar',
                 data: [5, 20, 36, 10, 10],
                 itemStyle: {
                     barBorderRadius:10
                 }
             }]
         })
    }
}
