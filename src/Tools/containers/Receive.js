import React, {Component} from 'react';
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {Sidebar} from '../../_platform/layout/SideBar'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {Tabs, Button} from 'antd';
import './Tab.less';
import {actions} from '../store/receive';
import {TableReceive, CreateReceive, DeleteReceive} from '../components/Receive';
@connect(
    state => {
        const {tools: {receive = {}}} = state;
        return {...receive}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class Receive extends Component{
    render(){
        const {createVisible = false, deleteVisible = false} = this.props;
        return (
            <div style={{overflow: 'hidden', position: 'relative', padding: 20}}>
                <DynamicTitle {...this.props} title = '工具领用' />
                <TableReceive {...this.props} />
                {createVisible && <CreateReceive {...this.props} />}
                {deleteVisible && <DeleteReceive {...this.props} />}
            </div>
        )
    }
}
