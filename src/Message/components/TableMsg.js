import React, {Component} from  'react';
import {Table, Divider, Popconfirm, Notification, Button} from 'antd';
import {Icon} from 'react-fa';
export default class TableMsg extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }
    columns = [{
        title: '编号',
        dataIndex: 'msg_no',
        key: 'msg_no',
    },{
        title: '标题',
        dataIndex: 'msg_title',
        key: 'msg_title'
    },{
        title: '内容',
        dataIndex: 'msg_content',
        key: 'msg_content'
    },{
        title: '时间',
        dataIndex: 'msg_time',
        key: 'msg_time'
    },{
        title: '留言人',
        dataIndex: 'msg_person',
        key: 'msg_person'
    },{
        title: '操作',
        width: '20%',
        render: (text, record, index) => {
            return (
                <div>
                    <a onClick = {this.edit.bind(this, record)}><Icon name='eye'/></a>
                    <Divider type='vertical' />
                    <a onClick = {this.edit.bind(this, record)}><Icon name='edit' /></a>
                    <Divider type='vertical' />
                    <Popconfirm title="确定删除吗？" onConfirm={this.confirm.bind(this, record)} okText="是" cancelText="否">
                        <a><Icon name='trash'/></a>
                    </Popconfirm>
                </div>
            )
        }
    }]
    edit(record){
        const {actions: {saveEditData, showEditModal}} = this.props;
        let data = JSON.stringify(record);
        let new_data = JSON.parse(data);
        saveEditData([new_data]);
        showEditModal(true)
    }
    async confirm(record){
        const {actions: {deleteBuilding, is_fresh}} = this.props;
        let rst = await deleteBuilding({buil_no: record.buil_no, time: new Date()})
        if (rst[0].status === "ok") {
            Notification.success({
                message: '删除成功'
            })
            is_fresh(true)
        }else{
            Notification.waring({
                message: '删除失败'
            })
        }
    }
    addMsg(){

    }
    render(){
        return (
            <section style={{margin: '20px 20px 0 20px'}}>
                <Button style={{marginBottom: '10px'}} onClick = {this.addMsg.bind(this)}>添加留言</Button>
                <Table
                    bordered
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    rowKey = 'msg_no'
                />
            </section>
        )
    }
}
