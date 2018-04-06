import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as platformActions} from '../../_platform/store/global';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle';
import {Sidebar} from '../../_platform/layout/SideBar';
import {PermTree, PermTable} from '../components/Permission';
import {actions} from '../store/Permission'
@connect(
    state => {
        const {system: {permission}} = state;
        return {...permission}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions,...actions}, dispatch)
    })
)
export default class Permission extends Component{
    async componentDidMount(){
        const {actions: {getPermissions, savePermissions, savePermission}} = this.props;
        let rst = await getPermissions();
        let keys = JSON.parse(rst[2].perm_value);
        savePermissions(rst);
        savePermission(keys);
    }
    render(){
        return (
            <div>
                <DynamicTitle title = '权限配置' {...this.props}/>
                <Sidebar>
                    <PermTree {...this.props} />
                </Sidebar>
                <div style = {{padding: '0 0 0 400px'}}>
                    <PermTable {...this.props} />
                </div>
            </div>
        )
    }
}
