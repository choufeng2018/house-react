import React, {Component} from 'react';
import {Modal, Table, Notification, Divider, Input, Select} from 'antd';
import {Icon} from 'react-fa';
import './style.less'
const {Option} = Select;
export default class EditBuilding extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }
    componentWillReceiveProps(nextProps){
        const {editData = []} = nextProps;
        let data = editData.map((item, index) => {
            return{
                ...item,
                editing: false
            }
        })
        this.setState({dataSource: data});
    }
    async ok(){
        const {actions: {showEditModal, editBuilding,is_fresh}} = this.props;
        let data = this.state.dataSource;
        let rst = await editBuilding({"buil_no": data[0].buil_no},data[0]);
        if (rst[0].status === 'ok') {
            Notification.success({
                message: '更新成功'
            })
            is_fresh(true)
        } else {
            Notification.success({
                message: '更新失败'
            })
        }
        showEditModal(false)
    }
    cancel(){
        const {actions: {showEditModal}} = this.props;
        showEditModal(false)
    }
    render(){
        const {editModal = false} = this.props;
        return (
            <Modal
                visible = {editModal}
                width = '80%'
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <h1>申请编辑</h1>
                <Divider><Icon name='cut' /></Divider>
                <Table
                    bordered
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    rowKey = 'buil_no'
                />
            </Modal>
        )
    }
    columns = [{
        title: '宿舍楼编号',
        key: 'buil_no',
        width: '20%',
        dataIndex: 'buil_no'
    },{
        title: '宿舍楼名称',
        width: '20%',
        key: 'buil_name',
        render: (text, record, index) => {
            if (record.editing) {
                return <Input className='input' type='text' value={record.buil_name} onChange={(e) => {
                    record.buil_name = e.target.value;
                    this.forceUpdate();
                }}/>
            } else {
                return <span>{record.buil_name}</span>
            }
        }
    },{
        title: '宿管人员',
        width: '20%',
        key: 'buil_admin',
        render: (text, record, index) => {
            if (record.editing) {
                return (
                    <Select value={record.buil_admin} onSelect={(e) => {
                        record.buil_admin = e;
                        this.forceUpdate();
                    }}>
                        <Option value = "张三">张三</Option>
                        <Option value = "李四">李四</Option>
                        <Option value = "王五">王五</Option>
                    </Select>
                )
            } else {
                return <span>{record.buil_admin}</span>
            }
        }
    },{
        title: '描述',
        width: '20%',
        key: 'buil_desc',
        render: (text, record, index) => {
            if (record.editing) {
                return <Input className='input' type='text' value={record.buil_desc} onChange={(e) => {
                    record.buil_desc = e.target.value;
                    this.forceUpdate();
                }}/>
            } else {
                return <span>{record.buil_desc}</span>
            }
        }
    },{
        title: '操作',
        render: (text, record, index) => {
            if (record.editing) {
                return (
                    <a onClick = {() => {
                        record.editing = false;
                        this.forceUpdate();
                    }}>完成</a>
                )
            } else {
                return (
                    <a onClick = {() => {
                        record.editing = true;
                        this.forceUpdate();
                    }}>点击编辑</a>
                )
            }
        }
    }]
}
