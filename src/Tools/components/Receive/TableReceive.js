import React, {Component} from 'react';
import {Table, Notification, Button, Divider, Spin, Popconfirm, Tabs, Input} from 'antd';
import {Icon} from 'react-fa';
import moment from 'moment';
const {Search} = Input;
const TabPane = Tabs.TabPane;
export default class TableBorrow extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            loading: false,
            selectedRows: []
        }
    }
    async componentDidMount(){
        const {actions: {getData}} = this.props;
        this.setState({loading: true})
        let rst = await getData();
        this.setState({dataSource:rst, loading: false});
    }
    componentWillReceiveProps(nextProps){
        const {actions: {isFresh}, fresh} = nextProps;
        if (fresh) {
            this.componentDidMount();
            isFresh(false)
        }
    }
    async confirm(record){
        const {actions: {deleteData}} = this.props;
        let rst = await deleteData({receive_name: record.receive_name});
        if (rst[0].status === 'ok') {
            Notification.success({
                message: '删除成功'
            })
            this.componentDidMount();
        }else{
            Notification.warning({
                message: '删除失败'
            })
        }
    }
    render(){
        return (
            <Spin spinning = {this.state.loading}>
                <Button className='sendNews' type="primary" onClick={() => {
                    const {actions: {showCreate}} = this.props;
                    showCreate(true)
                }}>领用登记</Button>
                <Button className='deleteNews' type="primary" onClick={() => {
                    const {actions: {saveDeleteData, deleteShow}} = this.props;
                    if(this.state.selectedRows.length === 0){
                        Notification.warning({
                            message: '请至少选中一条记录'
                        })
                        return;
                    }
                    saveDeleteData(this.state.selectedRows);
                    deleteShow(true)
                }}>批量删除</Button>
                <Search className = 'searchNews' placeholder = '请输入姓名或者是宿舍号'/>
                <Tabs>
					<TabPane tab=" " key="2">
                        <Table
                            columns = {this.columns}
                            dataSource = {this.state.dataSource}
                            bordered
                            rowKey = 'visit_name'
                            rowSelection = {this.rowSelection}
                        />
					</TabPane>
				</Tabs>

            </Spin>
        )
    }
    rowSelection = {
        onSelect: (record, selected, selectedRows, nativeEvent) => {
            this.setState({selectedRows})
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            this.setState({selectedRows})
        }
    }
    columns = [{
        title: '序号',
        key: 'index',
        render: (text, record, index) => {
            record.index = index + 1;
            return (
                <span>{index + 1}</span>
            )
        }
    },{
        title: '姓名',
        dataIndex: 'receive_name',
        key: 'receive_name'
    },{
        title: '宿舍',
        dataIndex: 'receive_dor',
        key: 'receive_dor'
    },{
        title: '领用物品',
        dataIndex: 'receive_tools',
        key: 'receive_tools'
    },{
        title: '领用时间',
        // dataIndex: 'receive_start',
        key: 'receive_start',
        render: (text, record, index) => {
            return (
                <span>{moment(record.receive_start).format('YYYY-MM-DD HH:mm:ss')}</span>
            )
        }
    },{
        title: '操作',
        render: (text, record, index) => {
            return (
                <div>
                    <Popconfirm onConfirm = {this.confirm.bind(this, record)} title = '确认要归还吗' okText = '是' cancelText='否'>
                        <a><Icon name='trash' /></a>
                    </Popconfirm>
                </div>
            )
        }
    }]
}
