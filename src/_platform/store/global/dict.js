import {createAction, handleActions} from 'redux-actions';
import createFetchAction from 'fetch-action';
import {CODE_API, CODE_PROJECT} from '../../api';

export const getDictValuesOK = createAction(`GET_DICT_VALUES_OK`);
export const getDictValues = createFetchAction(`${CODE_API}/api/v1/dict-values/public/`, [getDictValuesOK]);
export const postProjectCode = createFetchAction(`${CODE_API}/api/v1/projects/code/`, 'POST');
export const getProjectFieldValuesOK = createAction(`GET_PROJECT_FIELD_VALUES_OK`);
export const getProjectFieldValues = createFetchAction(`${CODE_API}/api/v1/dict-values/project/`, [getProjectFieldValuesOK]);
export const postProjectFieldValue = createFetchAction(`${CODE_API}/api/v1/dict-values/project/`, 'POST');
export const getCodeGroupStructure = createFetchAction(`${CODE_API}/api/v1/code-structs/details/`);
export const getCodeType = createFetchAction(`${CODE_API}/api/v1/projects/codetypes/details/?project=${CODE_PROJECT}`);


export default handleActions({
	[getProjectFieldValuesOK]: (state, {payload = {}}) => (payload),
}, []);
