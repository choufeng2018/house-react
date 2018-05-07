import React, {Component} from 'react';
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {Sidebar} from '../../_platform/layout/SideBar'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {Tabs, Button, Table, Input, Spin} from 'antd';
import {SubTree, CreateDistri, DistriDetail} from '../components/Distri';
import {actions} from '../store/createDistri';
import moment from 'moment';
import './search.less';
const TabPane = Tabs.TabPane;
const {Search} = Input;
@connect(
    state => {
        const {accomm: {createDistri}} = state;
        return {...createDistri}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class Owner extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            spin: true
        }
    }
    async componentDidMount(){
        const {actions: {getOwnerAll}} = this.props;
        let rst = await getOwnerAll();
        this.setState({spin: false, dataSource: rst});
    }
    async search(content){
        this.setState({spin: true})
        const {actions: {getOwnerByName}} = this.props;
        let rst = await getOwnerByName({user_name: content});
        this.setState({dataSource: rst, spin: false});
    }
    render(){
        return (
            <div style={{overflow: 'hidden', 'position':'relative'}}>
                <DynamicTitle title = "业主信息" {...this.props} />
                <Search className = 'search' placeholder='请输入名字关键词' onSearch = {this.search.bind(this)}/>
                <Tabs className='tab'>
                    <TabPane tab="报修单列表" key="1">
                        <Spin spinning = {this.state.spin}>
                            <Table
                                columns = {this.columns}
                                bordered
                                dataSource = {this.state.dataSource}
                            />
                        </Spin>
                    </TabPane>
                </Tabs>
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
        dataIndex: 'user_name',
        key: 'user_name'
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
