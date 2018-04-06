import React, {Component} from 'react';
import {Table, Notification, Button, Divider, Spin, Popconfirm} from 'antd';
import {Icon} from 'react-fa';
import moment from 'moment';
export default class TableVisit extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            loading: false
        }
    }
    async componentDidMount(){
        const {actions: {getData}} = this.props;
        this.setState({loading: true})
        let rst = await getData()
        this.setState({dataSource: rst, loading: false});
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
        let rst = await deleteData({goods_name: record.goods_name});
        if (rst[0].status === 'ok') {
            Notification.success({
                message: '删除成功'
            })
            this.componentDidMount();
        }else{
            Notification.warning({
                message: '删除失败'
            })
        }
    }
    render(){
        return (
            <Spin spinning = {this.state.loading}>
                <Table
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    bordered
                    rowKey = 'visit_name'
                />
            </Spin>
        )
    }
    columns = [{
        title: '姓名',
        dataIndex: 'goods_name',
        key: 'goods_name'
    },{
        title: '宿舍号',
        dataIndex: 'goods_dor',
        key: 'goods_dor'
    },{
        title: '外带物品',
        dataIndex: 'goods_desc',
        key: 'goods_desc'
    },{
        title: '外出时间',
        key:'goods_leave',
        render: (text, record, index) => {
            return (
                <span>{moment(record.goods_leave).format('YYYY-MM-DD HH:mm:ss')}</span>
            )
        }
    },{
        title: '操作',
        render: (text, record, index) => {
            return (
                <div>
                    <a><Icon name = 'edit'/></a>
                    <Divider type = 'vertical' />
                    <Popconfirm onConfirm = {this.confirm.bind(this, record)} title = '确认要删除吗' okText = '是' cancelText='否'>
                        <a><Icon name = 'trash'/></a>
                    </Popconfirm>
                </div>
            )
        }
    }]
}
