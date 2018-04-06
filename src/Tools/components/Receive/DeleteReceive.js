import React, {Component} from 'react';
import {Modal, Notification, Table} from 'antd';
import {Icon} from 'react-fa';
import moment from 'moment';
export default class DeleteReceive extends Component{
    ok(){
        const {actions: {deleteData, deleteShow, isFresh}, deleteRows} = this.props;
        let promises = deleteRows.map((item, index) => {
            return deleteData({receive_name: item.receive_name})
        })
        Promise.all(promises).then(rst => {
            if (rst.length > 0) {
                Notification.success({
                    message: '批量删除成功'
                })
                deleteShow(false);
                isFresh(true)
            }else{
                Notification.warning({
                    message: '批量删除失败'
                })
            }
        })
    }
    cancel(){
        const {actions: {deleteShow}} = this.props;
        deleteShow(false)
    }
    render(){
        const {deleteVisible = false, deleteRows} = this.props;
        return (
            <Modal
                visible = {deleteVisible}
                width = '80%'
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <h1>申请删除</h1>
                <Table
                    bordered
                    columns = {this.columns}
                    dataSource = {deleteRows}
                    rowKey = "index"
                />
            </Modal>
        )
    }
    columns = [{
        title: '序号',
        key: 'index',
        render: (text, record, index) => {
            record.index = index + 1;
            return (
                <span>{index + 1}</span>
            )
        }
    },{
        title: '姓名',
        dataIndex: 'receive_name',
        key: 'receive_name'
    },{
        title: '宿舍',
        dataIndex: 'receive_dor',
        key: 'receive_dor'
    },{
        title: '领用物品',
        dataIndex: 'receive_tools',
        key: 'receive_tools'
    },{
        title: '领用时间',
        // dataIndex: 'receive_start',
        key: 'receive_start',
        render: (text, record, index) => {
            return (
                <span>{moment(record.receive_start).format('YYYY-MM-DD HH:mm:ss')}</span>
            )
        }
    }]
}
