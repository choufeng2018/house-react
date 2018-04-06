import {createAction, handleActions} from 'redux-actions';
export const openTab = createAction('CREATE_TAB');
export const clearTab = createAction('CLEAR_TAB');
export const removeTab = createAction('REMOVE_TAB');

export default handleActions({
	[openTab]: (state, action) => {
		const tab = action.payload;
		const some = state.some(t => t.path === tab.path);
		if (some) {
			return state;
		} else {
			return [...state, tab];
		}
	},
	[removeTab]: (state = [], action) => {
		const key = action.payload;
		return state.filter((tab, index) => index != key);
	},
	[clearTab]: () => {
		return [];
	},
}, []);
