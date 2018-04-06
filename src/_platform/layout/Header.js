import React, {Component} from 'react';
import {Menu, Tooltip} from 'antd';
import {Icon} from 'react-fa';
import './Header.less';
import {Link} from 'react-router-dom';
import {getCookie, isCookieKey} from '../cookie';
export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: [],
            name: ''
        }
    }
	render() {
        let login, perm;
        if (isCookieKey('login')) {
            login = JSON.parse(getCookie('login'));
        }
        if (isCookieKey('keys')) {
            perm = JSON.parse(getCookie('keys'));
        }
        let name = '';
        switch (login && login[0].flag) {
            case 'stu':{
                name = login[0].stu_name;
                break;
            }
            case 'dor':{
                name = login[0].doradmin_name;
                break;
            }
            case 'admin':{
                name = login[0].rel_name;
                break;
            }
            default:

        }
		const {match: {params: {module = ''} = {}} = {}} = this.props;
		const ignore = Header.ignoreModules.some(m => m === module);
		if (ignore) {
			return null;
		}
		return (
			<header className="header">
				<a className="head-logo" href='/'>
					<div className="brand">
							小区物业管理系统
					</div>
				</a>
				<Menu className="nav-menu head-nav"
				      selectedKeys={this.selectKeys()}
				      mode="horizontal">
					{
						Header.menus.map(menu => {
                            let has = false;
                            if (perm) {
                                has = perm.some(key => key === menu.id);
                            }
                                if ((perm && login) && (has || login[0].flag === 'admin')) {
                                    return (
                                        <Menu.Item
                                            key={menu.key}
                                            className="nav-item">
                                            <Link to={menu.path}>
                                                {menu.icon}
                                                <span className="title">{menu.title}</span>
                                            </Link>
                                        </Menu.Item>)
                                }
                            })
					}
				</Menu>
				<div className="head-right">
					<div className="head-info">
						<a className="user">{name}</a>
						<Icon name="sign-out" title="退出登录" onClick={this.signOut.bind(this)}/>
					</div>
					{/* <div className="head-fn">
						<Link to='/selfcare'>
							<Icon name="tasks" title="个人任务"/>
						</Link>
						<Link to='/modeldown'>
							<Icon name="download" title="下载模型"/>
						</Link>
					</div> */}
				</div>
			</header>);
	}

	selectKeys() {
		const {match: {params: {module = ''} = {}} = {}} = this.props;
		const {key = ''} = Header.menus.find(menu => menu.path === `/${module}`) || {};
		return [key];
	}

	signOut() {
		const {history} = this.props;
		let remember = window.localStorage.getItem('QH_LOGIN_REMEMBER');
		if(!remember){
			window.localStorage.removeItem('QH_LOGIN_USER');
		}
		setTimeout(() => {
			history.replace('/');
		}, 500);
	}

	Download() {

	}

	static ignoreModules = ['login'];

	static menus = [{
		key: 'dashboard',
		id: 'dashboard',
		title: '综合展示',
		path: '/home',
		icon: <Icon name="map"/>
	}, {
		key: 'overall',
		id: 'overall',
		title: '综合管理',
		path: '/overall',
		icon: <Icon name="cubes"/>,
	}, {
		key: 'repair',
		id: 'repair',
		title: '报修和维修管理',
		path: '/repair',
		icon: <Icon name="wrench"/>
	}, {
		key: 'accomm',
		id: 'accomm',
		title: '业主管理',
		path: '/accomm',
		icon: <Icon name="address-card"/>,
	}, {
		key: 'access',
		title: '门禁管理',
		id: 'access',
		path: '/access',
		icon: <Icon name="lock"/>
	}, {
		key: 'tools',
		title: '费用管理',
		id: 'tools',
		path: '/tools',
		icon: <Icon name="gavel"/>
	},{
		key: 'setup',
		id: 'setup',
		title: '系统配置',
		path: '/system',
		icon: <Icon name="gear"/>
	}]
}
