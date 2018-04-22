import React, {Component} from 'react';
import {Table, Notification, Button, Divider, Spin, Popconfirm,Input} from 'antd';
import {Icon} from 'react-fa';
import moment from 'moment';
import './search.less';
const {Search} = Input;
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
        this.setState({dataSource: rst, loading: false, originData: rst});
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
        let rst = await deleteData({visit_name: record.visit_name});
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
                <Search onSearch = {(content) => {
                    if (content === '') {
                        this.setState({dataSource: this.state.originData});
                        return ;
                    }
                    let arr = this.state.dataSource.filter((item, index) =>(
                         item.visit_name.indexOf(content) !== -1
                    ))
                    this.setState({dataSource: arr});
                }} className='search' placeholder = '请输入来访人姓名'/>
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
        title: '来访人姓名',
        dataIndex: 'visit_name',
        key: 'visit_name'
    },{
        title: '访问人',
        dataIndex: 'visit_person',
        key: 'visit_person'
    },{
        title: '与被访者关系',
        dataIndex: 'visit_rela',
        key: 'visit_rela'
    },{
        title: '手机号',
        dataIndex: 'visit_tel',
        key: 'visit_tel'
    },{
        title: '访问时间',
        // dataIndex: 'visit_entry',
        key:'visit_entry',
        render: (text, record, index) => {
            return (
                <span>{moment(record.visit_entry).format('YYYY-MM-DD HH:mm:ss')}</span>
            )
        }
    },{
        title: '预计离开时间',
        // dataIndex: 'visit_leave',
        key: 'visit_leave',
        render: (text, record, index) => {
            return (
                <span>{moment(record.visit_leave).format('YYYY-MM-DD HH:mm:ss')}</span>
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
