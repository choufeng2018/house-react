import React, {Component} from 'react';
import './Aside.less';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleAside} from '../store/global/aside';

@connect(
	state => {
		const {aside} = state;
		return {aside};
	},
	dispatch => ({
		actions: bindActionCreators({toggleAside}, dispatch),
	}),
)
export class Aside extends Component {
	constructor(props) {
		super(props);
		this.state = {minHeight: 10};

	}

	static propTypes = {};

	render() {
		const {aside} = this.props;
		return (
			<aside style={{
				float: 'left',
				width: 160,
				position: 'relative',
				minHeight: this.state.minHeight
			}} className="platform-aside">
				<div style={{
					width: '100%',
					height: '999em',
					position: 'absolute',
					left: 0,
					top: 0,
					backgroundColor: '#d7d5d5'
				}}>
				</div>
				{this.props.children}
			</aside>
		);
	}

	componentWillMount() {
		const width = window.innerWidth;
		const height = window.innerHeight;
		let minHeight = height - 188;
		if (width > 1200) {
			minHeight = height - 170
		}
		this.setState({minHeight});
	}
}
