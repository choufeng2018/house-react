import {createAction, handleActions} from 'redux-actions';
import {capitalize, getFieldValue} from './util';

export default (ID, service = '') => {
	const suffix = service.toUpperCase();
	service = capitalize(service);
	const changeField = createAction(`${ID}_CHANGE_FIELD_${suffix}`,
		(key, event) => {
			return {[key]: getFieldValue(event)}
		});
	const resetField = createAction(`${ID}_RESET_FIELD_${suffix}`);
	const clearField = createAction(`${ID}_CLEAR_FIELD_${suffix}`);
	const fieldReducer = handleActions({
		[changeField]: (state, {payload}) => ({...state, ...payload}),
		[resetField]: (state, {payload}) => (payload),
		[clearField]: () => ({}),
	}, {});
	fieldReducer[`change${service}Field`] = changeField;
	fieldReducer[`reset${service}Field`] = resetField;
	fieldReducer[`clear${service}Field`] = clearField;
	return fieldReducer;
};