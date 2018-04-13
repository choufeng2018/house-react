import React, {Component} from 'react';
import {injectReducer} from '../store'
import {Submenu} from '../_platform/panels/Submenu'
import {Aside} from '../_platform/layout/Aside'
import {Body} from '../_platform/layout/Body'
import {Main} from '../_platform/layout/Main'
import {ContainerRouters} from '../_platform/panels/ContainerRouters'
import {Icon} from 'react-fa';
import {actions as platformActions} from '../_platform/store/global';
import {getCookie} from '../_platform/cookie';
export default class Message extends Component{
    async componentDidMount(){
        const {default: reducer} = await import('./store');
        const Containers = await import('./containers');
        // 要把注册reducer放到渲染组件之前
        injectReducer('message', reducer);
        this.setState({...Containers});
    }
    render(){
        let login_info = JSON.parse(getCookie('login'));
        let menus;
        if (login_info[0].flag !== 'dor') {
            menus = [{
                key: 'MsgManage',
                id: 'message',
                path: '/message',
                name: '留言管理',
                exact: true,
                icon: <Icon name="calendar-check-o"/>
            }]
        }else{
            menus = [{
                key: 'MsgDetail',
                id: 'msgdetail',
                path: '/message',
                name: '留言查看',
                exact: true,
                icon: <Icon name="calendar-check-o"/>
            }]
        }
        return (
            <Body>
                <Aside>
                    <Submenu {...this.props} menus = {menus}></Submenu>
                </Aside>
                <Main>
                    <ContainerRouters {...this.props} menus={menus} containers={this.state}/>
                </Main>
            </Body>
        )
    }
}
