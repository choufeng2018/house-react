import React,{Component} from 'react';
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {connect} from 'react-redux';
import {Tabs, Button} from 'antd'
import {NoticeTable, NoticeModal, NoticeDetail} from '../components/Notice'
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {actions} from '../store/notice'
import './Tab.less'
const TabPane = Tabs.TabPane;
@connect(
    state => {
        const {overall:{notice = {}}} = state;
        return {...notice}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions,...actions}, dispatch)
    })
)
export default class Notice extends Component{
    render(){
        const {notice_visible = {show: false}, notice_detail= false} = this.props
        return (
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
				<DynamicTitle title="公告管理" {...this.props}/>
                <Button className='postNotice' type="primary" onClick={() => {
                    const {actions:{setNoticeShow}} = this.props
                    setNoticeShow({
                        show: true,
                        type: 'add'
                    })
                }}>发布公告</Button>
				<Tabs>
					<TabPane tab="公告列表" key="1">
						<NoticeTable {...this.props}/>
					</TabPane>
				</Tabs>
                {notice_visible.show && <NoticeModal {...this.props} {...this.state}/>}
                {notice_detail && <NoticeDetail {...this.props} />}
			</div>
        )
    }
}
