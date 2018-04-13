import React, {Component} from 'react'
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {SelfInfoDor} from '../components/SelfInfoDor';
import {SelfInfoAdmin} from '../components/SelfInfoAdmin';
import {SelfInfoRep} from '../components/SelfInfoRep';
import {SelfInfoStu} from '../components/SelfInfoStu';
import {actions as dorActions} from '../store/selfInfoDor';
import {getCookie} from '../../_platform/cookie';
@connect(
    state => {
        // const {repair: {acceptOrder = {}}} = state
        return {...state}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...dorActions}, dispatch)
    })
)
export default class SelfInfo extends Component{
    render(){
        let login_info = JSON.parse(getCookie('login'));
        return (
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="个人信息" {...this.props}/>
                {login_info[0].flag === 'dor' && <SelfInfoDor {...this.props} />}
                {login_info[0].flag === 'admin' && <SelfInfoAdmin {...this.props} />}
                {login_info[0].flag === 'rep' && <SelfInfoRep {...this.props} />}
                {login_info[0].flag === 'stu' && <SelfInfoStu {...this.props} />}
            </div>
        )
    }
}
