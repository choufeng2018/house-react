import React, {Component} from 'react';
// 将redux中的值取出放到组件里面
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as platformActions} from '../../_platform/store/global';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle';
import {Sidebar} from '../../_platform/layout/SideBar';
import {actions} from '../store/repairMan';
// import {TableRepairMan, CreateRepairMan, CreateRepairManBatch, DeleteRepairManBatch, EditRepairMan} from '../components/repairMan';
import {TableRepairMan, CreateRepairMan, CreateRepManBatch, DeleteRepManBatch} from '../components/RepairMan';
@connect(
    state => {
        const {system: {repairMan = {}}} = state;
        return {...repairMan}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions,...actions}, dispatch)
    })
)
export default class RepairMan extends Component{
    render(){
        const {createShow = {show: false}, batchShow = false} = this.props;
        return (
            <div style={{overflow: 'hidden', padding: '20px', 'position':'relative'}}>
                <DynamicTitle title= '维修人员信息' {...this.props} />
                <TableRepairMan {...this.props} />
                {createShow.show && <CreateRepairMan {...this.props} />}
                {batchShow && <CreateRepManBatch {...this.props} />}
                <DeleteRepManBatch {...this.props} />
                {/* <CreateRepairManBatch {...this.props} />
                <DeleteRepairManBatch {...this.props} />
                <EditRepairMan {...this.props} /> */}
            </div>
        )
    }
}
