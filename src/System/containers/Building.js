import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle';
import {Sidebar} from '../../_platform/layout/SideBar'
import {actions} from '../store/CreateDormitory'
import {SubTree, CreateBuilding, BuildingDetail, EditBuilding} from '../components/Building'
@connect(
    state => {
        const {system: {createDormitory = {}}} = state;
        return {...createDormitory}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class Building extends Component{
    async componentDidMount(){
        const {actions: {getDorAdminAc}} = this.props;
        let rst = await getDorAdminAc()
    }
    render(){
        const {dorState} = this.props;
        return (
            <div style={{overflow: 'hidden', 'position':'relative'}}>
                <DynamicTitle title="单元楼信息" {...this.props}/>
                <Sidebar>
                    <SubTree {...this.props} />
                </Sidebar>
                <CreateBuilding {...this.props} />
                <BuildingDetail {...this.props} />
                <EditBuilding {...this.props} />
            </div>
        )
    }
}
