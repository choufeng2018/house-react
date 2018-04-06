import React, {Component} from 'react';
import {injectReducer} from '../store';
import {Submenu} from '../_platform/panels/Submenu'
import {Aside} from '../_platform/layout/Aside'
import {Body} from '../_platform/layout/Body'
import {Main} from '../_platform/layout/Main'
import {ContainerRouters} from '../_platform/panels/ContainerRouters'
import {Icon} from 'react-fa';
import {actions as platformActions} from '../_platform/store/global'
export default class System extends Component{
    async componentDidMount(){
        const {default: reducer} = await import('./store');
        // 要把注册reducer放到渲染组件之前
        injectReducer('system', reducer)
        const Containers = await import('./containers');
        this.setState({...Containers});
    }
    render(){
        return (
            <Body>
                <Aside>
                    <Submenu {...this.props} menus={System.menus} defaultOpenKeys={System.defaultOpenKeys}/>
                </Aside>
                <Main>
                    <ContainerRouters {...this.props} menus={System.menus} containers={this.state}/>
                </Main>
            </Body>
        )
    }
    static menus = [{
        key: 'RepairMan',
        id: 'repairMan',
        name: '维修人员',
        exact: true,
        path: '/system',
        icon: <Icon name='user-md' />
    },{
        key: 'DorAdmin',
        id: 'dorAdmin',
        name: '管理员信息',
        exact: true,
        path: '/system/dorAdmin',
        icon: <Icon name='users' />
    },{
        key: 'Building',
        id: 'building',
        name: '单元楼信息',
        exact: true,
        path: '/system/building',
        icon: <Icon name="building"/>
    },{
        key: 'Dormitory',
        id: 'dormitory',
        name: '房屋信息',
        exact: true,
        path: '/system/dormitory',
        icon: <Icon name="home"/>
    },{
        key: 'Permission',
        id: 'permission',
        name: '权限配置',
        exact: true,
        path: '/system/permission',
        icon: <Icon name = "cogs" />
    }]
}
