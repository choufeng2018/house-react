import React, {Component} from 'react';
import {Table, Notification, Button, Divider, Spin, Popconfirm, Tabs} from 'antd';
import {Icon} from 'react-fa';
import moment from 'moment';
const TabPane = Tabs.TabPane;
export default class TableBorrow extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource0: [],
            dataSource1: [],
            loading: false
        }
    }
    async componentDidMount(){
        const {actions: {getData}} = this.props;
        this.setState({loading: true})
        let rst = await getData();
        let dataSource0 = [];
        let dataSource1 = [];
        for (let i = 0; i < rst.length; i++) {
            console.log("rst:",rst[i].borrow_status);
            if (rst[i].borrow_status == "0") {
                dataSource0.push(rst[i]);
            }else{
                dataSource1.push(rst[i]);
            }
        }
        this.setState({dataSource0, dataSource1, loading: false});
    }
    componentWillReceiveProps(nextProps){
        const {actions: {isFresh}, fresh} = nextProps;
        if (fresh) {
            this.componentDidMount();
            isFresh(false)
        }
    }
    async confirm(record){
        const {actions: {deleteData}} = this.props;
        let rst = await deleteData({borrow_name: record.borrow_name});
        if (rst[0].status === 'ok') {
            Notification.success({
                message: '归还成功'
            })
            this.componentDidMount();
        }else{
            Notification.warning({
                message: '归还失败'
            })
        }
    }
    render(){
        return (
            <Spin spinning = {this.state.loading}>
                <Tabs>
                    <TabPane tab="未归还" key="1">
                        <Table
                            columns = {this.columns0}
                            dataSource = {this.state.dataSource0}
                            bordered
                            rowKey = 'visit_name'
                        />
					</TabPane>
					<TabPane tab="已归还" key="2">
                        <Table
                            columns = {this.columns1}
                            dataSource = {this.state.dataSource1}
                            bordered
                            rowKey = 'visit_name'
                        />
					</TabPane>
				</Tabs>

            </Spin>
        )
    }
    columns0 = [{
        title: '序号',
        key: 'index',
        render: (text, record, index) => {
            record.index = index + 1;
            return (
                <span>{index + 1}</span>
            )
        }
    },{
        title: '姓名',
        dataIndex: 'borrow_name',
        key: 'borrow_name'
    },{
        title: '宿舍',
        dataIndex: 'borrow_dor',
        key: 'borrow_dor'
    },{
        title: '借用物品',
        dataIndex: 'borrow_tools',
        key: 'borrow_tools'
    },{
        title: '借用时间',
        // dataIndex: 'borrow_start',
        key: 'borrow_start',
        render: (text, record, index) => {
            return (
                <span>{moment(record.borrow_start).format('YYYY-MM-DD HH:mm:ss')}</span>
            )
        }
    },{
        title: '预计归还时间',
        // dataIndex: 'borrow_return',
        key: 'borrow_return',
        render: (text, record, index) => {
            return (
                <span>{moment(record.borrow_return).format('YYYY-MM-DD HH:mm:ss')}</span>
            )
        }
    },{
        title: '状态',
        key: 'borrow_status',
        render: (text, record, index) => {
            return (
                record.borrow_status === '1' ? <a>已归还</a> : <a>未归还</a>
            )
        }
    },{
        title: '操作',
        render: (text, record, index) => {
            return (
                <div>
                    <Popconfirm onConfirm = {this.confirm.bind(this, record)} title = '确认要归还吗' okText = '是' cancelText='否'>
                        <a>归还</a>
                    </Popconfirm>
                </div>
            )
        }
    }]
    columns1 = [{
        title: '序号',
        key: 'index',
        render: (text, record, index) => {
            record.index = index + 1;
            return (
                <span>{index + 1}</span>
            )
        }
    },{
        title: '姓名',
        dataIndex: 'borrow_name',
        key: 'borrow_name'
    },{
        title: '宿舍',
        dataIndex: 'borrow_dor',
        key: 'borrow_dor'
    },{
        title: '借用物品',
        dataIndex: 'borrow_tools',
        key: 'borrow_tools'
    },{
        title: '借用时间',
        // dataIndex: 'borrow_start',
        key: 'borrow_start',
        render: (text, record, index) => {
            return (
                <span>{moment(record.borrow_start).format('YYYY-MM-DD HH:mm:ss')}</span>
            )
        }
    },{
        title: '预计归还时间',
        // dataIndex: 'borrow_return',
        key: 'borrow_return',
        render: (text, record, index) => {
            return (
                <span>{moment(record.borrow_return).format('YYYY-MM-DD HH:mm:ss')}</span>
            )
        }
    },{
        title: '状态',
        key: 'borrow_status',
        render: (text, record, index) => {
            return (
                record.borrow_status === '1' ? <a>已归还</a> : <a>未归还</a>
            )
        }
    }]
}
