import React, {Component} from 'react'
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {SelfPassDor} from '../components/SelfInfoDor';
import {SelfPassAdmin} from '../components/SelfInfoAdmin';
import {SelfPassRep} from '../components/SelfInfoRep';
import {SelfPassStu} from '../components/SelfInfoStu';
import {actions as dorActions} from '../store/selfInfoDor';
import {getCookie} from '../../_platform/cookie'
@connect(
    state => {
        // const {repair: {acceptOrder = {}}} = state
        return {...state}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...dorActions}, dispatch)
    })
)
export default class SelfPass extends Component{
    render(){
        let login_info = JSON.parse(getCookie('login'));
        return (
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="个人密码修改" {...this.props}/>
                {login_info[0].flag === 'dor' && <SelfPassDor {...this.props} />}
                {login_info[0].flag === 'admin' && <SelfPassAdmin {...this.props} />}
                {login_info[0].flag === 'rep' && <SelfPassRep {...this.props} />}
                {login_info[0].flag === 'stu' && <SelfPassStu {...this.props} />}
            </div>
        )
    }
}
