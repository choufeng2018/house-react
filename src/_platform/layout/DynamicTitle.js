import React, {Component} from 'react';

export class DynamicTitle extends Component {
	render() {
		return null;
	}
	componentDidMount() {
		const {title, match: {url} = {}, actions: {openTab}} = this.props;
        console.log("aaaaa:",title);
		openTab({title, path: url});
	}
	componentWillReceiveProps(nextProps) {
		const {title, match: {url} = {}, actions: {openTab}} = this.props;
		const {title: nextTitle} = nextProps;
		if (title !== nextTitle) {
			// todo update title
		}
	}
}
