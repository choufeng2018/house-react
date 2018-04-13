import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Button, Spin, Popconfirm} from 'antd';
import {Icon} from 'react-fa';
import {getCookie} from '../../../_platform/cookie';
export default class SelfInfoAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {
            spin: false
        }
    }
    async componentDidMount(){
        let login_info = JSON.parse(getCookie('login'));
        this.setState({spin: true});
        const {actions: {getSuperInfo}} = this.props;
        let rst = await getSuperInfo();
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
    columns = [{
        title: '用户名',
        dataIndex: 'user_name',
        key: 'user_name'
    },{
        title: '身份',
        dataIndex: 'rel_name',
        key: 'rel_name'
    }]
}
