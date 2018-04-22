import React, {Component} from 'react';
import {Table, Divider, Spin, Popconfirm, Notification} from 'antd';
import {Icon} from 'react-fa'
import './TableStyle.less'
export default class NewsTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            spin: false
        }
    }
    componentWillReceiveProps(nextProps){
        const {actions: {isFresh}, fresh = false} = nextProps;
        if (fresh) {
            this.componentDidMount();
            isFresh(false)
        }
    }
    async componentDidMount(){
        const {actions: {getNews}} = this.props;
        this.setState({spin: true})
        let rst = await getNews();
        let news = rst.map((item, index) => {
            return {
                index: index + 1,
                ...item
            }
        })
        this.setState({dataSource: news, spin: false})
    }
    detail(news_content){
        const {actions: {setNewsContent, setNewsDetail}} = this.props;
        setNewsContent(news_content)
        setNewsDetail(true)
    }
    edit(record){
        const {actions:{setEditData, setNewsShow}} = this.props;
        setEditData(record);
        setNewsShow({
            show:true,
            type:'edit'
        })
    }
    async confirm(record){
        const {actions: {deleteNews}} = this.props;
        let rst = await deleteNews({news_title: record.news_title});
        if (rst[0].status === 'ok') {
            Notification.success({
                message:'删除成功'
            })
            this.componentDidMount();
        }else{
            Notification.warning({
                message:'删除失败'
            })
        }
    }
    pagination = {
        pageSize: 5
    }
    render(){
        return (
            <Spin spinning = {this.state.spin}>
                <Table
                    columns = {this.columns}
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
        width: '7%',
        key: 'index'
    },{
        dataIndex: 'news_title',
        key: 'news_title',
        title: '标题',
        width: '10%',
    }, {
        title: '新闻内容',
        width: '40%',
        render: (text, record, index) => {
            return <div className='newsContent' dangerouslySetInnerHTML={{__html:record.news_content}}></div>;
        }
    },{
        dataIndex: 'news_time',
        key: 'news_time',
        title: '发布时间'
    }, {
        title: '操作',
        key: 'opertion',
        render:(text, record, index) => {
            return (
                <div>
                    <a><Icon onClick={this.detail.bind(this, record.news_content)} name='eye'/></a>
                    <Divider type="vertical"/>
                    <a><Icon onClick={this.edit.bind(this, record)} name='edit'/></a>
                    <Divider type="vertical"/>
                    <Popconfirm onConfirm = {this.confirm.bind(this, record)} title='确认删除吗' okText = '是' cancelText = '否'>
                        <a><Icon name='trash-o'/></a>
                    </Popconfirm>
                </div>
            )
        }
    }]

}
