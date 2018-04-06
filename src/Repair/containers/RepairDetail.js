import React, {Component} from 'react'
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {actions} from '../store/AcceptOrder';
import {actions as actions2} from '../store/WriteOrder'
import {OrderTable, AcceptOrder} from '../components/RepairDetail'
@connect(
    state => {
        const {repair: {acceptOrder = {}}} = state
        return {...acceptOrder}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions, ...actions2}, dispatch)
    })
)
export class RepairDetail extends Component{
    render(){
        return (
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="维修查看" {...this.props}/>
                <OrderTable {...this.props} />
                <AcceptOrder {...this.props} />
            </div>
        )
    }
}
