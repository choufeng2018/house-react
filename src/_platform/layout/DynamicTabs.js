import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import './DynamicTabs.less';
import * as actions from '../store/global/tabs';
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;

@connect(
	state => {
		const {platform = {}} = state;
		return platform;
	},
	dispatch => ({
		actions: bindActionCreators(actions, dispatch),
	}),
)
export default class DynamicTabs extends Component {

	static propTypes = {};

	render() {
		const {match: {params: {module = ''} = {}} = {}, tabs = [], location: {pathname = ''} = {}} = this.props;
		const ignore = DynamicTabs.ignoreModules.some(m => m === module);
		if (ignore) {
			return null;
		}
		let index = tabs.findIndex(tab => tab.path === pathname);
		if (index === -1) {
			index = 0;
		}
		return (
			<div className="dynamic-tabs">
				<div className="drawer" onClick={this.toggle.bind(this)}>
					| | |
				</div>
				<Tabs defaultActiveKey="0" activeKey={String(index)}
				      type={tabs.length > 1 ? 'editable-card' : 'card'} hideAdd
				      onEdit={this.edit.bind(this)}>
					{
						tabs.map((tab, index) => {
							return (
								<TabPane key={index}
								         tab={<Link to={tab.path}>{tab.title}</Link>}>
								</TabPane>);
						})
					}
				</Tabs>
			</div>);
	}

	edit(targetKey, action) {
		this[action](targetKey);
	}
	remove(targetKey) {
		const {tabs = [], location: {pathname = ''} = {}, actions: {removeTab}, history} = this.props;
		let index = tabs.findIndex(tab => {
			let path = tab.path;
			if (typeof path === 'object') {
				path = path.pathname;
			}
			return path === pathname;
		});
		if (+index === +targetKey) {
			if (index > 0) {
				history.push(tabs[index - 1].path);
			} else {
				history.push(tabs[1].path);
			}
		}
		removeTab(targetKey);
	}
	toggle() {
		// const {toggleAside} = this.props.actions;
		// toggleAside();
	}

	static ignoreModules = ['home', 'login'];
};
