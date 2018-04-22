import React, {Component} from  'react';
import {Table, Divider, Popconfirm, Notification, Button, Spin} from 'antd';
import {Icon} from 'react-fa';
import {getCookie} from '../../../_platform/cookie';
import './TableStyle.less'
export default class TableMsg extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            spin: false
        }
    }
    async componentDidMount(){
        let login_info = JSON.parse(getCookie('login'));
        this.setState({spin: true});
        const {actions: {getMessage}} = this.props;
        let rst = await getMessage({msg_send: login_info[0].user_name});
        let dataSource = rst.map((item, index) => {
            return {
                index: index + 1,
                ...item
            }
        })
        this.setState({dataSource, spin: false});
    }
    componentWillReceiveProps(nextProps){
        const {fresh, actions: {isFresh}} = nextProps;
        if (fresh) {
            this.componentDidMount();
            isFresh(false);
        }
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index'
    },{
        title: '标题',
        dataIndex: 'msg_title',
        key: 'msg_title'
    },{
        title: '内容',
        key: 'msg_content',
        width: '40%',
        render: (text, record, index) => {
            return (
                <div className = 'newsContent' style={{marginTop: '13px'}} dangerouslySetInnerHTML={{__html:record.msg_content}}></div>
            )
        }
    },{
        title: '时间',
        dataIndex: 'msg_time',
        key: 'msg_time'
    },{
        title: '留言人',
        dataIndex: 'msg_send',
        key: 'msg_send'
    },{
        title: '留言给',
        dataIndex: 'msg_receive',
        key: 'msg_receive'
    },{
        title: '操作',
        width: '6%',
        render: (text, record, index) => {
            return (
                <div>
                    <Popconfirm title="确定删除吗？" onConfirm={this.confirm.bind(this, record)} okText="是" cancelText="否">
                        <a><Icon name='trash'/></a>
                    </Popconfirm>
                </div>
            )
        }
    }]
    async confirm(record){
        const {actions: {deleteMessage, isFresh}} = this.props;
        let rst = await deleteMessage({msg_id: record.msg_id});
        if (rst[0].status === "ok") {
            Notification.success({
                message: '删除成功'
            })
            isFresh(true)
        }else{
            Notification.waring({
                message: '删除失败'
            })
        }
    }
    render(){
        return (
            <Spin spinning = {this.state.spin}>
                <Table
                    bordered
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    rowKey = 'msg_title'
                />
            </Spin>
        )
    }
}
