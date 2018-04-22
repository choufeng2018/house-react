import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Tabs, Spin, Popconfirm} from 'antd';
import {Icon} from 'react-fa'
import {getCookie} from '../../../_platform/cookie';
const TabPane = Tabs.TabPane;
export default class TableOrder extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource1: [],
            dataSource2: [],
            spin: false
        }
    }
    render(){
        return(
            <Spin spinning = {this.state.spin}>
                <Tabs>
                    <TabPane tab="未接单" key="1">
                        <Table
                            columns = {this.columns1}
                            dataSource = {this.state.dataSource1}
                            bordered
                            rowKey = 'code'
                        />
					</TabPane>
					<TabPane tab="已接单" key="2">
                        <Table
                            columns = {this.columns2}
                            dataSource = {this.state.dataSource2}
                            bordered
                            rowKey = 'code'
                        />
					</TabPane>
				</Tabs>
            </Spin>
        )
    }
    async componentDidMount(){
        this.setState({spin: true})
        const {actions: {getRepair}} = this.props;
        this.setState({spin: true})
        let login_info = JSON.parse(getCookie('login'));
        let rst = await getRepair();
        let dataSource1 = [], dataSource2 = [];
        for (let i = 0; i < rst.length; i++) {
            if (rst[i].receive === login_info[0].user_name) {
                dataSource2.push(rst[i]);
            }else if(rst[i].accept === '0'){
                dataSource1.push(rst[i]);
            }
        }
        this.setState({dataSource1, dataSource2, spin: false});
    }
    // 接单函数
    async acceptOrder(record){
        const {actions: {saveOrderData, acceptOrderAc}} = this.props;
        let login_info = JSON.parse(getCookie("login"));
        let rst = await acceptOrderAc({code: record.code, receive: login_info[0].user_name})
        if (rst[0].status === 'ok') {
            Notification.success({
                message: '接单成功'
            });
            saveOrderData([record]);
            this.componentDidMount();
        }else{
            Notification.success({
                message: '接单失败'
            });
        }
    }
    columns1 = [{
        title: '报修单编号',
        dataIndex: 'code',
        key: 'code'
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
        title: '状态',
        key: 'accept',
        render: (text, record, index) => (
            <span style={{color: 'red'}}>未接单</span>
        )
    },{
        title: '操作',
        key: 'operation',
        render: (text, record, indx) => (
            <Popconfirm  onConfirm = {this.acceptOrder.bind(this, record)} okText = '是' cancelText = '否' title = '确认接单吗'>
                <a>接单</a>
            </Popconfirm>
        )
    }]
    columns2 = [{
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
        title: '状态',
        key: 'accept',
        render: (text, record, index) => (
            <span style={{color: 'red'}}>已接单</span>
        )
    }]
}
