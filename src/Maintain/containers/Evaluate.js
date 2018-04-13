/**
 * 查看评价
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle';
import {Divider} from 'antd';
import {actions} from '../store/evaluate';
import {TableOrder, ModalEvaluate} from '../components/Evaluate';
@connect(
    state => {
        const {maintain: {evaluate}} = state;
        return {...evaluate}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class Evaluate extends Component{
    render(){
        const {visible = false} = this.props
        return(
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="查看评价" {...this.props}/>
                <TableOrder {...this.props} />
                {visible && <ModalEvaluate {...this.props}/>}
            </div>
        )
    }
}
