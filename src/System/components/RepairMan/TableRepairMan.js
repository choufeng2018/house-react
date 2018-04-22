import React, {Component} from 'react';
import {Table, Divider, Notification, Popconfirm, Spin, Button} from 'antd';
import {Icon} from 'react-fa';
export default class TableRepairMan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spin: false,
            dataSource: [],
            selectedRows: []
        }
    }
    addSingle(){
        const {actions: {setCreateShow}} = this.props;
        setCreateShow({show:true, type:'add'});
    }
    addBatch(){
        const {actions: {setCreateBatch}} = this.props;
        setCreateBatch(true);
    }
    deleteBatch(){
        if(this.state.selectedRows.length === 0){
            Notification.warning({
                message: '请至少选中一条数据'
            })
            return;

        }
        const {actions: {saveDeleteData, setDeleteBatch}} = this.props;
        saveDeleteData(this.state.selectedRows);
        setDeleteBatch(true)
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

        },
        onSelect: (record, selected, selectedRows) => {
            this.setState({selectedRows: selectedRows});
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            this.setState({selectedRows: selectedRows});
        }
    }
    async componentDidMount(){
        const {actions: {getRepman}} = this.props;
        this.setState({spin: true})
        let rst = await getRepman();
        let dataSource = rst.map((item, index) => {
            return {
                index: index + 1,
                ...item
            }
        })
        this.setState({dataSource, spin: false});
    }
    componentWillReceiveProps(nextProps){
        const {actions: {isFresh}, fresh} = nextProps;
        if (fresh) {
            this.componentDidMount();
            isFresh(false);
        }
    }
    edit(record){
        const {actions: {saveEditData, setCreateShow}} = this.props;
        let data = JSON.stringify(record);
        let newData = JSON.parse(data);
        saveEditData([newData]);
        setCreateShow({show: true, type: 'edit'})
    }
    async confim(record){
        const {actions: {deleteRepman}} = this.props;
        let rst = await deleteRepman({repman_no: record.repman_no});
        if (rst[0].status === 'ok') {
            Notification.success({
                message: '删除成功',
            })
            this.componentDidMount();
        }else{
            Notification.warning({
                message: '删除失败'
            })
        }
    }
    render(){
        return(
            <Spin spinning = {this.state.spin}>
                <section>
                    <Button onClick={this.addSingle.bind(this)}>单个添加维修人员信息</Button>
                    <Divider type='vertical' />
                    <Button onClick = {this.addBatch.bind(this)}>批量添加维修人员信息</Button>
                    <Divider type='vertical' />
                    <Button onClick = {this.deleteBatch.bind(this)}>批量删除维修人员信息</Button>
                    <div style={{margin: '10px'}}></div>
                    <Table
                        columns = {this.columns}
                        bordered
                        rowKey = 'index'
                        dataSource = {this.state.dataSource}
                        rowSelection = {this.rowSelection}
                    />
                </section>
            </Spin>
        )
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index'
    },{
        title: '工号',
        dataIndex: 'repman_no',
        key: 'repman_no'
    },{
        title: '姓名',
        dataIndex: 'user_name',
        key: 'user_name'
    },{
        title: '性别',
        dataIndex: 'repman_sex',
        key: 'repman_sex'
    },{
        title: '联系方式',
        dataIndex: 'repman_tel',
        key: 'repman_tel'
    },{
        title: '住址',
        dataIndex: 'repman_adr',
        key: 'repman_adr'
    },{
        title: '操作',
        render: (text, record, index) => {
            return (
                <section>
                    <a onClick = {this.edit.bind(this, record)}><Icon name='edit'/></a>
                    <Divider type = 'vertical' />
                    <Popconfirm title = '确认删除吗' okText = '是' cancelText = '否' onConfirm = {this.confim.bind(this, record)}>
                        <a><Icon name='trash'/></a>
                    </Popconfirm>
                </section>
            )
        }
    }]
}
