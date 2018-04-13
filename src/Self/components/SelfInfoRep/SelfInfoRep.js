import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Button, Spin, Popconfirm} from 'antd';
import {Icon} from 'react-fa';
import {getCookie} from '../../../_platform/cookie';
export default class SelfInfoRep extends Component{
    constructor(props){
        super(props);
        this.state = {
            spin: false
        }
    }
    async componentDidMount(){
        let login_info = JSON.parse(getCookie('login'));
        this.setState({spin: true});
        const {actions: {getRepInfo}} = this.props;
        let rst = await getRepInfo({repman_no: login_info[0].repman_no});
        this.setState({dataSource: rst, spin: false});
    }
    render(){
        return (
            <Spin spinning = {this.state.spin}>
                <Table
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    bordered
                    rowKey = 'doradmin_no'
                />
            </Spin>
        )
    }
    columns = [{
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
        title: '地址',
        dataIndex: 'repman_adr',
        key: 'repman_adr'
    }]
}
