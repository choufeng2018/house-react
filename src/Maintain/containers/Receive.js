/**
 * 接单管理
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle';
import {Divider} from 'antd';
import {actions} from '../store/receive';
import {TableOrder} from '../components/Receive'
@connect(
    state => {
        const {maintain: {receive}} = state;
        return {...receive}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class Receive extends Component{
    render(){
        return(
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="接单管理" {...this.props}/>
                <TableOrder {...this.props} />
            </div>
        )
    }
}
