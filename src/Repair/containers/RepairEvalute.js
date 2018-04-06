import React, {Component} from 'react'
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {actions} from '../store/RepairEvalute'
import {OrderTable, ModalEvalute} from '../components/RepairEvalute'
@connect(
    state => {
        const {repair: {repairEvalute = {}}} = state
        return {...repairEvalute}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export class RepairEvalute extends Component{
    render(){
        return(
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="维修评价" {...this.props}/>
                <OrderTable {...this.props} />
                <ModalEvalute {...this.props} />
            </div>
        )
    }
}
