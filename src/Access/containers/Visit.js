import React, {Component} from 'react';
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {Sidebar} from '../../_platform/layout/SideBar'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {Tabs, Button} from 'antd';
import {TableVisit, CreateVisit} from '../components/Visit';
import {actions} from '../store/visit';
import './Tab.css';
const TabPane = Tabs.TabPane;
@connect(
    state => {
        const {access: {visit = {}}} = state;
        return {...visit}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class Visit extends Component{
    render(){
        const {createVisible = false} = this.props;
        return (
            <div style={{overflow: 'hidden', position: 'relative', padding: 20}}>
                <DynamicTitle {...this.props} title = '来访人登记' />
                <Button className='sendGoods' type="primary" onClick={() => {
                    const {actions: {showCreate}} = this.props;
                    showCreate(true)
                }}>访问登记</Button>
				<Tabs>
					<TabPane tab="登记列表" key="1">
						<TableVisit {...this.props}/>
					</TabPane>
                    {createVisible && <CreateVisit {...this.props} />}
				</Tabs>
            </div>
        )
    }
}
