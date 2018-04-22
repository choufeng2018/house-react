import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Spin} from 'antd';
import {Icon} from 'react-fa';
import {getCookie} from '../../../_platform/cookie'
export default class OrderTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource: [],
            spin: false
        }
    }
    render(){
        return(
            <Spin spinning = {this.state.spin}>
                <Table
                    bordered
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    rowKey = 'code'
                />
            </Spin>
        )
    }
    async componentDidMount(){
        this.setState({spin: true})
        const {actions: {getRepair}} = this.props;
        let login_info = JSON.parse(getCookie('login'));
        let rst = await getRepair({person: login_info[0].user_name})
        this.setState({dataSource: rst, spin: false});
    }
    showProgress(record){
        const {actions: {setProgressShow, saveProgressData}} = this.props;
        saveProgressData(record)
        setProgressShow(true)
    }
    columns = [{
        title: '报修单编号',
        dataIndex: 'code',
        key: 'code',
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
    },{
        title: '操作',
        key: 'operation',
        render: (text, record, indx) => (
            <a onClick = {this.showProgress.bind(this, record)}>查看进度</a>
        )
    }]
}
