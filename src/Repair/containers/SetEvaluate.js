import React, {Component} from 'react'
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {actions} from '../store/RepairEvalute'
import {OrderTable, ModalEvalute} from '../components/SetEvaluate'
@connect(
    state => {
        const {repair: {repairEvalute = {}}} = state
        return {...repairEvalute}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export class SetEvaluate extends Component{
    render(){
        const {showEvalute = {show: false}} = this.props;
        return(
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="维修评价" {...this.props}/>
                <OrderTable {...this.props} />
                {showEvalute.show && <ModalEvalute {...this.props} />}
            </div>
        )
    }
}
