import React, {Component} from 'react';
import {injectReducer} from '../store'
import {Submenu} from '../_platform/panels/Submenu'
import {Aside} from '../_platform/layout/Aside'
import {Body} from '../_platform/layout/Body'
import {Main} from '../_platform/layout/Main'
import {ContainerRouters} from '../_platform/panels/ContainerRouters'
import {Icon} from 'react-fa';
import {actions as platformActions} from '../_platform/store/global';
export default class Access extends Component{
    async componentDidMount(){
        const {default: reducer} = await import('./store');
        const Containers = await import('./containers');
        // 要把注册reducer放到渲染组件之前
        injectReducer('access', reducer)
        this.setState({...Containers});
    }
    render(){
        return (
            <Body>
                <Aside>
                    <Submenu {...this.props} menus = {Access.menus}></Submenu>
                </Aside>
                <Main>
                    <ContainerRouters {...this.props} menus={Access.menus} containers={this.state}/>
                </Main>
            </Body>
        )
    }

    static menus = [{
        key: 'Visit',
        id: 'visit',
        path: '/access',
        name: '来访人登记',
        exact: true,
        icon: <Icon name="address-card-o"/>
    }]
}
