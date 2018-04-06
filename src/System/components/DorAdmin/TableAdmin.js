import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Button, Spin, Popconfirm} from 'antd';
import {Icon} from 'react-fa';
export default class TableAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            spin: false,
            selectedRows: []
        }
    }
    componentWillReceiveProps(nextProps){
        const {actions: {isFresh}, fresh} = nextProps;
        if (fresh) {
            this.componentDidMount();
            isFresh(false)
        }
    }
    async componentDidMount(){
        this.setState({spin: true});
        const {actions: {getDorAdminAc}} = this.props;
        let rst = await getDorAdminAc();
        this.setState({dataSource: rst, spin: false});
    }
    addSingle(){
        const {actions: {showCreateModal}} = this.props;
        showCreateModal(true)
    }
    addBatch(){
        const {actions: {showCreateBatch}} = this.props;
        showCreateBatch(true);
    }
    deleteBatch(){
        if (this.state.selectedRows.length === 0) {
            Notification.warning({
                message: '请至少选中一条数据'
            })
            return;
        }
        const {actions: {showDeleteBatch, saveDeleteData}} = this.props;
        saveDeleteData(this.state.selectedRows);
        showDeleteBatch(true);
    }
    async confirm(record){
        const {actions: {deleteDorAdminAc}} = this.props;
        let rst = await deleteDorAdminAc({"doradmin_no":record.doradmin_no});
        console.log("rst:",rst);
        if (rst[0].status === 'ok') {
            Notification.success({
                message: "删除成功"
            })
            this.componentDidMount();
        }else{
            Notification.success({
                message: "删除失败"
            })
        }
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

        },
        onSelect: (record, selected, selectedRows) => {
            this.setState({selectedRows: selectedRows});
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            this.setState({selectedRows: selectedRows});
        }
    }
    render(){
        return (
            <Spin spinning = {this.state.spin}>
                <Button onClick={this.addSingle.bind(this)}>单个添加管理员信息</Button>
                <Divider type='vertical' />
                <Button onClick = {this.addBatch.bind(this)}>批量添加管理员信息</Button>
                <Divider type='vertical' />
                <Button onClick = {this.deleteBatch.bind(this)}>批量删除管理员信息</Button>
                <div style={{margin: '10px'}}></div>
                <Table
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    bordered
                    rowKey = 'doradmin_no'
                    rowSelection={this.rowSelection}
                />
            </Spin>
        )
    }
    edit(record){
        const {actions: {saveEditData, showEditModal}} = this.props;
        let data = JSON.stringify(record);
        let new_data = JSON.parse(data);
        saveEditData([new_data]);
        showEditModal(true);
    }
    columns = [{
        title: '序号',
        key: 'index',
        render: (text, record, index) => {
            record.index = index + 1;
            return (
                <span>{record.index}</span>
            )
        }
    },{
        title: '工号',
        dataIndex: 'doradmin_no',
        key: 'doradmin_no'
    },{
        title: '姓名',
        dataIndex: 'doradmin_name',
        key: 'doradmin_name'
    },{
        title: '性别',
        dataIndex: 'doradmin_sex',
        key: 'doradmin_sex'
    },{
        title: '联系方式',
        dataIndex: 'doradmin_tel',
        key: 'doradmin_tel'
    },{
        title: '操作',
        render: (text, record, index) => {
            return (
                <div>
                    <a onClick = {this.edit.bind(this, record)}><Icon name='edit' /></a>
                    <Divider type='vertical' />
                    <Popconfirm title="确认删除吗" onConfirm = {this.confirm.bind(this, record)} okText="是" cancelText = "否">
                        <a><Icon name='trash' /></a>
                    </Popconfirm>
                </div>
            )
        }
    }]
}
