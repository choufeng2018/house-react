import {createAction, handleActions} from 'redux-actions';
import {getFileData} from './file';
export const openPreview = createAction('开始预览');
export const closePreview = createAction('关闭预览');
export const closeLoading = createAction('关闭loading效果');
export default handleActions({
	[openPreview]: (state, {payload}) => {
		console.log('before preview');
		return {
			...state,
			...getFileData(payload)
		}
	},
	[closePreview]: () => {
		return {}
	},
	[closeLoading]: (state, action) => {
		return {
			...state,
			loading: false,
		}
	},
}, {});