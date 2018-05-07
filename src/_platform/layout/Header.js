import React, {Component} from 'react';
import {Menu, Tooltip} from 'antd';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './Header.less';
import {Link} from 'react-router-dom';
import {getCookie, isCookieKey, deleteCookie} from '../cookie';
import {actions as platformActions} from '../store/global';
import {store} from '../../store'
@connect(
    state => {
        return {...state}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions}, dispatch)
    })
)
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
                name = login[0].user_name;
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
            case 'rep': {
                name = login[0].user_name;
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
		const {history, actions: {clearTab}} = this.props;
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
            for(var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
		setTimeout(() => {
			// history.replace('/');
			window.location.href = '/';
			clearTab()
		}, 500);
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
		title: '报修管理',
		path: '/repair',
		icon: <Icon name="pencil-square"/>
	}, {
        key: 'maintain',
		id: 'maintain',
		title: '维修管理',
		path: '/maintain',
		icon: <Icon name="wrench"/>
    },{
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
		key: 'message',
		title: '留言管理',
		id: 'MsgManage',
		path: '/message',
		icon: <Icon name="comments"/>
	},{
        key: 'self',
        id: 'self',
        title: '个人中心',
        path: '/self',
        icon: <Icon name='user-circle-o' />
    },{
		key: 'setup',
		id: 'setup',
		title: '系统配置',
		path: '/system',
		icon: <Icon name="gear"/>
	}]
}
