import React,{Component} from 'react';
import {Table, Tabs, Divider, Spin, Popconfirm, Notification} from 'antd';
import {Icon} from 'react-fa'
import '../News/TableStyle.less'
export default class NoticeTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            spin: false
        }
    }
    componentWillReceiveProps(nextProps){
        const {actions: {isFresh}, fresh} = nextProps;
        if (fresh) {
            this.componentDidMount();
            isFresh(false);
        }
    }
    async componentDidMount(){
        const {actions: {getNotice}} = this.props;
        this.setState({spin: true});
        let rst = await getNotice();
        let data = rst.map((item, index) => {
            return {
                index: index + 1,
                ...item
            }
        })
        this.setState({dataSource:data, spin: false});
    }
    detail(content){
        const {actions:{setNoticeContent, setNoticeDetail}} = this.props;
        setNoticeContent(content);
        setNoticeDetail(true)
    }
    edit(record){
        const {actions:{setNoticeShow, setNoticeData}} = this.props;
        setNoticeShow({show: true, type: 'edit'})
        setNoticeData(record)
    }
    async confirm(record){
        const {actions: {deleteNotice}} = this.props;
        let rst = await deleteNotice({title: record.title});
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
        return(
            <Spin spinning = {this.state.spin}>
                <Table
                    columns={this.columns}
                    rowKey='index'
                    dataSource = {this.state.dataSource}
                    bordered
                />
            </Spin>
        )
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index'
    },{
        title: '公告标题',
        dataIndex: 'title',
        key:'title'
    },{
        title: '公告内容',
        width: '30%',
        render: (text, record, index) => (
            <div className="newsContent" dangerouslySetInnerHTML={{__html:record.content}}></div>
        )
    },{
        title: '重要程度',
        dataIndex: 'importance',
        key: 'importance'
    },{
        title: '时间',
        dataIndex: 'time',
        key:'time'
    }, {
        title: '操作',
        render:(text, record, index) => (
            <span>
                <a><Icon onClick={this.detail.bind(this, record.content)} name='eye'/></a>
                <Divider type="vertical"/>
                <a><Icon onClick={this.edit.bind(this, record)} name='edit'/></a>
                <Divider type="vertical"/>
                <Popconfirm onConfirm = {this.confirm.bind(this, record)} okText = '是' cancelText = '否' title='确认删除吗'>
                    <a><Icon name='trash-o'/></a>
                </Popconfirm>
            </span>
        )
    }]
}
