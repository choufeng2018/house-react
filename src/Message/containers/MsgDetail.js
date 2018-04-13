import React ,{Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle';
import {Divider, Button, Tabs, Table, Spin} from 'antd';
import {actions} from '../store/msgDetail';
import './Tab.less';
import './style.css';
import {getCookie} from '../../_platform/cookie';
import {Icon} from 'react-fa';
const TabPane = Tabs.TabPane;
@connect(
    state => {
        const {message: {msg}} = state;
        return {...msg}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class MsgManage extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }
    async componentDidMount(){
        let login_info = JSON.parse(getCookie('login'));
        this.setState({spin: true});
        const {actions: {getMessage}} = this.props;
        let rst = await getMessage({msg_receive: login_info[0].doradmin_name});
        let dataSource = rst.map((item, index) => {
            return {
                index: index + 1,
                ...item
            }
        })
        this.setState({dataSource, spin: false});
    }
    render(){
        const {showCreate} = this.props;
        return(
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="留言查看" {...this.props}/>
				<Tabs>
					<TabPane tab="留言列表" key="1">
                        <Spin spinning = {this.state.spin}>
                            <Table
                                bordered
                                columns = {this.columns}
                                dataSource = {this.state.dataSource}
                                rowKey = 'msg_title'
                            />
                        </Spin>
					</TabPane>
				</Tabs>
            </div>
        )
    }
    eye(){

    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index'
    },{
        title: '标题',
        dataIndex: 'msg_title',
        key: 'msg_title'
    },{
        title: '内容',
        key: 'msg_content',
        width: '40%',
        render: (text, record, index) => {
            return (
                <div className = 'newsContent' style={{marginTop: '13px'}} dangerouslySetInnerHTML={{__html:record.msg_content}}></div>
            )
        }
    },{
        title: '时间',
        dataIndex: 'msg_time',
        key: 'msg_time'
    },{
        title: '留言人',
        dataIndex: 'msg_send',
        key: 'msg_send'
    },{
        title: '留言给',
        dataIndex: 'msg_receive',
        key: 'msg_receive'
    },{
        title: '操作',
        width: '6%',
        render: (text, record, index) => {
            return (
                <div>
                    <a onClick = {this.eye.bind(this)}><Icon name='eye'/></a>
                </div>
            )
        }
    }]
}
