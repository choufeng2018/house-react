import React, {Component} from 'react';
import  {Modal, Table, Notification} from 'antd'
export default class AcceptOrder extends Component{
    ok(){
        const {actions: {setAcceptShow}} = this.props;
        Notification.success({
            message: '接单成功'
        })
        setAcceptShow(false)
    }
    cancel(){
        const {actions: {setAcceptShow}} = this.props;
        setAcceptShow(false)
    }
    render(){
        const {acceptShow = false, orderData = []} = this.props;
        return (
            <Modal
                visible = {acceptShow}
                width = '80%'
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <h3 style = {{textAlign: 'center'}}>确认接单</h3>
                <Table
                    columns = {this.columns}
                    dataSource = {orderData}
                    bordered
                />
            </Modal>
        )
    }
    columns = [{
        title: '序号',
        render: (text, record, index) => {
            record.index = index + 1
            return (
                <span>{record.index}</span>
            )
        }
    },{
        title: '报修单编号',
        dataIndex: 'code',
        key: 'code',
        width: '15%'
    },{
        title: '报修内容',
        dataIndex: 'content',
        key: 'content',
        width: '35%'
    },{
        title: '报修人',
        dataIndex: 'person',
        key: 'person'
    },{
        title: '地点',
        dataIndex: 'place',
        key: 'place'
    },{
        title: '联系方式',
        dataIndex: 'tel',
        key: 'tel'
    },{
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: '15%'
    }]
}
