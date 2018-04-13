import React, {Component} from 'react'
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {actions} from '../store/RepairProgress'
import {OrderTable, ModalProgress} from '../components/Schedule'
@connect(
    state => {
        const {repair: {repairProgress}} = state
        return {...repairProgress}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export class Schedule extends Component{
    render(){
        return(
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="报修进度" {...this.props}/>
                <OrderTable {...this.props} />
                <ModalProgress {...this.props}/>
            </div>
        )
    }
}
