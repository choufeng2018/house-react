import React, {Component} from 'react';
import {Modal, Table, Notification, Upload, Divider, Popconfirm, Button, Icon, Spin} from 'antd';
export default class DeleteRepManBatch extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            spin: false
        }
    }
    ok(){
        const {actions: {deleteRepman, setDeleteBatch, isFresh}} = this.props;
        this.setState({
            spin: true
        })
        let promises = this.state.dataSource.map((item, index) => {
            return deleteRepman({repman_no: item.repman_no})
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
            setDeleteBatch(false);
            isFresh(true);
        })
    }
    cancel(){
        const {actions: {setDeleteBatch}} = this.props;
        setDeleteBatch(false)
    }
    componentWillReceiveProps(nextProps){
        const {deleteData = []} = nextProps;
        this.setState({dataSource: deleteData})
    }
    render(){
        const {batchDelete = false} = this.props;
        return (
            <Modal
                visible = {batchDelete}
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
                            rowKey = "repman_no"
                        />
                    </Spin>
                </Modal>
        )
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index'
    },{
        title: '工号',
        dataIndex: 'repman_no',
        key: 'repman_no'
    },{
        title: '姓名',
        dataIndex: 'repman_name',
        key: 'repman_name'
    },{
        title: '性别',
        dataIndex: 'repman_sex',
        key: 'repman_sex'
    },{
        title: '联系方式',
        dataIndex: 'repman_tel',
        key: 'repman_tel'
    },{
        title: '住址',
        dataIndex: 'repman_adr',
        key: 'repman_adr'
    }]
}
