import React, {Component} from 'react';
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {actions} from '../store/WriteOrder'
import {Table, Col, Row, Button, Tabs} from 'antd'
import {OrderTable, SendOrder} from '../components/WriteOrder'
import './Tab.less'
const TabPane = Tabs.TabPane
@connect(
    state => {
        const {repair:{writeOrder = {}}} = state;
        return {...writeOrder}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export class WriteOrder extends Component{
    componentDidMount(){
        const {actions: {getRepair, saveRepair}} = this.props;
        getRepair().then(rst => {
            saveRepair(rst);
        });
    }
    render(){
        const {showOrder = {show:false}} = this.props;
        return (
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
                <DynamicTitle title="报修单管理" {...this.props}/>
                <Button className='sendRepair' type="primary" onClick={() => {
                    const {actions:{setWriteShow}} = this.props
                    setWriteShow({
                        show:true,
                        type:'add'
                    })
                }}>报修单填写</Button>
				<Tabs>
					<TabPane tab="报修单列表" key="1">
						<OrderTable {...this.props}/>
					</TabPane>
				</Tabs>
                {showOrder.show && <SendOrder {...this.props}/>}
            </div>
        )
    }
}
