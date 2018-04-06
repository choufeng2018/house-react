import React, {Component} from  'react';
import {Table, Divider, Popconfirm, Notification} from 'antd';
import {Icon} from 'react-fa';
export default class BuildingDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }
    columns = [{
        title: '单元楼编号',
        dataIndex: 'buil_no',
        key: 'buil_no',
        width: '20%'
    },{
        title: '单元楼名称',
        dataIndex: 'buil_name',
        width: '20%',
        key: 'buil_name'
    },{
        title: '管理人员',
        dataIndex: 'buil_admin',
        width: '20%',
        key: 'buil_admin'
    },{
        title: '描述',
        dataIndex: 'buil_desc',
        width: '20%',
        key: 'buil_desc'
    },{
        title: '操作',
        width: '20%',
        render: (text, record, index) => {
            return (
                <div>
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
    render(){
        const {node} = this.props;
        let dataSource = node;
        return (
            <section style={{margin: '0 10px 0 160px'}}>
                <h1 >单元楼详情</h1>
                <Table
                    bordered
                    columns = {this.columns}
                    dataSource = {dataSource}
                    rowKey = 'buil_no'
                />
            </section>
        )
    }
}
