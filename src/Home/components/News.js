import React,{Component} from 'react';
import {Table, Pagination, Card, Modal, Spin} from 'antd';
import './News.less';
import {bindActionCreators} from 'redux';
import {actions} from '../store/home';
import {connect} from 'react-redux';
@connect(
    state => {
        return {...state}
    },
    dispatch => ({
        actions: bindActionCreators({...actions}, dispatch)
    })
)
export class News extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            newsContent: '',
            dataSource: [],
            spin: false
        }
    }
    async componentDidMount(){
        const {actions: {getNews}} = this.props;
        this.setState({spin: true});
        let rst = await getNews();
        this.setState({dataSource: rst, spin: false})
    }
    render(){
        return(
            <Card
                title = '最近新闻'
            >
                <Spin spinning = {this.state.spin}>
                    <Table
                        dataSource = {this.state.dataSource}
                        columns = {this.columns}
                        bordered
                    />
                </Spin>
                <Modal
                    title = "新闻详情"
                    visible = {this.state.visible}
                    width = "50%"
                    footer = {null}
                    onCancel = {() => {
                        this.setState({visible: false})
                    }}
                >
                    <div dangerouslySetInnerHTML={{__html:this.state.newsContent}}></div>
                </Modal>
            </Card>
        )
    }
    columns = [{
        title:'标题',
        dataIndex: 'news_title',
        key:'news_title'
    },{
        title: '发布时间',
        dataIndex: 'news_time',
        key: 'news_time'
    },{
        title: '操作',
        render: (record) => (
            <a onClick={(e) => {
                this.setState({
                    newsContent: record.news_content,
                    visible: true
                })
            }}>查看</a>
        )
    }]
}
