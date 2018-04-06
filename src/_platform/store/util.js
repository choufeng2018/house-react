export const capitalize = (string = '') => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const actionsMap = (actions = {}) => {
	return Object.keys(actions).map(key => {
		return actions[key];
	});
};

export const getFieldValue = (event) => {
	let value = '';
	if (event && event.preventDefault) {
		event.preventDefault();
		if (typeof event.target.value === 'string') {
			value = event.target.value;
		} else {
			value = event.target.checked;
		}
	} else if (event && (event.file !== undefined)) {
		value = event.file;
	} else {
		value = event;
	}
	return value;
};
