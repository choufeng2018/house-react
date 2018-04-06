import {createAction, handleActions} from 'redux-actions';

export const changeLocation = createAction('LOCATION_CHANGE');

export default handleActions({
	[changeLocation]: (state, action) => {
		return action.payload;
	},
}, '/');