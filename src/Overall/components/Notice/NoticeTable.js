import React,{Component} from 'react';
import {Table, Tabs, Divider, Spin, Popconfirm, Notification, Input} from 'antd';
import {Icon} from 'react-fa'
import '../News/TableStyle.less';
import './search.less';
const {Search} = Input;
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
        this.setState({dataSource: data, spin: false, originData: data})
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
        let rst = await deleteNotice({id: record.id});
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
    pagination = {
        pageSize: 5
    }
    render(){
        return(
            <Spin spinning = {this.state.spin}>
                <Search onSearch = {(content) => {
                    if (content === '') {
                        this.setState({dataSource: this.state.originData});
                        return ;
                    }
                    let arr = this.state.dataSource.filter((item, index) =>(
                         item.title.indexOf(content) !== -1 || item.content.indexOf(content) !== -1 || item.importance.indexOf(content) !== -1
                    ))
                    this.setState({dataSource: arr});
                }} className='search' placeholder = '请输入公告标题或重要程度或内容'/>
                <Table
                    columns={this.columns}
                    rowKey='index'
                    dataSource = {this.state.dataSource}
                    bordered
                    pagination = {this.pagination}
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
