import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as platformActions} from '../../_platform/store/global';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle';
import {Sidebar} from '../../_platform/layout/SideBar';
import {SubTree, CreateDormitory, TableDormitory, EditDormitory} from '../components/Dormitory';
import {actions} from '../store/Dormitory'
@connect(
    state => {
        const {system: {dormitory = {}}} = state;
        return {...dormitory}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions,...actions}, dispatch)
    })
)
export default class Dormitory extends Component{
    render(){
        const {selectNode = []} = this.props;
        let node;
        if (selectNode.length > 0) {
            node = selectNode[0].split("--")[4]
        }
        return (
            <div>
                <DynamicTitle title = '房屋信息' {...this.props}/>
                <Sidebar>
                    <SubTree {...this.props} />
                </Sidebar>
                <CreateDormitory {...this.props} />
                {node === "dormitory" && <TableDormitory {...this.props} />}
                <EditDormitory {...this.props} />
            </div>
        )
    }
}
