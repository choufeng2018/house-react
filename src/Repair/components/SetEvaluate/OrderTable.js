import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Tabs, Spin} from 'antd';
import {Icon} from 'react-fa';
import {getCookie} from '../../../_platform/cookie';
const TabPane = Tabs.TabPane
export default class OrderTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource: []
        }
    }
    componentWillReceiveProps(nextProps){
        const {fresh, actions: {isFresh}} = nextProps;
        if (fresh) {
            this.componentDidMount();
            isFresh(false);
        }
    }
    render(){
        return(
            <Spin spinning = {this.state.spin}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="待评价" key="1">
                        <Table
                            bordered
                            columns = {this.columns1}
                            dataSource = {this.state.dataSource1}
                            rowKey = 'code'
                        />
                    </TabPane>
                    <TabPane tab="已评价" key="2">
                        <Table
                            bordered
                            columns = {this.columns2}
                            dataSource = {this.state.dataSource2}
                            rowKey = 'code'
                        />
                    </TabPane>
                </Tabs>
            </Spin>
        )
    }
    async componentDidMount(){
        this.setState({spin: true})
        const {actions: {getOrder}} = this.props;
        let login_info = JSON.parse(getCookie('login'));
        let rst = await getOrder({person: login_info[0].owner_name})
        let dataSource1 = [], dataSource2 = [];
        if (rst) {
            rst.forEach((item, index) => {
                if (item.evalute) {
                    dataSource2.push(item);
                }else{
                    dataSource1.push(item);
                }
            })
        }
        this.setState({dataSource1, dataSource2, spin: false})
    }
    // 查看
    showEvalute(record){
        const {actions: {setShowEvalute, saveEvaluteData}} = this.props;
        setShowEvalute({
            show: true,
            disabled: true
        });
        saveEvaluteData(record)
    }
    // 写评价
    writeEvalute(record){
        const {actions: {setShowEvalute, saveEvaluteData}} = this.props;
        setShowEvalute({
            show: true,
            disabled: false
        })
        saveEvaluteData(record);
    }
    columns1 = [{
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
            <a onClick = {this.writeEvalute.bind(this, record)}>评价</a>
        )
    }]
    columns2 = [{
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
            <a onClick = {this.showEvalute.bind(this, record)}>查看评价</a>
        )
    }]
}
