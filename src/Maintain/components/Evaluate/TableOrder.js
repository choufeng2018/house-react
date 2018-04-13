import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Tabs, Spin, Popconfirm} from 'antd';
import {Icon} from 'react-fa'
import {getCookie} from '../../../_platform/cookie';
const TabPane = Tabs.TabPane;
export default class TableOrder extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource: [],
            spin: false
        }
    }
    seeEvaluate(record){
        const {actions: {saveEvaluteData, setShowEvalute}} = this.props;
        saveEvaluteData(record);
        setShowEvalute(true);
    }
    render(){
        return(
            <Spin spinning = {this.state.spin}>
                <Table
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    bordered
                    rowKey = 'code'
                />
            </Spin>
        )
    }
    async componentDidMount(){
        this.setState({spin: true})
        const {actions: {getRepair}} = this.props;
        this.setState({spin: true})
        let login_info = JSON.parse(getCookie('login'));
        let rst = await getRepair({receive: login_info[0].repman_name});
        this.setState({dataSource: rst, spin: false});
    }
    columns = [{
        title: '报修单编号',
        dataIndex: 'code',
        key: 'code',
    },{
        title: '报修内容',
        dataIndex: 'content',
        key: 'content',
    },{
        title: '报修人',
        dataIndex: 'person',
        key: 'person'
    },{
        title: '地点',
        dataIndex: 'place',
        key: 'place'
    },{
        title: '联系方式',
        dataIndex: 'tel',
        key: 'tel'
    },{
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: '15%'
    },{
        title: '操作',
        key: 'accept',
        render: (text, record, index) => (
            <a onClick = {this.seeEvaluate.bind(this, record)}>查看评价</a>
        )
    }]
}
