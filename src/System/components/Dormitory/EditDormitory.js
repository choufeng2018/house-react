import React, {Component} from  'react';
import {Table, Divider, Popconfirm, Notification, Modal, Input} from 'antd';
import {Icon} from 'react-fa';
import './style.less';
export default class EditDormitory extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }
    columns = [{
        title: '宿舍编号',
        // dataIndex: 'dor_no',
        key: 'dor_no',
        width: '20%',
        render: (text, record, index) => {
            if (record.editing) {
                return (
                    <Input className='input' type = 'text' value = {record.dor_no} onChange = {(e) => {
                        record.dor_no = e.target.value;
                        this.forceUpdate();
                    }}/>
                )
            } else {
                return <span>{record.dor_no}</span>
            }
        }
    },{
        title: '宿舍名称',
        width: '20%',
        key: 'dor_name',
        render: (text, record, index) => {
            if (record.editing) {
                return (
                    <Input className='input' type = 'text' value = {record.dor_name} onChange = {(e) => {
                        record.dor_name = e.target.value;
                        this.forceUpdate();
                    }}/>
                )
            } else {
                return <span>{record.dor_name}</span>
            }
        }
        // dataIndex: 'dor_name',
    },{
        title: '描述',
        width: '20%',
        key: 'dor_desc',
        render: (text, record, index) => {
            if (record.editing) {
                return (
                    <Input className='input' type = 'text' value = {record.dor_desc} onChange = {(e) => {
                        record.dor_desc = e.target.value;
                        this.forceUpdate();
                    }}/>
                )
            } else {
                return <span>{record.dor_desc}</span>
            }
        }
        // dataIndex: 'dor_desc',
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
                    <a  onClick = {() => {
                        record.editing = true;
                        this.forceUpdate();
                    }}>编辑</a>
                )
            }
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
    componentWillReceiveProps(nextProps){
        const {editData = []} = nextProps;
        let data = editData.map((item, index) => {
            return {
                ...item,
                editing: false
            }
        })
        this.setState({dataSource: editData});
    }
    async ok(){
        const {actions: {showEditModal, editModalAc, is_fresh, saveDormitory}} = this.props;
        let rst = await editModalAc({}, this.state.dataSource[0]);
        if (rst[0].status === "ok") {
            Notification.success({
                message: '变更成功'
            })
            showEditModal(false);
            is_fresh(true);
            saveDormitory(this.state.dataSource)
        }else{
            Notification.success({
                message: '变更失败'
            })
        }
    }
    cancel(){
        const {actions: {showEditModal}} = this.props;
        showEditModal(false);
    }
    render(){
        const {editModal = false} = this.props;
        return (
                <Modal
                    visible = {editModal}
                    width = "60%"
                    onOk = {this.ok.bind(this)}
                    onCancel = {this.cancel.bind(this)}
                >
                    <h1 >申请变更</h1>
                    <Table
                        bordered
                        columns = {this.columns}
                        dataSource = {this.state.dataSource}
                        rowKey = 'dor_no'
                    />
                </Modal>

        )
    }
}
