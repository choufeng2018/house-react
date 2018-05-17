import React, {Component} from 'react';
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {Sidebar} from '../../_platform/layout/SideBar'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {Tabs, Button} from 'antd';
import './Tab.css';
import {actions} from '../store/goods';
import {CreateGoods, TableGoods} from '../components/Goods';
const TabPane = Tabs.TabPane;
@connect(
    state => {
        const {access: {goods = {}}} = state;
        return {...goods}
    },
    dispatch => ({
        // bindActionCreators将多个action creator与dispatch绑定起来
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class Visit extends Component{
    render(){
        const {createVisible = false} = this.props;
        return (
            <div style={{overflow: 'hidden', position: 'relative', padding: 20}}>
                <DynamicTitle {...this.props} title = '外带物品登记' />
                <Button className='sendGoods' type="primary" onClick={() => {
                    const {actions: {showCreate}} = this.props;
                    showCreate(true)
                }}>外出登记</Button>
				<Tabs>
					<TabPane tab="登记列表" key="1">
						<TableGoods {...this.props}/>
					</TabPane>
				</Tabs>
                {createVisible && <CreateGoods {...this.props} />}
            </div>
        )
    }
}
