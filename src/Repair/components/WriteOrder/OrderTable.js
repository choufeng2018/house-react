import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Spin, Popconfirm, Input} from 'antd';
import {Icon} from 'react-fa';
import {getCookie} from '../../../_platform/cookie';
import './search.less';
const {Search} = Input;
export default class OrderTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource: [],
            spin: false
        }
    }
    render(){
        return(
            <Spin spinning = {this.state.spin}>
                <Search onSearch = {(content) => {
                    if (content === '') {
                        this.setState({dataSource: this.state.originData});
                        return ;
                    }
                    let arr = this.state.dataSource.filter((item, index) =>(
                         item.code.indexOf(content) !== -1 || item.content.indexOf(content) !== -1
                    ))
                    this.setState({dataSource: arr});
                }} className='search' placeholder = '请输入报修单编号或报修内容'/>
                <Table
                    bordered
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    rowKey = 'code'
                />
            </Spin>
        )
    }
    componentWillReceiveProps(nextProps){
        const {actions: {isFresh}, fresh} = nextProps;
        if (fresh) {
            this.componentDidMount();
            isFresh(false);
        }
    }
    async componentDidMount(){
        const {actions: {getRepair}} = this.props;
        this.setState({spin: true})
        let login_info = JSON.parse(getCookie('login'));
        let rst = await getRepair({person: login_info[0].user_name});
        this.setState({dataSource: rst, spin: false, originData: rst});
    }
    edit(record){
        const {actions: {setEditData, setWriteShow}} = this.props;
        setWriteShow({show: true, type: 'edit'})
        setEditData(record)
    }
    async confirm(record){
        const {actions: {deleteRepair}} = this.props;
        let rst = await deleteRepair({code: record.code});
        if (rst[0].status === 'ok') {
            Notification.success({
                message: '删除成功',
                duration: '1s'
            })
            this.componentDidMount();
        }
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
        title: '是否接单',
        key: 'accept',
        width: '15%',
        render: (text, record, index) => {
            if (record.accept === '0') {
                return (
                    <span style = {{color: 'red'}}>未接单</span>
                )
            }else{
                return (
                    <a>已接单</a>
                )
            }
        }
    },{
        title: '维修人',
        key: 'receive',
        dataIndex: 'receive'
    },{
        title: '操作',
        key: 'operation',
        render: (text, record, indx) => (
            <div>
                <a><Icon name = 'edit' onClick = {this.edit.bind(this, record)}></Icon></a>
                <Divider type = 'vertical'/>
                <Popconfirm title='确认删除吗' okText = '是' cancelText='否' onConfirm = {this.confirm.bind(this, record)}>
                    <a><Icon name = 'trash'></Icon></a>
                </Popconfirm>
            </div>
        )
    }]
}
