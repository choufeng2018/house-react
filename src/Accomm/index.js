import React, {Component} from 'react';
import {injectReducer} from '../store';
import {Submenu} from '../_platform/panels/Submenu';
import {Aside} from '../_platform/layout/Aside';
import {Body} from '../_platform/layout/Body';
import {Main} from '../_platform/layout/Main';
import {ContainerRouters} from '../_platform/panels/ContainerRouters';
import {Icon} from 'react-fa';
import {actions as platformActions} from '../_platform/store/global';
export default class Accomm extends Component{
    async componentDidMount(){
        const {default: reducer} = await import('./store');
        const Containers = await import('./containers');
        // 要把注册reducer放到渲染组件之前
        injectReducer('accomm', reducer);
        this.setState({...Containers});
    }
    render(){
        return (
            <Body>
                <Aside>
                    <Submenu {...this.props} menus = {Accomm.menus}></Submenu>
                </Aside>
                <Main>
                    <ContainerRouters {...this.props} menus={Accomm.menus} containers={this.state}/>
                </Main>
            </Body>
        )
    }
    static menus = [{
        key: 'Distri',
        id: 'distri',
        path: '/accomm',
        name: '业主登记',
        exact: true,
        icon: <Icon name="calendar-check-o"/>
    }]
}
