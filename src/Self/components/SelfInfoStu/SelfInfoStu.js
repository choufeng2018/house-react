import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Button, Spin, Popconfirm} from 'antd';
import {Icon} from 'react-fa';
import moment from 'moment';
import {getCookie} from '../../../_platform/cookie';
export default class SelfInfoStu extends Component{
    constructor(props){
        super(props);
        this.state = {
            spin: false
        }
    }
    async componentDidMount(){
        let login_info = JSON.parse(getCookie('login'));
        this.setState({spin: true});
        const {actions: {getOwnerInfo}} = this.props;
        let rst = await getOwnerInfo({owner_no: login_info[0].owner_no});
        this.setState({dataSource: rst, spin: false});
    }
    render(){
        return (
            <Spin spinning = {this.state.spin}>
                <Table
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    bordered
                    rowKey = 'user_name'
                />
            </Spin>
        )
    }
    columns = [,{
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
    }]
}
