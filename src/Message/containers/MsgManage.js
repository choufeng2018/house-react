import React ,{Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle';
import {TableMsg, ModalMsg} from '../components/MsgManage';
import {Divider, Button, Tabs} from 'antd';
import {actions} from '../store/msgManage';
import './Tab.less';
import './style.css';
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
            dorAdmin: []
        }
    }
    async componentDidMount(){
        const {actions: {getAdmin}} = this.props;
        let rst = await getAdmin();
        this.setState({dorAdmin: rst});
    }
    render(){
        const {showCreate} = this.props;
        return(
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="留言管理" {...this.props}/>
                <Button className='sendMessage' type="primary" onClick={() => {
                    const {actions: {setShowCreate}} = this.props;
                    setShowCreate(true);
                }}>发起留言</Button>
				<Tabs>
					<TabPane tab="留言列表" key="1">
						<TableMsg {...this.props} />
					</TabPane>
				</Tabs>
                {showCreate && <ModalMsg {...this.props} {...this.state}/>}
            </div>
        )
    }
}
