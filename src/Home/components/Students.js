import React,{Component} from 'react';
import {Card, Spin} from 'antd'
import echarts from 'echarts'
import './Students.less';
import moment from 'moment';
import {actions} from '../store/home';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
@connect(
    state => {
        return {...state}
    },
    dispatch => ({
        actions: bindActionCreators({...actions}, dispatch)
    })
)
export class Students extends Component{
    constructor(props){
        super(props);
        this.state = {
            spin: false
        }
    }
    render(){
        return (
            <Card title = '近五天访问人数' >
                <Spin spinning = {this.state.spin}><div id="main" style={{height:'360px', width: '600px'}}></div></Spin>
            </Card>
        )
    }
    async componentDidMount(){
         const {actions: {getVisit}} = this.props;
         this.setState({spin: true});
         let rst = await getVisit();
         let data = rst.map((item, index) => {
             return item.visit_num
         });
         let data_new = data.reverse();
         var myChart = echarts.init(document.getElementById('main'));
         myChart.setOption({
             tooltip: {},
             xAxis: {
                 data: [moment().subtract(4, 'days').format('MM/DD'), moment().subtract(3, 'days').format('MM/DD'), moment().subtract(2, 'days').format('MM/DD'), moment().subtract(1, 'days').format('MM/DD'), moment().format('MM/DD')],
                 axisTick: {
                     show:false
                 },
                 axisLabel: {
                     padding: [15, 0, 0, 0],
                     fontSize: 16
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
                 left:'23',
                 height:'315'
             },
             barWidth: 20,
             yAxis: {
                 axisTick:{
                     show:false
                 }
             },
             series: [{
                 name: '访问人数',
                 type: 'bar',
                 data: data_new,
                 itemStyle: {
                     normal: {
                         barBorderRadius:10,
                         color: "rgb(37, 132, 210)",
                     }
                 },
                 // markLine : {
                 //    itemStyle:{
                 //       normal:{
                 //           lineStyle:{
                 //               type: 'dashed'
                 //           }
                 //       }
                 //    },
                 //    data : [
                 //        [{type : 'min'}, {type : 'max'}]
                 //    ]
                 // }
             },{
                 type: 'line',
                 data: data_new,
                 symbolSize: 0,
                 smooth: true,
                 itemStyle: {
                     normal: {
                         color: "#27b6c9"
                     }
                 },
             }]
         })
         this.setState({spin: false});
    }
}
