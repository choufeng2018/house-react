import React, {Component} from 'react';
import {Modal, Table, Notification, Upload, Divider, Popconfirm, Button, Icon, Spin, Select, Input} from 'antd';
import './style.less';
const {Option} = Select;
export default class EditAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
        }
    }
    async ok(){
        const {actions: {isFresh, showEditModal, editDataAc}} = this.props;
        let rst = await editDataAc({doradmin_no: this.state.dataSource[0].doradmin_no}, this.state.dataSource[0]);
        console.log("rst:",rst);
        if (rst[0].status === 'ok') {
            Notification.success({
                message: "变更成功"
            })
            isFresh(true);
            showEditModal(false)
        }
    }
    cancel(){
        const {actions: {showEditModal}} = this.props;
        showEditModal(false)
    }
    componentWillReceiveProps(nextProps){
        const {editData = []} = nextProps;
        let data = editData.map((item, index) => {
            return {
                ...item,
                editing: false
            }
        })
        this.setState({dataSource: editData})
    }
    render(){
        const {editShow = false} = this.props;
        return (
            <Modal
                visible = {editShow}
                width = "80%"
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <h1>申请变更</h1>
                <Table
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    bordered
                    rowKey = "doradmin_no"
                />
            </Modal>
        )
    }
    columns = [{
        title: '工号',
        dataIndex: 'doradmin_no',
        key: 'doradmin_no',
        width: '20%',
    },{
        title: '姓名',
        key: 'doradmin_name',
        width: '20%',
        render: (text, record, index) => {
            if (record.editing) {
                return (
                    <Input className='input' type = 'text' value = {record.doradmin_name} onChange = {(e) => {
                        record.doradmin_name = e.target.value;
                        this.forceUpdate();
                    }}/>
                )
            } else {
                return <span>{record.doradmin_name}</span>
            }
        }
        // dataIndex: 'doradmin_name',

    },{
        title: '性别',
        key: 'doradmin_sex',
        width: '20%',
        // dataIndex: 'doradmin_sex',
        render: (text, record, index) => {
            if (record.editing) {
                return (
                    <Select value = {record.doradmin_sex} onSelect = {(e) => {
                        record.doradmin_sex = e;
                        this.forceUpdate();
                    }}>
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                )
            } else {
                return <span>{record.doradmin_sex}</span>
            }
        }
    },{
        title: '联系方式',
        key: 'doradmin_tel',
        width: '20%',
        render: (text, record, index) => {
            if (record.editing) {
                return (
                    <Input className='input' type = 'text' value = {record.doradmin_tel} onChange = {(e) => {
                        record.doradmin_tel = e.target.value;
                        this.forceUpdate();
                    }}/>
                )
            } else {
                return <span>{record.doradmin_tel}</span>
            }
        }
        // dataIndex: 'doradmin_tel',
    },{
        title: '操作',
        width: '20%',
        render: (text, record, index) => {
            if (record.editing) {
                return (
                    <a onClick = {() => {
                        record.editing = false;
                        this.forceUpdate();
                    }}>完成</a>
                )
            }else{
                return (
                    <a onClick = {() => {
                        record.editing = true
                        this.forceUpdate();
                    }}>编辑</a>
                )
            }
        }
    }]
}
