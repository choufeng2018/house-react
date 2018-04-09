import React, {Component} from 'react';
import {Table, Divider, Popconfirm, Spin, Icon as Icon2, Notification} from 'antd';
import {Icon} from 'react-fa';
import moment from 'moment';
export default class DistriDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            spinStatus: true,
            dataSource: []
        }
    }
    async componentWillReceiveProps(nextProps){
        const {distriData = [], spinStatus = true, fresh = {fre: false, dor_no: ''}, actions: {is_fresh}} = nextProps;
        if (fresh.fre) {
            this.getData(fresh.dor_no)
            is_fresh({
                fre:false
            })
        }
        this.setState({spinStatus: spinStatus, dataSource: distriData});
    }
    edit(record){
        const {actions: {showDistriDor, saveEditData}} = this.props;
        showDistriDor({show: true, type: 'edit'});
        saveEditData(record);
    }
    async getData(dor_no){
        const {actions: {getDistri}} = this.props;
        this.setState({spinStatus: true});
        let rst = await getDistri({owner_house: dor_no});
        this.setState({spinStatus: false, dataSource: rst});
    }
    async confirm(record){
        const {actions: {deleteDistri}} = this.props;
        let rst = await deleteDistri({owner_no:record.owner_no});
        if(rst[0].status === 'ok'){
            Notification.success({
                message: '删除成功'
            })
            this.getData(record.dor_no);
        }else{
            Notification.warning({
                message: '删除失败'
            })
        }
    }
    render(){
        const antIcon = <Icon2 type="loading" style={{ fontSize: 24 }} spin />
        return (
            <div style = {{"padding": '0 10px 0 165px'}}>
                <Spin indicator={antIcon} spinning = {this.state.spinStatus}>
                    <Table
                        columns = {this.columns}
                        bordered
                        dataSource = {this.state.dataSource}
                        rowKey = "owner_no"
                        size = 'small'
                    />
                </Spin>
            </div>
        )
    }
    columns = [{
        title: '序号',
        key: 'index',
        render: (text, record, index) => {
            record.index = index;
            return (<span>{index + 1}</span>)
        }
    },{
        title: '身份证号',
        dataIndex: 'owner_no',
        key: 'owner_no'
    },{
        title: '业主姓名',
        dataIndex: 'owner_name',
        key: 'owner_name'
    },{
        title: '出生年月',
        key: 'owner_birth',
        render: (text, record, index) => {
            return (
                <span>{moment(record.owner_birth).format('YYYY-MM-DD')}</span>
            )
        }
    },{
        title: '业主性别',
        dataIndex: 'owner_sex',
        key: 'owner_sex'
    },{
        title: '所有房屋',
        dataIndex: 'owner_house',
        key: 'owner_house'
    },{
        title: '入住状态',
        dataIndex: 'owner_live',
        key: 'owner_live'
    },{
        title: '联系电话',
        dataIndex: 'owner_tel',
        key: 'owner_tel'
    },{
        title: '支付方式',
        dataIndex: 'owner_pay',
        key: 'owner_pay'
    },{
        title: '操作',
        key: 'option',
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
}
