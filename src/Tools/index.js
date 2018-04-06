import React, {Component} from 'react';
import {injectReducer} from '../store'
import {Submenu} from '../_platform/panels/Submenu'
import {Aside} from '../_platform/layout/Aside'
import {Body} from '../_platform/layout/Body'
import {Main} from '../_platform/layout/Main'
import {ContainerRouters} from '../_platform/panels/ContainerRouters'
import {Icon} from 'react-fa';
import {actions as platformActions} from '../_platform/store/global';
export default class Tools extends Component{
    async componentDidMount(){
        const {default: reducer} = await import('./store');
        const Containers = await import('./containers');
        // 要把注册reducer放到渲染组件之前
        injectReducer('tools', reducer)
        this.setState({...Containers});
    }
    render(){
        return (
            <Body>
                <Aside>
                    <Submenu {...this.props} menus = {Tools.menus}></Submenu>
                </Aside>
                <Main>
                    <ContainerRouters {...this.props} menus={Tools.menus} containers={this.state}/>
                </Main>
            </Body>
        )
    }

    static menus = [{
        key: 'Borrow',
        id: 'borrow',
        path: '/tools',
        name: '工具借用',
        exact: true,
        icon: <Icon name="hand-lizard-o"/>
    },{
        key: 'Receive',
        id: 'receive',
        path: '/tools/receive',
        name: '工具领用',
        exact: true,
        icon: <Icon name="hand-grab-o"/>
    }]
}
