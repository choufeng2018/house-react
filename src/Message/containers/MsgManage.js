import React ,{Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle';
import {TableMsg} from '../components';
import {Divider} from 'antd';
import './Tab.less';
import './style.css';
@connect(
    state => {
        return {...state}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions}, dispatch)
    })
)
export default class MsgManage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="留言管理" {...this.props}/>
            </div>
        )
    }
}
