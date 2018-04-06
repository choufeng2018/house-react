import React, {Component} from 'react';
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {Sidebar} from '../../_platform/layout/SideBar'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {Tabs, Button} from 'antd';
import './Tab.less';
import {actions} from '../store/borrow';
import {TableBorrow, CreateBorrow} from '../components/Borrow';
@connect(
    state => {
        const {tools: {borrow = {}}} = state;
        return {...borrow}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class Borrow extends Component{
    render(){
        const {createVisible = false} = this.props;
        return (
            <div style={{overflow: 'hidden', position: 'relative', padding: 20}}>
                <DynamicTitle {...this.props} title = '工具借用' />
                <Button className='borrowTools' type="primary" onClick={() => {
                    const {actions: {showCreate}} = this.props;
                    showCreate(true)
                }}>借用登记</Button>
                <TableBorrow {...this.props} />
                {createVisible && <CreateBorrow {...this.props} />}
            </div>
        )
    }
}
