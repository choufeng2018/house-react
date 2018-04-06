import React, {Component} from 'react';
import {Route} from 'react-router-dom';

export class ContainerRouters extends Component {

	render() {
		let {menus = [], containers = {}} = this.props;
		containers = containers || {};
		return (
			<div>
				{this.route(menus, containers)}
			</div>);
	}

	route(menus, containers) {
		//menus是传过来的，侧拉菜单
		//containers 是界面上的一些组件
		let routers = [];
		menus.forEach(menu => {
			const {key, exact, path, children = []} = menu;
            let rst = [];
            if (children.length !== 0) {
                rst = this.route(children, containers);
            }
			routers = [...routers, ...rst];
			containers[key] && routers.push(<Route exact={exact} key={key} path={path} component={containers[key]}/>)
		});
		return routers;
	}
};
