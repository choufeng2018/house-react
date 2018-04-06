import React,{Component} from 'react';
import {Table, Pagination, Card, Modal, Spin} from 'antd';
import './Notice.less';
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
export class Notice extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            noticeContent: '',
            dataSource: [],
            spin: false
        }
    }
    async componentDidMount(){
        const {actions: {getNotice}} = this.props;
        this.setState({spin: true});
        let rst = await getNotice();
        this.setState({dataSource: rst, spin: false})
    }
    render(){
        return(
            <Card
                title = '最新公告'
            >
                <Spin spinning = {this.state.spin}>
                    <Table
                        dataSource = {this.state.dataSource}
                        columns = {this.columns}
                        bordered
                    />
                </Spin>
                <Modal
                    title = "公告详情"
                    visible = {this.state.visible}
                    width = "50%"
                    footer = {null}
                    onCancel = {() => {
                        this.setState({visible: false})
                    }}
                >
                    <div dangerouslySetInnerHTML={{__html:this.state.noticeContent}}></div>
                </Modal>
            </Card>
        )
    }
    columns = [{
        title:'标题',
        dataIndex: 'title',
        key:'title'
    },{
        title:'重要程度',
        dataIndex: 'importance',
        key:'importance'
    },{
        title: '发布时间',
        dataIndex: 'time',
        key: 'time'
    },{
        title: '操作',
        render: (record) => (
            <a onClick={(e) => {
                this.setState({
                    noticeContent: record.content,
                    visible: true
                })
            }}>查看</a>
        )
    }]
}
