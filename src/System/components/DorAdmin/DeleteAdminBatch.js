import React, {Component} from 'react';
import {Modal, Table, Notification, Upload, Divider, Popconfirm, Button, Icon, Spin} from 'antd';
export default class DeleteAdminBatch extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            spin: false
        }
    }
    ok(){
        const {actions: {deleteDorAdminAc, showDeleteBatch, isFresh}} = this.props;
        this.setState({
            spin: true
        })
        let promises = this.state.dataSource.map((item, index) => {
            return deleteDorAdminAc({doradmin_no: item.doradmin_no})
        })
        Promise.all(promises).then(rst => {
            if (rst.length === this.state.dataSource.length) {
                this.setState({
                    spin: false
                })
                Notification.success({
                    message: '批量删除成功'
                })
            }
            showDeleteBatch(false);
            isFresh(true);
        })
    }
    cancel(){
        const {actions: {showDeleteBatch}} = this.props;
        showDeleteBatch(false)
    }
    componentWillReceiveProps(nextProps){
        const {deleteData = []} = nextProps;
        this.setState({dataSource: deleteData})
    }
    render(){
        const {deleteBatch = false} = this.props;
        return (
            <Modal
                visible = {deleteBatch}
                width = "80%"
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
                >
                    <Spin spinning = {this.state.spin}>
                        <h1>申请删除</h1>
                        <Table
                            columns = {this.columns}
                            dataSource = {this.state.dataSource}
                            bordered
                            rowKey = "doradmin_no"
                        />
                    </Spin>
                </Modal>
        )
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
    }]
}
