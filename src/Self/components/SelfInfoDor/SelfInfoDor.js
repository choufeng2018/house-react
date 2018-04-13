import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Button, Spin, Popconfirm} from 'antd';
import {Icon} from 'react-fa';
import {getCookie} from '../../../_platform/cookie';
export default class SelfInfoDor extends Component{
    constructor(props){
        super(props);
        this.state = {
            spin: false
        }
    }
    async componentDidMount(){
        let login_info = JSON.parse(getCookie('login'));
        this.setState({spin: true});
        const {actions: {getDorInfo}} = this.props;
        let rst = await getDorInfo({doradmin_no: login_info[0].doradmin_no});
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
