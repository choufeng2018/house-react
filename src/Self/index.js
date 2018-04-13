import React, {Component} from 'react';
import {injectReducer} from '../store';
import {Submenu} from '../_platform/panels/Submenu'
import {Aside} from '../_platform/layout/Aside'
import {Body} from '../_platform/layout/Body'
import {Main} from '../_platform/layout/Main'
import {ContainerRouters} from '../_platform/panels/ContainerRouters'
import {Icon} from 'react-fa';
import {actions as platformActions} from '../_platform/store/global'
export default class Self extends Component{
    async componentDidMount(){
        // const {default: reducer} = await import('./store');
        // 要把注册reducer放到渲染组件之前
        // injectReducer('system', reducer)
        const Containers = await import('./containers');
        this.setState({...Containers});
    }
    render(){
        return (
            <Body>
                <Aside>
                    <Submenu {...this.props} menus={Self.menus} defaultOpenKeys={Self.defaultOpenKeys}/>
                </Aside>
                <Main>
                    <ContainerRouters {...this.props} menus={Self.menus} containers={this.state}/>
                </Main>
            </Body>
        )
    }
    static menus = [{
        key: 'SelfInfo',
        id: 'selfinfo',
        name: '个人信息',
        exact: true,
        path: '/self',
        icon: <Icon name='user' />
    },{
        key: 'SelfPass',
        id: 'selfpass',
        name: '个人密码修改',
        exact: true,
        path: '/self/selfpass',
        icon: <Icon name='user-secret' />
    }]
}
