import React, {Component} from 'react';
import {injectReducer} from '../store'
import {Submenu} from '../_platform/panels/Submenu'
import {Aside} from '../_platform/layout/Aside'
import {Body} from '../_platform/layout/Body'
import {Main} from '../_platform/layout/Main'
import {ContainerRouters} from '../_platform/panels/ContainerRouters'
import {Icon} from 'react-fa';
import {actions as platformActions} from '../_platform/store/global'
export default class Overall extends Component{
    async componentDidMount(){
        const {default: reducer} = await import('./store');
        const Containers = await import('./containers');
        // 要把注册reducer放到渲染组件之前
        injectReducer('overall', reducer)
        this.setState({...Containers});
    }
    render(){
        return (
            <Body>
                <Aside>
                    <Submenu {...this.props} menus = {Overall.menus}></Submenu>
                </Aside>
                <Main>
                    <ContainerRouters {...this.props} menus={Overall.menus} containers={this.state}/>
                </Main>
            </Body>
        )
    }

    static menus = [{
        key: 'News',
        id: 'news',
        path: '/overall',
        name: '新闻管理',
        exact: true,
        icon: <Icon name="calendar-check-o"/>
    },{
        key: 'Notice',
        id: 'notice',
        path: '/overall/notice',
        name: '公告管理',
        exact: true,
        icon: <Icon name="calendar-check-o"/>
    }]
}
