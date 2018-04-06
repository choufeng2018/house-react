import {createAction, handleActions} from 'redux-actions';

export const toggleAside = createAction('OPEN_ASIDE');

export default handleActions({
	[toggleAside]: (state => {
		return !state;
	}),
}, true);