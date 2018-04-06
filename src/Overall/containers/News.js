import React,{Component} from 'react';
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {Tabs, Button} from 'antd';
import {NewsTable, NewsModal, NewsDetail} from '../components/News'
import {actions} from '../store/news'
import './Tab.less'
const TabPane = Tabs.TabPane;
@connect(
    state => {
        const {overall:{news = {}}} = state;
        return {...news}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class News extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }
    render(){
        const {news_visible = false, news_detail = false} = this.props
        return (
            <div style={{overflow: 'hidden', padding: 20, 'position':'relative'}}>
				<DynamicTitle title="新闻管理" {...this.props}/>
                <Button className='postNews' type="primary" onClick={() => {
                    const {actions:{setNewsShow}} = this.props
                    setNewsShow({
                        show:true,
                        type:'add'
                    })
                }}>发布新闻</Button>
				<Tabs>
					<TabPane tab="新闻列表" key="1">
						<NewsTable {...this.props}/>
					</TabPane>
				</Tabs>
                {news_visible && <NewsModal {...this.props} {...this.state}/>}
                {news_detail && <NewsDetail {...this.props}/>}
			</div>
        )
    }
}
