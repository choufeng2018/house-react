import React, {Component} from  'react';
import {Table, Divider, Popconfirm, Notification} from 'antd';
import {Icon} from 'react-fa';
export default class TableDormitory extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }
    columns = [{
        title: '单元房编号',
        dataIndex: 'dor_no',
        key: 'dor_no',
        width: '20%'
    },{
        title: '单元房名称',
        dataIndex: 'dor_name',
        width: '20%',
        key: 'dor_name'
    },{
        title: '描述',
        dataIndex: 'dor_desc',
        width: '20%',
        key: 'dor_desc'
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
        const {actions: {deleteDormitory, is_fresh,saveBuilding}} = this.props;
        let rst = await deleteDormitory({dor_no: record.dor_no})
        if (rst[0].status === "ok") {
            Notification.success({
                message: '删除成功'
            })
            let node1 = [{
                dor_no: '',
                dor_name: '',
                dor_desc: '',
                dor_type: ''
            }]
            saveBuilding("01-102--1号楼102----李明阳--building");
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
            <section style={{margin: '0 10px 0 325px'}}>
                <h1 >单元房详情</h1>
                <Table
                    bordered
                    columns = {this.columns}
                    dataSource = {dataSource}
                    rowKey = 'dor_no'
                />
            </section>
        )
    }
}
