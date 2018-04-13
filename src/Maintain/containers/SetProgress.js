/**
 * 接单管理
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle';
import {Table, Modal, Notification, Divider, Tabs, Spin, Popconfirm} from 'antd';
import {actions} from '../store/setprogress';
import {getCookie} from '../../_platform/cookie';
import {SetModal} from '../components/SetProgress'
@connect(
    state => {
        const {maintain: {progress}} = state;
        return {...progress}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class SetProgress extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            proVis: false,
            spin: false,
            progressData: []
        }
    }
    setProgress(record){
        this.setState({proVis: true, progressData: [record]});
    }
    cancel(){
        this.setState({proVis: false})
    }
    getData(){
        this.componentDidMount();
    }
    async componentDidMount(){
        this.setState({spin: true});
        const {actions: {getOrder}} = this.props;
        let login_info = JSON.parse(getCookie('login'));
        let receive = login_info[0].repman_name;
        let rst = await getOrder({receive: receive});
        this.setState({dataSource: rst, spin: false});
    }
    render(){
        return(
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="接单管理" {...this.props}/>
                <Spin spinning = {this.state.spin}>
                    <Table
                        columns = {this.columns}
                        dataSource = {this.state.dataSource}
                        bordered
                        rowKey = 'code'
                    />
                </Spin>
                {this.state.proVis && <SetModal {...this.props} {...this.state} cancel = {this.cancel.bind(this)} getData = {this.getData.bind(this)} />}
            </div>
        )
    }
    columns = [{
        title: '报修单编号',
        dataIndex: 'code',
        key: 'code'
    },{
        title: '报修内容',
        dataIndex: 'content',
        key: 'content',
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
            <a onClick = {this.setProgress.bind(this, record)}>设置维修进度</a>
        )
    }]
}
