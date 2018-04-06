import React, {Component} from 'react';
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
export class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {minHeight: 10};

	}

	static propTypes = {};

	render() {
		return (
			<div style={{
				float: 'left',
				width: 150,
				position: 'relative',
				minHeight: this.state.minHeight
			}}>

				<div style={{
					width: '100%',
					height: '999em',
					position: 'absolute',
					left: 0,
					top: 0,
					backgroundColor: '#f5f5f5',
				}} />
				<div style={{
					width: 150,
					overflow:'auto',
					zIndex:'1',
					position: 'relative',
					padding: '20px 10px',
					maxHeight:document.documentElement.clientHeight
 				}}>
					{this.props.children}
				</div>
			</div>
		);
	}

	componentWillMount() {
		const width = window.innerWidth;
		const height = window.innerHeight;
		let minHeight = height - 188;
		if (width > 1200) {
			minHeight = height - 170
		}
		this.setState({minHeight});	}
}
