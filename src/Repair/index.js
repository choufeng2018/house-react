import React, {Component} from 'react'
import {injectReducer} from '../store'
import {Submenu} from '../_platform/panels/Submenu'
import {Aside} from '../_platform/layout/Aside'
import {Body} from '../_platform/layout/Body'
import {Main} from '../_platform/layout/Main'
import {ContainerRouters} from '../_platform/panels/ContainerRouters'
import {Icon} from 'react-fa';
import {actions as platformActions} from '../_platform/store/global'
export default class Repair extends Component{
    async componentDidMount(){
        const {default: reducer} = await import('./store');
        // 要把注册reducer放到渲染组件之前
        injectReducer('repair', reducer)
        const Containers = await import('./containers');
        this.setState({...Containers});
    }
    render() {
		return (
			<Body>
    			<Aside>
    				<Submenu {...this.props} menus={Repair.menus} defaultOpenKeys={Repair.defaultOpenKeys}/>
    			</Aside>
    			<Main>
    				<ContainerRouters {...this.props} menus={Repair.menus} containers={this.state}/>
    			</Main>
			</Body>
            );
	}
    static menus = [{
        key: 'WriteOrder',
        id: 'order',
        name: '报修单管理',
        exact: true,
        path: '/repair',
        icon: <Icon name="calendar-check-o"/>
    },{
        key: 'repair',
        id: 'fix',
        name: '维修管理',
        exact: true,
        icon: <Icon name="calendar-check-o"/>,
        children: [{
            key: 'RepairDetail',
            id: 'detail',
            name: '维修查看',
            path: '/repair/detail',
            icon: <Icon name="tasks" />,
            exact: true
        },{
            key: 'RepairProgress',
            id: 'progress',
            name: '维修进度',
            path: '/repair/progress',
            icon: <Icon name="level-up" />,
            exact: true
        },{
            key: 'RepairEvalute',
            id: 'evalute',
            name: '维修评价',
            path: '/repair/evalute',
            icon: <Icon name="pencil-square" />,
            exact: true
        }]
    }]
    static defaultOpenKeys = ['repair']
}
